<<<<<<< HEAD
=======

>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // import untuk navigasi

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jinustozhspnbcbzfcnp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '...';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({ nik: '', pin: '' });
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // inisialisasi navigate

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { nik, pin } = formData;

    if (!nik || !pin) {
      toast({ title: 'Error', description: 'NIK dan PIN wajib diisi', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('nik', nik)
        .single();

      if (error || !user) {
        toast({ title: 'Login gagal', description: 'NIK tidak ditemukan', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
      
      // Ambil user dari Supabase
const { data: userData, error: userDataError } = await supabase
  .from('users')
  .select('nik, nama_lengkap, created_at') // pastikan created_at ikut diambil
  .eq('nik', nik)
  .single();

if (userData) {
  localStorage.setItem('userData', JSON.stringify({
    nik: userData.nik,
    nama_lengkap: userData.nama_lengkap,
    join_date: userData.created_at, // simpan created_at ke localStorage
  }));
}


      const isPinValid = await bcrypt.compare(pin, user.pin_hash);

      if (!isPinValid) {
        toast({ title: 'Login gagal', description: 'PIN salah', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      // Simpan data user di localStorage
      localStorage.setItem('userData', JSON.stringify(user));
      toast({ title: 'Berhasil Masuk', description: `Selamat datang, ${user.nama_lengkap}` });

      // Navigasi ke halaman OnboardingScreen setelah login sukses
      navigate('/onboarding');
    } catch (err) {
      console.error('Login error:', err);
      toast({ title: 'Error', description: 'Terjadi kesalahan saat login', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
=======

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    nik: '',
    pin: ''
  });
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.nik || !formData.pin) {
      toast({
        title: "Error",
        description: "NIK dan PIN harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (formData.nik.length !== 16) {
      toast({
        title: "Error", 
        description: "NIK harus 16 digit",
        variant: "destructive"
      });
      return;
    }

    if (formData.pin.length !== 6) {
      toast({
        title: "Error",
        description: "PIN harus 6 digit",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userToken', 'dummy-token');
      localStorage.setItem('userData', JSON.stringify({
        nik: formData.nik,
        name: 'Pengguna BERSIH.IN'
      }));
      
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di BERSIH.IN!",
      });
      
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
<<<<<<< HEAD
      <div className="bg-gradient-to-r from-green-500 to-blue-500 pt-12 pb-8 rounded-b-[2rem] text-center text-white">
        <h1 className="text-3xl font-bold mb-2">BERSIH.IN</h1>
        <p className="text-green-100">Bank Sampah Digital</p>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 -mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Masuk ke Akun Anda</h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
=======
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 pt-12 pb-8 rounded-b-[2rem]">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">BERSIH.IN</h1>
          <p className="text-green-100">Bank Sampah Digital</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 -mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Masuk ke Akun Anda
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="nik" className="text-gray-700 font-medium">
                Nomor Induk Kependudukan (NIK)
              </Label>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
              <Input
                id="nik"
                type="number"
                placeholder="Masukkan 16 digit NIK"
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                className="mt-2 text-lg"
<<<<<<< HEAD
=======
                maxLength={16}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
              />
            </div>

            <div>
<<<<<<< HEAD
              <Label htmlFor="pin">PIN (6 Digit)</Label>
              <div className="relative mt-2">
                <Input
                  id="pin"
                  type={showPin ? 'text' : 'password'}
=======
              <Label htmlFor="pin" className="text-gray-700 font-medium">
                PIN (6 Digit)
              </Label>
              <div className="relative mt-2">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                  placeholder="Masukkan PIN"
                  value={formData.pin}
                  onChange={(e) => handleInputChange('pin', e.target.value)}
                  className="text-lg pr-12"
<<<<<<< HEAD
=======
                  maxLength={6}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
<<<<<<< HEAD
              <button className="text-blue-600 hover:underline">Lupa PIN?</button>
              <button className="text-blue-600 hover:underline">Lupa NIK?</button>
=======
              <button className="text-blue-600 hover:underline">
                Lupa PIN?
              </button>
              <button className="text-blue-600 hover:underline">
                Lupa NIK?
              </button>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg rounded-xl"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <button
<<<<<<< HEAD
                onClick={() => navigate('/register')}
=======
                onClick={onSwitchToRegister}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                className="text-blue-600 font-semibold hover:underline"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* Footer */}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
      <div className="p-6 text-center text-xs text-gray-500">
        <p>© 2025 BERSIH.IN - RUBIX STUDIO</p>
        <p>Dikembangkan oleh Nathannael Wijaya, S.Ds, MIT</p>
      </div>
    </div>
  );
};

export default LoginScreen;
