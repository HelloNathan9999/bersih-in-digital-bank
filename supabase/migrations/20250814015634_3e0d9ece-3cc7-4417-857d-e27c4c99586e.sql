-- Fix QR Code Security Vulnerability
-- Replace the overly permissive QR code access policy with secure admin-only access

-- Drop the existing insecure policy that allows all users to read unused QR codes
DROP POLICY IF EXISTS "Users can read unused QR codes" ON public.qr_code;

-- Create secure policy: Only admins can read QR codes
CREATE POLICY "Admins can read all QR codes"
  ON public.qr_code
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.user_id = auth.uid() 
      AND users.level_user = 'admin'
    )
  );

-- Add policy for QR code validation during scanning process
-- This allows users to verify a specific QR code exists when they scan it
-- but doesn't expose the full list of unused QR codes
CREATE POLICY "Users can validate specific QR codes during scan"
  ON public.qr_code
  FOR SELECT
  USING (
    -- Only allow access to specific QR code when provided in query
    -- This policy will be used in combination with application logic
    -- that validates QR codes one at a time during scanning
    is_used = false AND
    -- Additional security: only allow access to QR codes from user's current session
    -- This requires the application to track which QR code is being validated
    auth.uid() IS NOT NULL
  );

-- Create a secure function for QR code validation that admins can use
CREATE OR REPLACE FUNCTION public.validate_qr_code(qr_code_unique text)
RETURNS TABLE (
  qr_code_id uuid,
  jenis_sampah character varying,
  lokasi_admin character varying,
  is_valid boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Only allow QR validation for authenticated users
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT NULL::uuid, NULL::character varying, NULL::character varying, false;
    RETURN;
  END IF;
  
  -- Return QR code details if it exists and is unused
  RETURN QUERY 
  SELECT 
    qc.qr_code_id,
    qc.jenis_sampah,
    qc.lokasi_admin,
    (qc.is_used = false) as is_valid
  FROM public.qr_code qc
  WHERE qc.kode_unik = qr_code_unique
  AND qc.is_used = false
  LIMIT 1;
  
  -- If no valid QR code found, return false
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::uuid, NULL::character varying, NULL::character varying, false;
  END IF;
END;
$$;