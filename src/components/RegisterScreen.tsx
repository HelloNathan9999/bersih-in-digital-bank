<<<<<<< HEAD
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);
=======

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

<<<<<<< HEAD
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
    kodeRefferal: "",
  });

=======
const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nik: '',
    namaLengkap: '',
    nomorTelepon: '',
    email: '',
    kataSandi: '',
    verifikasiKataSandi: '',
    pin: '',
    verifikasiPin: '',
    kodeRefferal: ''
  });
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
<<<<<<< HEAD
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
=======
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nik || formData.nik.length !== 16) {
      toast({
        title: "Error",
        description: "NIK harus 16 digit",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.namaLengkap) {
      toast({
        title: "Error",
        description: "Nama lengkap harus diisi",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.nomorTelepon || formData.nomorTelepon.length < 10) {
      toast({
        title: "Error",
        description: "Nomor telepon tidak valid",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email || !formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Email tidak valid",
        variant: "destructive"
      });
      return false;
    }

    if (formData.kataSandi !== formData.verifikasiKataSandi) {
      toast({
        title: "Error",
        description: "Kata sandi tidak cocok",
        variant: "destructive"
      });
      return false;
    }

    if (formData.kataSandi.length < 6) {
      toast({
        title: "Error",
        description: "Kata sandi minimal 6 karakter",
        variant: "destructive"
      });
      return false;
    }

    if (formData.pin !== formData.verifikasiPin) {
      toast({
        title: "Error",
        description: "PIN tidak cocok",
        variant: "destructive"
      });
      return false;
    }

    if (formData.pin.length !== 6) {
      toast({
        title: "Error",
        description: "PIN harus 6 digit",
        variant: "destructive"
      });
      return false;
    }

    if (!agreedToTerms) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui ketentuan",
        variant: "destructive"
      });
      return false;
    }
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
<<<<<<< HEAD
    setIsLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("nik", formData.nik)
        .single();

      if (existingUser) {
        toastError("NIK sudah terdaftar di sistem BERSIH.IN");
        setIsLoading(false);
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(formData.kataSandi, salt);
      const hashedPin = bcrypt.hashSync(formData.pin, salt);

      const { error } = await supabase.from("users").insert([
        {
          nik: formData.nik,
          nama_lengkap: formData.namaLengkap,
          nomor_hp: formData.nomorTelepon,
          email: formData.email,
          password_hash: hashedPassword,
          pin_hash: hashedPin,
          refferal_code: formData.kodeRefferal || null,
          alamat: "",
          photo_url: "",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Registrasi Berhasil",
        description: "Akun Anda telah dibuat! Silakan login.",
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
        kodeRefferal: "",
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
            value={formData.kodeRefferal}
            onChange={(e) => handleInputChange("kodeRefferal", e.target.value)}
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
=======

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userToken', 'dummy-token');
      localStorage.setItem('userData', JSON.stringify({
        nik: formData.nik,
        name: formData.namaLengkap,
        phone: formData.nomorTelepon,
        email: formData.email
      }));
      
      toast({
        title: "Registrasi Berhasil",
        description: "Akun Anda telah dibuat! Selamat datang di BERSIH.IN",
      });
      
      setIsLoading(false);
      onRegisterSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 pt-12 pb-6 rounded-b-[2rem]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-1">Daftar Akun Baru</h1>
          <p className="text-green-100">Bergabung dengan BERSIH.IN</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 -mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nik" className="text-gray-700 font-medium text-sm">
                NIK (Nomor Induk Kependudukan) *
              </Label>
              <Input
                id="nik"
                type="number"
                placeholder="16 digit NIK"
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                className="mt-1"
                maxLength={16}
              />
            </div>

            <div>
              <Label htmlFor="namaLengkap" className="text-gray-700 font-medium text-sm">
                Nama Lengkap *
              </Label>
              <Input
                id="namaLengkap"
                type="text"
                placeholder="Nama sesuai KTP"
                value={formData.namaLengkap}
                onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="nomorTelepon" className="text-gray-700 font-medium text-sm">
                Nomor Telepon *
              </Label>
              <Input
                id="nomorTelepon"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.nomorTelepon}
                onChange={(e) => handleInputChange('nomorTelepon', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="kataSandi" className="text-gray-700 font-medium text-sm">
                Kata Sandi *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="kataSandi"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  value={formData.kataSandi}
                  onChange={(e) => handleInputChange('kataSandi', e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="verifikasiKataSandi" className="text-gray-700 font-medium text-sm">
                Verifikasi Kata Sandi *
              </Label>
              <Input
                id="verifikasiKataSandi"
                type="password"
                placeholder="Ulangi kata sandi"
                value={formData.verifikasiKataSandi}
                onChange={(e) => handleInputChange('verifikasiKataSandi', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pin" className="text-gray-700 font-medium text-sm">
                Buat PIN (6 Digit) *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="6 digit PIN"
                  value={formData.pin}
                  onChange={(e) => handleInputChange('pin', e.target.value)}
                  className="pr-10"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="verifikasiPin" className="text-gray-700 font-medium text-sm">
                Verifikasi PIN *
              </Label>
              <Input
                id="verifikasiPin"
                type="password"
                placeholder="Ulangi PIN"
                value={formData.verifikasiPin}
                onChange={(e) => handleInputChange('verifikasiPin', e.target.value)}
                className="mt-1"
                maxLength={6}
              />
            </div>

            <div>
              <Label htmlFor="kodeRefferal" className="text-gray-700 font-medium text-sm">
                Kode Referral (Opsional)
              </Label>
              <Input
                id="kodeRefferal"
                type="text"
                placeholder="Masukkan kode referral"
                value={formData.kodeRefferal}
                onChange={(e) => handleInputChange('kodeRefferal', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex items-start space-x-3 py-4">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-5">
                Saya menyetujui untuk menjaga kebersihan lingkungan tempat saya tinggal dan 
                mengikuti ketentuan yang berlaku di BERSIH.IN
              </Label>
            </div>

            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg rounded-xl"
            >
              {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Sudah punya akun?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
      </div>
    </div>
  );
};

export default RegisterScreen;
