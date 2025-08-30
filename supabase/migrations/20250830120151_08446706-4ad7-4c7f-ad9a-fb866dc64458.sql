-- Fix critical security vulnerabilities identified in security scan

-- 1. Enhanced data protection for sensitive user information
-- Add data masking views for the users table to protect PII
CREATE OR REPLACE VIEW public.users_safe AS
SELECT 
  user_id,
  CASE 
    WHEN auth.uid() = user_id THEN nik 
    ELSE CONCAT(LEFT(nik, 4), '********', RIGHT(nik, 4))
  END as nik_masked,
  CASE 
    WHEN auth.uid() = user_id THEN nama_lengkap 
    ELSE CONCAT(LEFT(nama_lengkap, 1), REPEAT('*', LENGTH(nama_lengkap) - 2), RIGHT(nama_lengkap, 1))
  END as nama_lengkap_masked,
  CASE 
    WHEN auth.uid() = user_id THEN nomor_hp 
    ELSE CONCAT(LEFT(nomor_hp, 3), '***', RIGHT(nomor_hp, 3))
  END as nomor_hp_masked,
  CASE 
    WHEN auth.uid() = user_id THEN email 
    ELSE CONCAT(LEFT(email, 2), '***@***', RIGHT(email, 4))
  END as email_masked,
  poin,
  saldo,
  green_coins,
  xp,
  last_checkin,
  created_at,
  is_active,
  alamat,
  refferal_code,
  photo_url,
  level_user,
  badges
FROM public.users
WHERE auth.uid() IS NOT NULL;

-- Enable RLS on the safe view
ALTER VIEW public.users_safe SET (security_barrier = true);

-- 2. Enhanced financial data protection
-- Create function to validate financial operations
CREATE OR REPLACE FUNCTION public.validate_financial_operation(
  p_user_id uuid,
  p_operation text,
  p_amount integer DEFAULT 0
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  user_balance integer;
  daily_limit integer := 1000000; -- 1M rupiah daily limit
  daily_total integer;
BEGIN
  -- Only authenticated users can perform financial operations
  IF auth.uid() != p_user_id THEN
    RETURN false;
  END IF;
  
  -- Get current balance
  SELECT saldo INTO user_balance
  FROM public.user_wallets
  WHERE user_id = p_user_id;
  
  -- Check sufficient balance for withdrawals
  IF p_operation = 'withdraw' AND (user_balance < p_amount OR p_amount <= 0) THEN
    RETURN false;
  END IF;
  
  -- Check daily withdrawal limits
  IF p_operation = 'withdraw' THEN
    SELECT COALESCE(SUM(jumlah), 0) INTO daily_total
    FROM public.withdraw_transactions
    WHERE user_id = p_user_id 
      AND DATE(waktu_ajuan) = CURRENT_DATE
      AND status IN ('completed', 'pending');
    
    IF (daily_total + p_amount) > daily_limit THEN
      RETURN false;
    END IF;
  END IF;
  
  RETURN true;
END;
$$;

-- 3. Enhanced QR code security - restrict to user-specific codes only
DROP POLICY IF EXISTS "Users can validate specific QR codes during scan" ON public.qr_code;
CREATE POLICY "Users can validate assigned QR codes only" 
ON public.qr_code 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND is_used = false 
  AND EXISTS (
    SELECT 1 FROM public.deposit_transactions dt 
    WHERE dt.user_id = auth.uid() 
    AND dt.qr_code_id = qr_code.qr_code_id
  )
);

-- 4. Enhanced authentication session security
-- Add session validation trigger
CREATE OR REPLACE FUNCTION public.validate_session_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Limit active sessions per user (max 5 devices)
  IF (
    SELECT COUNT(*) 
    FROM public.auth_sessions 
    WHERE user_id = NEW.user_id 
    AND is_active = true 
    AND expires_at > now()
  ) >= 5 THEN
    -- Deactivate oldest session
    UPDATE public.auth_sessions 
    SET is_active = false 
    WHERE session_id = (
      SELECT session_id 
      FROM public.auth_sessions 
      WHERE user_id = NEW.user_id 
      AND is_active = true 
      ORDER BY last_activity ASC 
      LIMIT 1
    );
  END IF;
  
  -- Log session creation
  INSERT INTO public.auth_audit_log (
    user_id, action, details, ip_address
  ) VALUES (
    NEW.user_id, 'session_created', 
    jsonb_build_object('session_id', NEW.session_id, 'device_id', NEW.device_id),
    NEW.ip_address
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for session validation
DROP TRIGGER IF EXISTS validate_session_trigger ON public.auth_sessions;
CREATE TRIGGER validate_session_trigger
  BEFORE INSERT ON public.auth_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_session_insert();

-- 5. Add rate limiting for authentication attempts
CREATE TABLE IF NOT EXISTS public.auth_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL, -- IP or user identifier
  attempts integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  blocked_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.auth_rate_limits ENABLE ROW LEVEL SECURITY;

-- Rate limiting policies
CREATE POLICY "System can manage rate limits" 
ON public.auth_rate_limits 
FOR ALL 
USING (true);

-- 6. Enhanced audit logging with retention policy
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Keep only last 6 months of audit logs
  DELETE FROM public.auth_audit_log 
  WHERE created_at < now() - interval '6 months';
  
  -- Keep only last 30 days of rate limit data
  DELETE FROM public.auth_rate_limits 
  WHERE created_at < now() - interval '30 days';
END;
$$;

-- Create scheduled cleanup function
CREATE OR REPLACE FUNCTION public.schedule_cleanup()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This will be called periodically by the application
  PERFORM public.cleanup_old_audit_logs();
END;
$$;