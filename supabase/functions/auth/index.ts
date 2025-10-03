import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hash password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // standar, cukup aman
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Verify password against hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

interface LoginRequest {
  nik: string;
  password?: string;
  pin?: string;
}

interface RegisterRequest {
  nik: string;
  nama_lengkap: string;
  nomor_hp: string;
  email: string;
  password: string;
  pin: string;
  refferal_code?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  try {
    const { action, ...data } = await req.json();

    if (action === 'login') {
      return await handleLogin(supabase, data as LoginRequest);
    } else if (action === 'register') {
      return await handleRegister(supabase, data as RegisterRequest);
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Auth function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleLogin(supabase: any, { nik, password, pin }: LoginRequest) {
  try {
    // Get user data securely
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('user_id, nik, nama_lengkap, email, password_hash, pin_hash')
      .eq('nik', nik)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'NIK tidak ditemukan' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify password or PIN
    let isValid = false;
    if (password && user.password_hash) {
      isValid = await verifyPassword(password, user.password_hash);
    } else if (pin && user.pin_hash) {
      isValid = await verifyPassword(pin, user.pin_hash);
    }

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Password atau PIN salah' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create or get Supabase auth user
    let authUser;
    const email = user.email || `${nik}@bersih.in`;
    
    // Try to get existing auth user
    const { data: existingAuthUser } = await supabase.auth.admin.getUserById(user.user_id);
    
    if (!existingAuthUser.user) {
      // Create auth user if doesn't exist
      const { data: newAuthUser, error: createError } = await supabase.auth.admin.createUser({
        email: email,
        user_metadata: {
          nik: user.nik,
          nama_lengkap: user.nama_lengkap,
          user_id: user.user_id
        },
        email_confirm: true,
      });
      
      if (createError) {
        console.error('Auth user creation error:', createError);
        return new Response(
          JSON.stringify({ error: 'Login gagal' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      authUser = newAuthUser.user;
    } else {
      authUser = existingAuthUser.user;
    }

    // Generate access token for client
    const { data: tokenData, error: tokenError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (tokenError) {
      console.error('Token generation error:', tokenError);
      return new Response(
        JSON.stringify({ error: 'Login gagal' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          user_id: user.user_id,
          nik: user.nik,
          nama_lengkap: user.nama_lengkap,
          email: user.email
        },
        access_token: tokenData.properties?.access_token,
        refresh_token: tokenData.properties?.refresh_token,
        magic_link: tokenData.properties?.action_link
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login gagal' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleRegister(supabase: any, data: RegisterRequest) {
  try {
    // Check if NIK already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('nik')
      .eq('nik', data.nik)
      .single();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'NIK sudah terdaftar' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash password and PIN
    const password_hash = await hashPassword(data.password);
    const pin_hash = await hashPassword(data.pin);

    // Create Supabase auth user first
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      user_metadata: {
        nik: data.nik,
        nama_lengkap: data.nama_lengkap
      },
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth registration error:', authError);
      return new Response(
        JSON.stringify({ error: 'Registrasi gagal: ' + authError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert user data into users table
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        user_id: authUser.user.id,
        nik: data.nik,
        nama_lengkap: data.nama_lengkap,
        nomor_hp: data.nomor_hp,
        email: data.email,
        password_hash,
        pin_hash,
        refferal_code: data.refferal_code || null,
      });

    if (insertError) {
      console.error('User insert error:', insertError);
      // Clean up auth user if insert fails
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return new Response(
        JSON.stringify({ error: 'Registrasi gagal' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate auth tokens for immediate login after registration
    const { data: tokenData, error: tokenError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: data.email,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Registrasi berhasil',
        user: {
          user_id: authUser.user.id,
          nik: data.nik,
          nama_lengkap: data.nama_lengkap,
          email: data.email
        },
        access_token: tokenData?.properties?.access_token,
        refresh_token: tokenData?.properties?.refresh_token,
        magic_link: tokenData?.properties?.action_link
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Registrasi gagal' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
