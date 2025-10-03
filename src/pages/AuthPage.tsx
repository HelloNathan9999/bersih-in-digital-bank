import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [nik, setNik] = useState("");
  const [pin, setPin] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nik || !pin || (!isLogin && !namaLengkap)) {
      toast({ title: "Semua field wajib diisi!" });
      return;
    }

    if (isLogin) {
      // Call secure authentication edge function
      const { data, error } = await supabase.functions.invoke('auth', {
        body: {
          action: 'login',
          nik: nik,
          pin: pin
        }
      });

      if (error || !data.success) {
        toast({ title: data?.error || "Login gagal!" });
        return;
      }

      // Set Supabase session from tokens if provided
      try {
        if (data.access_token && data.refresh_token) {
          await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
        } else if (data.magic_link) {
          const url = new URL(data.magic_link);
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          }
        }
      } catch (e) {
        console.warn('Tidak bisa membuat sesi Supabase:', e);
      }

      const { secureStorage } = await import('@/lib/secure-storage');
      secureStorage.setItem("user", data.user, 6 * 60 * 60 * 1000); // 6 hours expiry
      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${data.user.nama_lengkap}`,
      });
      navigate("/");
    } else {
      // Call secure registration edge function
      const { data, error } = await supabase.functions.invoke('auth', {
        body: {
          action: 'register',
          nik: nik,
          nama_lengkap: namaLengkap,
          nomor_hp: '',
          email: `${nik}@bersih.in`,
          password: pin,
          pin: pin,
        }
      });

      if (error || !data.success) {
        toast({ title: "Registrasi gagal", description: data?.error });
        return;
      }

      // Auto-login using returned tokens if present
      try {
        if (data.access_token && data.refresh_token) {
          await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token });
        } else if (data.magic_link) {
          const url = new URL(data.magic_link);
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          }
        }
      } catch (e) {
        console.warn('Tidak bisa membuat sesi setelah registrasi:', e);
      }

      toast({
        title: "Registrasi berhasil!",
        description: "Silakan login.",
      });
      setIsLogin(true);
      setNik("");
      setPin("");
      setNamaLengkap("");
    }
  };

  const handleLogout = async () => {
    const { secureStorage } = await import('@/lib/secure-storage');
    secureStorage.clear();
    localStorage.removeItem("user");
    toast({ title: "Logout berhasil" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? "Login ke BERSIH.IN" : "Register ke BERSIH.IN"}</h2>

      <input
        type="text"
        placeholder="NIK"
        value={nik}
        onChange={(e) => setNik(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="PIN (6 digit)"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        maxLength={6}
        style={{ display: "block", marginBottom: 10 }}
      />

      {!isLogin && (
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={namaLengkap}
          onChange={(e) => setNamaLengkap(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />
      )}

      <button onClick={handleSubmit} style={{ marginBottom: 10 }}>
        {isLogin ? "Login" : "Register"}
      </button>

      <button onClick={() => setIsLogin(!isLogin)} style={{ marginBottom: 10 }}>
        Ganti ke {isLogin ? "Register" : "Login"}
      </button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
