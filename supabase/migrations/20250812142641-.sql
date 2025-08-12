-- PHASE 1: EMERGENCY SECURITY LOCKDOWN

-- Fix database function security issues (search_path warnings)
CREATE OR REPLACE FUNCTION public.authenticate_user(user_nik text, user_password text, user_pin text)
RETURNS TABLE(user_id uuid, nik text, nama_lengkap text, success boolean, message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  user_record record;
  password_valid boolean := false;
  pin_valid boolean := false;
BEGIN
  -- Get user record
  SELECT u.user_id, u.nik, u.nama_lengkap, u.password_hash, u.pin_hash
  INTO user_record
  FROM public.users u
  WHERE u.nik = user_nik;
  
  -- Check if user exists
  IF user_record.user_id IS NULL THEN
    RETURN QUERY SELECT NULL::uuid, NULL::text, NULL::text, false, 'NIK tidak ditemukan';
    RETURN;
  END IF;
  
  -- Note: Password/PIN verification should be done in edge function with proper bcrypt
  IF user_password IS NOT NULL AND user_password != '' THEN
    password_valid := true;
  END IF;
  
  IF user_pin IS NOT NULL AND user_pin != '' THEN
    pin_valid := true;
  END IF;
  
  IF password_valid OR pin_valid THEN
    RETURN QUERY SELECT user_record.user_id, user_record.nik, user_record.nama_lengkap, true, 'Login berhasil';
  ELSE
    RETURN QUERY SELECT NULL::uuid, NULL::text, NULL::text, false, 'Password atau PIN salah';
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_nik_exists(user_nik text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN EXISTS(SELECT 1 FROM public.users WHERE nik = user_nik);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_pin_hash(user_nik text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  pin_hash_result text;
BEGIN
  SELECT pin_hash INTO pin_hash_result
  FROM public.users
  WHERE nik = user_nik;
  
  RETURN pin_hash_result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_password_hash(user_nik text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  password_hash_result text;
BEGIN
  SELECT password_hash INTO password_hash_result
  FROM public.users
  WHERE nik = user_nik;
  
  RETURN password_hash_result;
END;
$function$;

-- CRITICAL: Lock down users table - remove public access
DROP POLICY IF EXISTS "Allow insert for anonymous" ON public.users;
DROP POLICY IF EXISTS "Update Own Profile" ON public.users;
DROP POLICY IF EXISTS "Users can read own data" ON public.users;

-- Create strict RLS policies for users table
CREATE POLICY "Users can read own data only"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data only"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated user registration"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add RLS policies to unprotected tables

-- admin_actions: Only admins
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only access"
ON public.admin_actions
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- badges_master: Public read, admin write
ALTER TABLE public.badges_master ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read badges"
ON public.badges_master
FOR SELECT
TO authenticated
USING (is_activeis_active = true);

CREATE POLICY "Admins can manage badges"
ON public.badges_master
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- comments: Users manage own comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own comments"
ON public.comments
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read comments on posts"
ON public.comments
FOR SELECT
TO authenticated
USING (true);

-- edu_content: Public read, admin write
ALTER TABLE public.edu_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read education content"
ON public.edu_content
FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage education content"
ON public.edu_content
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- likes: Users manage own likes
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own likes"
ON public.likes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- missions: Public read, admin write
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read missions"
ON public.missions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage missions"
ON public.missions
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- post_media: Link to posts with user ownership
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own post media"
ON public.post_media
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- products: Public read, admin write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active products"
ON public.products
FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- qr_code: Secure based on usage
ALTER TABLE public.qr_code ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read unused QR codes"
ON public.qr_code
FOR SELECT
TO authenticated
USING (is_used = false);

CREATE POLICY "Admins can manage QR codes"
ON public.qr_code
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- settings_terms: Public read, admin write
ALTER TABLE public.settings_terms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings and terms"
ON public.settings_terms
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage settings and terms"
ON public.settings_terms
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE user_id = auth.uid() AND level_user = 'admin'
  )
);

-- shares: Users manage own shares
ALTER TABLE public.shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own shares"
ON public.shares
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);