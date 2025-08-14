-- Fix Authentication Security Vulnerabilities
-- Implement additional security layers for authentication data

-- 1. Create secure function to hash OTP codes
CREATE OR REPLACE FUNCTION public.hash_otp(otp_code text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Use crypt function with salt for OTP hashing
  RETURN crypt(otp_code, gen_salt('bf', 12));
END;
$$;

-- 2. Create secure function to verify OTP codes
CREATE OR REPLACE FUNCTION public.verify_otp(otp_code text, hashed_otp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Verify OTP using crypt
  RETURN crypt(otp_code, hashed_otp) = hashed_otp;
END;
$$;

-- 3. Add security columns to auth_sessions table
ALTER TABLE public.auth_sessions ADD COLUMN IF NOT EXISTS ip_address inet;
ALTER TABLE public.auth_sessions ADD COLUMN IF NOT EXISTS user_agent text;
ALTER TABLE public.auth_sessions ADD COLUMN IF NOT EXISTS last_activity timestamp with time zone DEFAULT now();
ALTER TABLE public.auth_sessions ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 4. Create function to securely create auth sessions
CREATE OR REPLACE FUNCTION public.create_secure_session(
  p_user_id uuid,
  p_device_id text DEFAULT NULL,
  p_otp_code text DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  session_id uuid;
  hashed_otp text := NULL;
BEGIN
  -- Only allow authenticated users to create their own sessions
  IF auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized session creation attempt';
  END IF;
  
  -- Hash OTP if provided
  IF p_otp_code IS NOT NULL THEN
    hashed_otp := public.hash_otp(p_otp_code);
  END IF;
  
  -- Insert new session with security data
  INSERT INTO public.auth_sessions (
    user_id, device_id, otp, ip_address, user_agent, last_activity, 
    expires_at, is_active
  )
  VALUES (
    p_user_id, p_device_id, hashed_otp, p_ip_address, p_user_agent, now(),
    now() + interval '24 hours', true
  )
  RETURNING session_id INTO session_id;
  
  -- Log session creation for audit trail
  INSERT INTO public.auth_audit_log (
    user_id, action, details, ip_address, created_at
  )
  VALUES (
    p_user_id, 'session_created', 
    jsonb_build_object('session_id', session_id, 'device_id', p_device_id),
    p_ip_address, now()
  );
  
  RETURN session_id;
END;
$$;

-- 5. Create audit log table for security events
CREATE TABLE IF NOT EXISTS public.auth_audit_log (
  log_id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(user_id),
  action text NOT NULL,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit log table
ALTER TABLE public.auth_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view all audit logs"
  ON public.auth_audit_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.user_id = auth.uid() 
      AND users.level_user = 'admin'
    )
  );

-- Users can view their own audit logs (limited)
CREATE POLICY "Users can view own recent audit logs"
  ON public.auth_audit_log
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND created_at > now() - interval '30 days'
    AND action NOT LIKE '%admin%'
  );

-- 6. Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  cleaned_count integer;
BEGIN
  -- Mark expired sessions as inactive
  UPDATE public.auth_sessions 
  SET is_active = false, last_activity = now()
  WHERE (expires_at < now() OR created_at < now() - interval '30 days')
    AND is_active = true;
    
  GET DIAGNOSTICS cleaned_count = ROW_COUNT;
  
  -- Log cleanup action
  INSERT INTO public.auth_audit_log (action, details, created_at)
  VALUES (
    'session_cleanup', 
    jsonb_build_object('cleaned_sessions', cleaned_count),
    now()
  );
  
  RETURN cleaned_count;
END;
$$;

-- 7. Update auth_sessions RLS policies for enhanced security
DROP POLICY IF EXISTS "Create Own Session" ON public.auth_sessions;
DROP POLICY IF EXISTS "Delete Own Session" ON public.auth_sessions;

-- New restrictive policies
CREATE POLICY "Users can create own sessions with restrictions"
  ON public.auth_sessions
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND expires_at > now()
    AND expires_at <= now() + interval '30 days'
  );

CREATE POLICY "Users can view own active sessions"
  ON public.auth_sessions
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND is_active = true
    AND expires_at > now()
  );

CREATE POLICY "Users can deactivate own sessions"
  ON public.auth_sessions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    -- Only allow deactivation, not reactivation
    AND (OLD.is_active = true AND NEW.is_active = false)
  );

-- Admin policy for session management
CREATE POLICY "Admins can manage all sessions"
  ON public.auth_sessions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.user_id = auth.uid() 
      AND users.level_user = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.user_id = auth.uid() 
      AND users.level_user = 'admin'
    )
  );

-- 8. Create function to validate session security
CREATE OR REPLACE FUNCTION public.validate_session_security(
  p_session_id uuid,
  p_current_ip inet DEFAULT NULL,
  p_current_user_agent text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  session_record record;
BEGIN
  -- Get session details
  SELECT * INTO session_record
  FROM public.auth_sessions
  WHERE session_id = p_session_id
    AND is_active = true
    AND expires_at > now();
    
  -- Session not found or expired
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Check for suspicious changes (IP or User-Agent mismatch)
  IF session_record.ip_address IS NOT NULL 
     AND p_current_ip IS NOT NULL 
     AND session_record.ip_address != p_current_ip THEN
    
    -- Log suspicious activity
    INSERT INTO public.auth_audit_log (
      user_id, action, details, ip_address, created_at
    )
    VALUES (
      session_record.user_id, 'suspicious_ip_change',
      jsonb_build_object(
        'session_id', p_session_id,
        'original_ip', session_record.ip_address,
        'new_ip', p_current_ip
      ),
      p_current_ip, now()
    );
    
    -- Deactivate session for security
    UPDATE public.auth_sessions 
    SET is_active = false, last_activity = now()
    WHERE session_id = p_session_id;
    
    RETURN false;
  END IF;
  
  -- Update last activity
  UPDATE public.auth_sessions 
  SET last_activity = now()
  WHERE session_id = p_session_id;
  
  RETURN true;
END;
$$;

-- 9. Create automated cleanup job (Note: This would typically be scheduled)
-- For now, create the function that can be called manually or via cron
CREATE OR REPLACE FUNCTION public.automated_security_maintenance()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  result text;
  cleaned_sessions integer;
BEGIN
  -- Clean up expired sessions
  SELECT public.cleanup_expired_sessions() INTO cleaned_sessions;
  
  -- Remove old audit logs (keep last 90 days)
  DELETE FROM public.auth_audit_log 
  WHERE created_at < now() - interval '90 days';
  
  result := format('Maintenance completed. Cleaned %s expired sessions.', cleaned_sessions);
  
  -- Log maintenance action
  INSERT INTO public.auth_audit_log (action, details, created_at)
  VALUES (
    'automated_maintenance', 
    jsonb_build_object('result', result),
    now()
  );
  
  RETURN result;
END;
$$;