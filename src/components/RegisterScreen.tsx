import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    nik: "",
    namaLengkap: "",
    nomorTelepon: "",
    email: "",
    kataSandi: "",
    verifikasiKataSandi: "",
    pin: "",
    verifikasiPin: "",
    kodeReferral: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toastError = (msg: string) =>
    toast({ title: "Error", description: msg, variant: "destructive" });

  const validateForm = () => {
    const {
      nik,
      namaLengkap,
      nomorTelepon,
      email,
      kataSandi,
      verifikasiKataSandi,
      pin,
      verifikasiPin,
    } = formData;

    if (!nik || nik.length !== 16) return toastError("NIK harus 16 digit");
    if (!namaLengkap) return toastError("Nama lengkap harus diisi");
    if (!nomorTelepon || nomorTelepon.length < 10)
      return toastError("Nomor telepon tidak valid");
    if (!email.includes("@")) return toastError("Email tidak valid");
    if (kataSandi.length < 6)
      return toastError("Kata sandi minimal 6 karakter");
    if (kataSandi !== verifikasiKataSandi)
      return toastError("Kata sandi tidak cocok");
    if (pin.length !== 6) return toastError("PIN harus 6 digit");
    if (pin !== verifikasiPin) return toastError("PIN tidak cocok");
    if (!agreedToTerms)
      return toastError("Anda harus menyetujui ketentuan BERSIH.IN");

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Call secure registration edge function
      const { data, error } = await supabase.functions.invoke('auth', {
        body: {
          action: 'register',
          nik: formData.nik,
          nama_lengkap: formData.namaLengkap,
          nomor_hp: formData.nomorTelepon,
          email: formData.email,
          password: formData.kataSandi,
          pin: formData.pin,
          refferal_code: formData.kodeReferral
        }
      });

      if (error || !data.success) {
        toastError(data?.error || "Terjadi kesalahan saat registrasi.");
        setIsLoading(false);
        return;
      }

      // Use magic link to authenticate with Supabase Auth after registration
      if (data.magic_link) {
        // Extract token from magic link
        const url = new URL(data.magic_link);
        const accessToken = url.searchParams.get('access_token');
        const refreshToken = url.searchParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          // Set session with Supabase Auth
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) {
            console.error('Session error after registration:', sessionError);
          }
        }
      }

      toast({
        title: "Registrasi Berhasil",
        description: "Akun Anda telah dibuat! Selamat datang!",
      });

      setFormData({
        nik: "",
        namaLengkap: "",
        nomorTelepon: "",
        email: "",
        kataSandi: "",
        verifikasiKataSandi: "",
        pin: "",
        verifikasiPin: "",
        kodeReferral: "",
      });

      setAgreedToTerms(false);
      onRegisterSuccess();
    } catch (err: any) {
      toastError(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-5 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center">Daftar Akun Baru</h2>
      <p className="text-sm text-muted-foreground text-center">
        Bergabung dengan <span className="font-semibold text-primary">BERSIH.IN</span>
      </p>

      <div className="space-y-4">
        <div>
          <Label>NIK *</Label>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={16}
            value={formData.nik}
            onChange={(e) =>
              handleInputChange(
                "nik",
                e.target.value.replace(/\D/g, "").slice(0, 16)
              )
            }
            placeholder="16 digit NIK"
          />
        </div>

        <div>
          <Label>Nama Lengkap *</Label>
          <Input
            value={formData.namaLengkap}
            onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
            placeholder="Nama sesuai KTP"
          />
        </div>

        <div>
          <Label>Nomor Telepon *</Label>
          <Input
            type="tel"
            inputMode="numeric"
            value={formData.nomorTelepon}
            onChange={(e) =>
              handleInputChange(
                "nomorTelepon",
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <Label>Kata Sandi *</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.kataSandi}
              onChange={(e) => handleInputChange("kataSandi", e.target.value)}
              placeholder="Minimal 6 karakter"
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <Label>Verifikasi Kata Sandi *</Label>
          <Input
            type="password"
            value={formData.verifikasiKataSandi}
            onChange={(e) =>
              handleInputChange("verifikasiKataSandi", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Buat PIN (6 Digit) *</Label>
          <div className="relative">
            <Input
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              maxLength={6}
              value={formData.pin}
              onChange={(e) =>
                handleInputChange(
                  "pin",
                  e.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="6 digit PIN"
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-500"
              onClick={() => setShowPin(!showPin)}
            >
              {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <Label>Verifikasi PIN *</Label>
          <Input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={formData.verifikasiPin}
            onChange={(e) =>
              handleInputChange(
                "verifikasiPin",
                e.target.value.replace(/\D/g, "").slice(0, 6)
              )
            }
          />
        </div>

        <div>
          <Label>Kode Referral (Opsional)</Label>
          <Input
            value={formData.kodeReferral}
            onChange={(e) => handleInputChange("kodeReferral", e.target.value)}
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
          />
          <span className="text-sm leading-tight">
            Saya menyetujui untuk menjaga kebersihan dan mengikuti ketentuan{" "}
            <span className="font-semibold">BERSIH.IN</span>
          </span>
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 text-lg rounded-xl shadow-md"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
        </Button>

        <p className="text-sm text-center mt-4">
          Sudah punya akun?{" "}
          <button
            onClick={onSwitchToLogin}
            className="underline text-primary font-medium"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
