-- Fix security linter issues from previous migration

-- 1. Remove SECURITY DEFINER view and replace with regular view with proper RLS
DROP VIEW IF EXISTS public.users_safe;

-- Create a regular view without SECURITY DEFINER (which was causing the error)
CREATE VIEW public.users_safe AS
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

-- 2. Fix function search_path issues by ensuring all functions have proper search_path
CREATE OR REPLACE FUNCTION public.validate_session_insert()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path TO ''
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO ''
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

CREATE OR REPLACE FUNCTION public.schedule_cleanup()
RETURNS void
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- This will be called periodically by the application
  PERFORM public.cleanup_old_audit_logs();
END;
$$;

-- 3. Add RLS policy for the users_safe view
-- Since it's a view, we need to ensure proper access control through the underlying table
-- The existing RLS policies on the users table will handle this

-- 4. Add function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier text,
  p_max_attempts integer DEFAULT 5,
  p_window_minutes integer DEFAULT 15
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  attempts_count integer;
  window_start timestamp with time zone;
  is_blocked boolean := false;
BEGIN
  -- Clean up old entries first
  DELETE FROM public.auth_rate_limits 
  WHERE window_start < now() - (p_window_minutes || ' minutes')::interval;
  
  -- Check current attempts
  SELECT attempts, window_start, (blocked_until > now())
  INTO attempts_count, window_start, is_blocked
  FROM public.auth_rate_limits
  WHERE identifier = p_identifier
  AND window_start > now() - (p_window_minutes || ' minutes')::interval;
  
  -- If blocked, return false
  IF is_blocked THEN
    RETURN false;
  END IF;
  
  -- If no record exists or window expired, create new one
  IF attempts_count IS NULL THEN
    INSERT INTO public.auth_rate_limits (identifier, attempts, window_start)
    VALUES (p_identifier, 1, now());
    RETURN true;
  END IF;
  
  -- Increment attempts
  attempts_count := attempts_count + 1;
  
  -- Check if exceeded limit
  IF attempts_count > p_max_attempts THEN
    -- Block for double the window time
    UPDATE public.auth_rate_limits
    SET attempts = attempts_count,
        blocked_until = now() + (p_window_minutes * 2 || ' minutes')::interval
    WHERE identifier = p_identifier;
    RETURN false;
  ELSE
    -- Update attempts
    UPDATE public.auth_rate_limits
    SET attempts = attempts_count
    WHERE identifier = p_identifier;
    RETURN true;
  END IF;
END;
$$;