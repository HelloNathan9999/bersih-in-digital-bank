import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { operation, amount, userId } = await req.json()
    
    // Validate user authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user || user.id !== userId) {
      throw new Error('Authentication failed')
    }

    // Process financial operation based on type
    let result = false
    
    switch (operation) {
      case 'withdraw':
        result = await processWithdrawal(supabaseClient, userId, amount)
        break
      case 'loan':
        result = await processLoan(supabaseClient, userId, amount)
        break
      case 'deposit':
        result = await processDeposit(supabaseClient, userId, amount)
        break
      default:
        throw new Error('Invalid operation')
    }

    // Log the financial operation
    await supabaseClient.rpc('log_security_event', {
      p_event_type: `financial_operation_${operation}`,
      p_details: { 
        amount: amount, 
        success: result,
        timestamp: Date.now()
      },
      p_user_id: userId
    })

    return new Response(
      JSON.stringify({ success: result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Financial operation error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

async function processWithdrawal(supabase: any, userId: string, amount: number) {
  // Use existing validate_financial_operation function
  const { data, error } = await supabase.rpc('validate_financial_operation', {
    p_user_id: userId,
    p_operation: 'withdraw',
    p_amount: amount
  })
  
  if (error || !data) {
    return false
  }

  // If validation passes, update the user's balance
  const { error: updateError } = await supabase
    .from('user_wallets')
    .update({ 
      saldo: supabase.rpc('saldo - ?', [amount]),
      update_at: new Date().toISOString()
    })
    .eq('user_id', userId)
  
  return !updateError
}

async function processLoan(supabase: any, userId: string, amount: number) {
  // Check user's loan eligibility
  const { data: userData } = await supabase
    .from('users')
    .select('saldo, xp, level_user')
    .eq('user_id', userId)
    .single()
  
  if (!userData) return false
  
  // Simple loan criteria: XP > 100 and amount <= 500000
  const eligible = userData.xp > 100 && amount <= 500000
  
  if (eligible) {
    // Update user balance
    const { error: updateError } = await supabase
      .from('users')
      .update({ saldo: userData.saldo + amount })
      .eq('user_id', userId)
  }
  
  return eligible
}

async function processDeposit(supabase: any, userId: string, amount: number) {
  // Update user balance for waste deposit
  const { error } = await supabase
    .from('users')
    .update({ 
      saldo: supabase.rpc('saldo + ?', [amount]),
      poin: supabase.rpc('poin + ?', [Math.floor(amount / 1000)]) // 1 point per 1000 rupiah
    })
    .eq('user_id', userId)
  
  return !error
}