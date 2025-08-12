import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // import untuk navigasi

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jinustozhspnbcbzfcnp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '...';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
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
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast({ title: 'Error', description: 'Terjadi kesalahan saat login', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
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
              <Input
                id="nik"
                type="number"
                placeholder="Masukkan 16 digit NIK"
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="pin">PIN (6 Digit)</Label>
              <div className="relative mt-2">
                <Input
                  id="pin"
                  type={showPin ? 'text' : 'password'}
                  placeholder="Masukkan PIN"
                  value={formData.pin}
                  onChange={(e) => handleInputChange('pin', e.target.value)}
                  className="text-lg pr-12"
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
              <button className="text-blue-600 hover:underline">Lupa PIN?</button>
              <button className="text-blue-600 hover:underline">Lupa NIK?</button>
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
                onClick={() => onSwitchToRegister ? onSwitchToRegister() : navigate('/register')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 text-center text-xs text-gray-500">
        <p>© 2025 BERSIH.IN - RUBIX STUDIO</p>
        <p>Dikembangkan oleh Nathannael Wijaya, S.Ds, MIT</p>
      </div>
    </div>
  );
};

export default LoginScreen;
