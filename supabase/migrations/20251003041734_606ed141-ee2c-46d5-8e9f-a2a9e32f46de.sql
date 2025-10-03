-- Create function to validate financial operations
CREATE OR REPLACE FUNCTION validate_financial_operation(
  p_user_id UUID,
  p_operation TEXT,
  p_amount NUMERIC
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_saldo INTEGER;
BEGIN
  -- Get user's current balance
  SELECT saldo INTO v_user_saldo
  FROM users
  WHERE user_id = p_user_id;

  -- Validate based on operation type
  IF p_operation = 'withdraw' THEN
    RETURN v_user_saldo >= p_amount;
  ELSIF p_operation = 'loan' THEN
    -- Simple loan validation: check if user has good standing
    RETURN v_user_saldo >= 0;
  ELSIF p_operation = 'deposit' THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;

-- Create function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  p_event_type TEXT,
  p_details JSONB,
  p_user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO activity_logs_user (user_id, activity_type, description, created_at)
  VALUES (
    p_user_id,
    p_event_type,
    p_details::text,
    NOW()
  );
END;
$$;

-- Create function to validate QR codes
CREATE OR REPLACE FUNCTION validate_qr_code(
  p_code TEXT,
  p_user_id UUID
)
RETURNS TABLE(is_valid BOOLEAN, message TEXT, reward_amount INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_qr_exists BOOLEAN;
  v_reward INTEGER := 100;
BEGIN
  -- Check if QR code exists
  SELECT EXISTS(
    SELECT 1 FROM qr_code WHERE code = p_code
  ) INTO v_qr_exists;

  IF v_qr_exists THEN
    -- Update user's balance and points
    UPDATE users
    SET 
      saldo = saldo + v_reward,
      poin = poin + (v_reward / 10),
      xp = xp + 10
    WHERE user_id = p_user_id;

    RETURN QUERY SELECT TRUE, 'QR code valid!'::TEXT, v_reward;
  ELSE
    RETURN QUERY SELECT FALSE, 'Invalid QR code'::TEXT, 0;
  END IF;
END;
$$;