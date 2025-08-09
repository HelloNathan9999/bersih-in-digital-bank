import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import bcrypt from "bcryptjs";

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
      // LOGIN: cari user berdasarkan NIK
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("nik", nik)
        .single();

      if (error || !user) {
        toast({ title: "NIK tidak ditemukan!" });
        return;
      }

      const isValid = await bcrypt.compare(pin, user.pin_hash);
      if (!isValid) {
        toast({ title: "PIN salah!" });
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${user.nama_lengkap}`,
      });
      navigate("/");
    } else {
      // REGISTER: cek apakah NIK sudah ada
      const { data: existingUser } = await supabase
        .from("users")
        .select("nik")
        .eq("nik", nik)
        .maybeSingle();

      if (existingUser) {
        toast({ title: "NIK sudah terdaftar!" });
        return;
      }

      const hashedPin = bcrypt.hashSync(pin, 10);
      const { error } = await supabase.from("users").insert({
        nik,
        nama_lengkap: namaLengkap,
        pin_hash: hashedPin,
      });

      if (error) {
        toast({ title: "Registrasi gagal", description: error.message });
      } else {
        toast({
          title: "Registrasi berhasil!",
          description: "Silakan login.",
        });
        setIsLogin(true);
        setNik("");
        setPin("");
        setNamaLengkap("");
      }
    }
  };

  const handleLogout = async () => {
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
