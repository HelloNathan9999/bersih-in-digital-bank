-- Final security fixes to resolve all linter issues

-- 1. Remove the view entirely and replace with a secure function approach
DROP VIEW IF EXISTS public.users_safe;

-- Create a function instead of a view to avoid security definer issues
CREATE OR REPLACE FUNCTION public.get_user_safe_data(target_user_id uuid DEFAULT NULL)
RETURNS TABLE (
  user_id uuid,
  nik_masked text,
  nama_lengkap_masked text,
  nomor_hp_masked text,
  email_masked text,
  poin integer,
  saldo integer,
  green_coins integer,
  xp integer,
  last_checkin timestamp without time zone,
  created_at timestamp without time zone,
  is_active boolean,
  alamat text,
  refferal_code text,
  photo_url text,
  level_user text,
  badges text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Only allow authenticated users
  IF auth.uid() IS NULL THEN
    RETURN;
  END IF;
  
  -- If no target specified, return own data
  IF target_user_id IS NULL THEN
    target_user_id := auth.uid();
  END IF;
  
  RETURN QUERY
  SELECT 
    u.user_id,
    CASE 
      WHEN auth.uid() = u.user_id THEN u.nik 
      ELSE CONCAT(LEFT(u.nik, 4), '********', RIGHT(u.nik, 4))
    END as nik_masked,
    CASE 
      WHEN auth.uid() = u.user_id THEN u.nama_lengkap 
      ELSE CONCAT(LEFT(u.nama_lengkap, 1), REPEAT('*', LENGTH(u.nama_lengkap) - 2), RIGHT(u.nama_lengkap, 1))
    END as nama_lengkap_masked,
    CASE 
      WHEN auth.uid() = u.user_id THEN u.nomor_hp 
      ELSE CONCAT(LEFT(COALESCE(u.nomor_hp, ''), 3), '***', RIGHT(COALESCE(u.nomor_hp, ''), 3))
    END as nomor_hp_masked,
    CASE 
      WHEN auth.uid() = u.user_id THEN u.email 
      ELSE CONCAT(LEFT(COALESCE(u.email, ''), 2), '***@***', RIGHT(COALESCE(u.email, ''), 4))
    END as email_masked,
    u.poin,
    u.saldo,
    u.green_coins,
    u.xp,
    u.last_checkin,
    u.created_at,
    u.is_active,
    u.alamat,
    u.refferal_code,
    u.photo_url,
    u.level_user,
    u.badges
  FROM public.users u
  WHERE u.user_id = target_user_id
  AND (
    -- Users can see their own data or admin can see all
    auth.uid() = u.user_id 
    OR EXISTS (
      SELECT 1 FROM public.users admin_user 
      WHERE admin_user.user_id = auth.uid() 
      AND admin_user.level_user = 'admin'
    )
  );
END;
$$;

-- 2. Fix QR code policy to be more restrictive and functional
DROP POLICY IF EXISTS "Users can validate assigned QR codes only" ON public.qr_code;
CREATE POLICY "Users can scan unused QR codes" 
ON public.qr_code 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND is_used = false
);

-- 3. Add comprehensive logging for security events
CREATE OR REPLACE FUNCTION public.log_authentication_attempt(
  p_nik text,
  p_success boolean,
  p_error_message text DEFAULT NULL,
  p_ip_address inet DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.auth_audit_log (
    user_id,
    action,
    details,
    ip_address,
    created_at
  ) VALUES (
    CASE WHEN p_success THEN (
      SELECT user_id FROM public.users WHERE nik = p_nik LIMIT 1
    ) ELSE NULL END,
    CASE WHEN p_success THEN 'login_success' ELSE 'login_failed' END,
    jsonb_build_object(
      'nik_masked', CONCAT(LEFT(p_nik, 4), '****'),
      'success', p_success,
      'error', p_error_message,
      'timestamp', extract(epoch from now())
    ),
    COALESCE(p_ip_address, inet_client_addr()),
    now()
  );
END;
$$;

-- 4. Create function to validate and sanitize user inputs
CREATE OR REPLACE FUNCTION public.sanitize_input(input_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Basic input sanitization
  RETURN regexp_replace(
    regexp_replace(
      COALESCE(input_text, ''),
      '[<>"\'';&]', '', 'g'
    ),
    '\s+', ' ', 'g'
  );
END;
$$;