import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function AuthScreen() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Validasi input
    if (!nik || !password) {
      toast({ title: "Harap isi NIK dan Password/PIN!" });
      setLoading(false);
      return;
    }

    if (!/^\d{16}$/.test(nik.trim())) {
      toast({ title: "NIK harus 16 digit angka!" });
      setLoading(false);
      return;
    }

    try {
      // Call secure authentication edge function
      const { data, error } = await supabase.functions.invoke('auth', {
        body: {
          action: 'login',
          nik: nik.trim(),
          password: password,
          pin: password  // Try both password and pin
        }
      });

      if (error || !data.success) {
        toast({ title: data?.error || "Login gagal!" });
        setLoading(false);
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

      // Store minimal user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${data.user.nama_lengkap}`,
      });

      navigate("/");
    } catch (err) {
      toast({ title: "Terjadi kesalahan", description: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md">
        {/* Branding */}
        <h1 className="text-3xl font-bold text-center mb-1">BERSIH.IN</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Bank Sampah Digital
        </p>

        {/* Form Login */}
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            Masuk ke Akun Anda
          </h2>

          <div>
            <label className="text-sm font-medium">NIK</label>
            <Input
              placeholder="16 digit NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password / PIN</label>
            <Input
              type="password"
              placeholder="Masukkan password atau PIN"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          <p className="text-center text-sm">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 underline"
              disabled={loading}
            >
              Daftar Sekarang
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
