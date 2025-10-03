-- Harden RLS for sensitive tables: users, transactions_history, user_wallets
-- Ensure strict auth.uid() checks and remove permissive/duplicate policies

-- USERS TABLE
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop weak or duplicate policies
DROP POLICY IF EXISTS "Public can register new users" ON public.users;
DROP POLICY IF EXISTS "Users can select their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can delete their own account" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS users_can_view_own_profile ON public.users;
DROP POLICY IF EXISTS users_can_update_own_profile ON public.users;
DROP POLICY IF EXISTS users_can_delete_own_profile ON public.users;

-- Recreate minimal, strict policies using auth.uid()
CREATE POLICY users_select_own
ON public.users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY users_update_own
ON public.users
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY users_delete_own
ON public.users
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- No INSERT policy on users to prevent public/unauthenticated registration.


-- TRANSACTIONS HISTORY TABLE
ALTER TABLE public.transactions_history ENABLE ROW LEVEL SECURITY;

-- Drop confusing/duplicate policies
DROP POLICY IF EXISTS "Users cannot modify transaction history" ON public.transactions_history;
DROP POLICY IF EXISTS "Users can view their own transaction history" ON public.transactions_history;
DROP POLICY IF EXISTS "Users can view own transaction history" ON public.transactions_history;

-- Recreate strict SELECT-only policy
CREATE POLICY tx_select_own
ON public.transactions_history
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- No INSERT/UPDATE/DELETE policies -> denied by default


-- USER WALLETS TABLE
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;

-- Drop policies that rely on request.jwt.claims or duplicates
DROP POLICY IF EXISTS "Users can update their own wallet" ON public.user_wallets;
DROP POLICY IF EXISTS "Users can view their own wallet" ON public.user_wallets;
DROP POLICY IF EXISTS "Users can update only their wallet" ON public.user_wallets;
DROP POLICY IF EXISTS "Users can view only their wallet" ON public.user_wallets;

-- Recreate strict, consistent policies with auth.uid()
CREATE POLICY wallets_select_own
ON public.user_wallets
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY wallets_update_own
ON public.user_wallets
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Done
