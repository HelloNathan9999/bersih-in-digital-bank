import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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
      // Call secure authentication edge function
      const { data, error } = await supabase.functions.invoke('auth', {
        body: {
          action: 'login',
          nik: nik,
          pin: pin
        }
      });

      if (error || !data.success) {
        toast({ title: 'Login gagal', description: data?.error || 'Login gagal', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      // Use magic link to authenticate with Supabase Auth
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
            console.log('Session error:', sessionError);
            toast({ title: 'Login gagal', description: 'Gagal membuat sesi', variant: 'destructive' });
            setIsLoading(false);
            return;
          }
        }
      }

      // Store minimal user data in secure storage
      const { secureStorage } = await import('@/lib/secure-storage');
      secureStorage.setItem("userData", data.user, 6 * 60 * 60 * 1000); // 6 hours expiry
      toast({ title: 'Berhasil Masuk', description: `Selamat datang, ${data.user.nama_lengkap}` });

      // Navigasi ke halaman OnboardingScreen setelah login sukses
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/onboarding');
      }
    } catch (err: any) {
      console.log('Login error:', err);
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
