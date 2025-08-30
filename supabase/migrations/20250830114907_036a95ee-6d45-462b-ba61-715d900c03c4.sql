-- Fix critical RLS policy issues identified in security review

-- 1. Fix leaderboard UPDATE policy (currently has wrong command type)
DROP POLICY IF EXISTS "Update Own Leaderboard Data" ON public.leaderboard;
CREATE POLICY "Update Own Leaderboard Data" 
ON public.leaderboard 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Consolidate duplicate user_wallets RLS policies
DROP POLICY IF EXISTS "User can view own wallet" ON public.user_wallets;
DROP POLICY IF EXISTS "Users can view own wallet" ON public.user_wallets;
CREATE POLICY "Users can view own wallet" 
ON public.user_wallets 
FOR SELECT 
USING (user_id = auth.uid());

-- 3. Add authentication requirement for comments (currently allows anonymous reading)
DROP POLICY IF EXISTS "Users can read comments on posts" ON public.comments;
CREATE POLICY "Authenticated users can read comments" 
ON public.comments 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 4. Add authentication requirement for educational content
DROP POLICY IF EXISTS "Public can read education content" ON public.edu_content;
CREATE POLICY "Authenticated users can read education content" 
ON public.edu_content 
FOR SELECT 
USING (is_active = true AND auth.uid() IS NOT NULL);

-- 5. Add authentication requirement for missions
DROP POLICY IF EXISTS "Public can read missions" ON public.missions;
CREATE POLICY "Authenticated users can read missions" 
ON public.missions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 6. Keep product catalog public but log this as a business decision
-- Products remain publicly accessible for catalog browsing

-- 7. Keep settings/terms public as they're typically needed for registration flow
-- Settings and terms remain publicly accessible

-- Add audit logging function for tracking policy changes
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type text,
  p_details jsonb DEFAULT NULL,
  p_user_id uuid DEFAULT auth.uid()
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.auth_audit_log (
    user_id, action, details, ip_address, created_at
  )
  VALUES (
    p_user_id, 
    p_event_type,
    COALESCE(p_details, '{}'::jsonb),
    inet_client_addr(),
    now()
  );
END;
$$;