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

    const { qr_code_content } = await req.json()
    
    // Validate user authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Authentication failed')
    }

    // Sanitize QR code content to prevent XSS
    const sanitizedContent = qr_code_content.replace(/[<>"'&]/g, '')
    
    // Validate QR code using existing database function
    const { data, error } = await supabaseClient.rpc('validate_qr_code', {
      qr_code_unique: sanitizedContent
    })

    if (error) {
      throw error
    }

    // Log the QR code validation attempt
    await supabaseClient.rpc('log_security_event', {
      p_event_type: 'qr_code_validation',
      p_details: { 
        qr_code: sanitizedContent.substring(0, 10) + '...', // Log partial content for security
        valid: data && data.length > 0 && data[0]?.is_valid,
        timestamp: Date.now()
      },
      p_user_id: user.id
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: data && data.length > 0 ? data[0] : null 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('QR validation error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})