-- Fix critical security vulnerability in auth_rate_limits table
-- Remove the overly permissive policy that allows unrestricted access

-- Drop the existing dangerous policy
DROP POLICY IF EXISTS "System can manage rate limits" ON public.auth_rate_limits;

-- Create new restricted policies for auth_rate_limits
-- Only system functions and admins should access this table

-- Policy 1: Allow admins to view rate limits for monitoring
CREATE POLICY "Admins can view rate limits for monitoring" 
ON public.auth_rate_limits 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() 
    AND level_user = 'admin'
  )
);

-- Policy 2: System functions can manage rate limits (INSERT/UPDATE/DELETE)
-- This policy uses a special role check for system operations
CREATE POLICY "System functions can manage rate limits" 
ON public.auth_rate_limits 
FOR ALL 
USING (
  -- Only allow system-level operations (when called from SECURITY DEFINER functions)
  -- This will be true when called from our rate limiting functions
  current_setting('role', true) = 'service_role' 
  OR 
  -- Also allow when explicitly called by system functions with proper context
  current_setting('app.rate_limit_operation', true) = 'true'
);

-- Create a secure function to check and update rate limits
-- This replaces direct table access for rate limiting operations
CREATE OR REPLACE FUNCTION public.secure_rate_limit_check(
  p_identifier text, 
  p_max_attempts integer DEFAULT 5, 
  p_window_minutes integer DEFAULT 15
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  attempts_count integer;
  window_start timestamp with time zone;
  is_blocked boolean := false;
BEGIN
  -- Set context for policy access
  PERFORM set_config('app.rate_limit_operation', 'true', true);
  
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
    -- Reset context
    PERFORM set_config('app.rate_limit_operation', '', true);
    RETURN false;
  END IF;
  
  -- If no record exists or window expired, create new one
  IF attempts_count IS NULL THEN
    INSERT INTO public.auth_rate_limits (identifier, attempts, window_start)
    VALUES (p_identifier, 1, now());
    -- Reset context
    PERFORM set_config('app.rate_limit_operation', '', true);
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
    
    -- Reset context
    PERFORM set_config('app.rate_limit_operation', '', true);
    RETURN false;
  ELSE
    -- Update attempts
    UPDATE public.auth_rate_limits
    SET attempts = attempts_count
    WHERE identifier = p_identifier;
    
    -- Reset context
    PERFORM set_config('app.rate_limit_operation', '', true);
    RETURN true;
  END IF;
END;
$function$;

-- Update the existing check_rate_limit function to use the secure version
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier text, 
  p_max_attempts integer DEFAULT 5, 
  p_window_minutes integer DEFAULT 15
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Delegate to the secure rate limit check
  RETURN public.secure_rate_limit_check(p_identifier, p_max_attempts, p_window_minutes);
END;
$function$;

-- Add additional security function for rate limit cleanup (admin only)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  cleaned_count integer;
BEGIN
  -- Only allow admins to run cleanup
  IF NOT EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() 
    AND level_user = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can cleanup rate limits';
  END IF;
  
  -- Set context for policy access
  PERFORM set_config('app.rate_limit_operation', 'true', true);
  
  -- Clean expired entries
  DELETE FROM public.auth_rate_limits 
  WHERE window_start < now() - interval '1 day'
     OR (blocked_until IS NOT NULL AND blocked_until < now() - interval '1 hour');
     
  GET DIAGNOSTICS cleaned_count = ROW_COUNT;
  
  -- Log cleanup action
  INSERT INTO public.auth_audit_log (action, details, created_at)
  VALUES (
    'rate_limit_cleanup', 
    jsonb_build_object('cleaned_entries', cleaned_count),
    now()
  );
  
  -- Reset context
  PERFORM set_config('app.rate_limit_operation', '', true);
  
  RETURN cleaned_count;
END;
$function$;