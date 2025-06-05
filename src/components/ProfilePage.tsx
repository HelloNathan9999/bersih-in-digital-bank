
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Edit, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  Shield,
  FileText,
  HelpCircle,
  LogOut,
  Award,
  TrendingUp,
  Coins,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface ProfilePageProps {
  onLogout: () => void;
  isDarkMode?: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, isDarkMode = false }) => {
  const [showFullNIK, setShowFullNIK] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Pengguna BERSIH.IN',
    nik: '1234567890123456',
    phone: '08123456789',
    email: 'user@example.com',
    address: 'Jl. Contoh No. 123, Jakarta Selatan',
    level: 'Eco Warrior',
    totalPoints: 2450,
    totalEarnings: 125000,
    totalWaste: 45.5,
    joinDate: '2025-01-15'
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsed = JSON.parse(storedUserData);
      setUserData(prev => ({
        ...prev,
        name: parsed.name || 'Pengguna BERSIH.IN',
        nik: parsed.nik || '1234567890123456',
        phone: parsed.phone || '08123456789',
        email: parsed.email || 'user@example.com'
      }));
    }
  }, []);

  const handleShowNIK = () => {
    // Request PIN verification
    const pin = prompt("Masukkan PIN 6 digit untuk melihat NIK lengkap:");
    if (pin && pin.length === 6) {
      setShowFullNIK(true);
      toast({
        title: "NIK Ditampilkan",
        description: "Data berhasil diverifikasi",
      });
    } else {
      toast({
        title: "PIN Tidak Valid",
        description: "PIN harus 6 digit",
        variant: "destructive"
      });
    }
  };

  const maskNIK = (nik: string) => {
    if (showFullNIK) return nik;
    return nik.substring(0, 4) + '****' + nik.substring(12);
  };

  const achievements = [
    { icon: '🌱', title: 'Eco Starter', description: 'Setor sampah pertama' },
    { icon: '♻️', title: 'Recycling Hero', description: 'Setor 50kg sampah' },
    { icon: '🏆', title: 'Top Contributor', description: 'Masuk top 10 bulan ini' },
    { icon: '🌍', title: 'Earth Protector', description: 'Aktif 30 hari berturut' }
  ];

  const menuItems = [
    { icon: Award, label: 'Badge & Pencapaian', action: () => {} },
    { icon: TrendingUp, label: 'Statistik Kontribusi', action: () => {} },
    { icon: Coins, label: 'Riwayat Poin & Saldo', action: () => {} },
    { icon: Share2, label: 'Kode Referral', action: () => {} },
    { icon: Shield, label: 'Keamanan & Privasi', action: () => {} },
    { icon: FileText, label: 'Syarat & Ketentuan', action: () => {} },
    { icon: HelpCircle, label: 'FAQ & Bantuan', action: () => {} }
  ];

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg shadow-sm`}>
        <div className="px-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Profile
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6" style={{ marginTop: '120px' }}>
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20 border-4 border-white/20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {userData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">{userData.level}</span>
                </div>
                <p className="text-white/80 text-sm">
                  Bergabung sejak {new Date(userData.joinDate).toLocaleDateString('id-ID')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{userData.totalPoints}</div>
                <div className="text-white/80 text-xs">Total Poin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {(userData.totalEarnings / 1000).toFixed(0)}K
                </div>
                <div className="text-white/80 text-xs">Penghasilan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userData.totalWaste}</div>
                <div className="text-white/80 text-xs">kg Sampah</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className={`shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Informasi Pribadi
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Nomor Induk Kependudukan
                  </p>
                  <p className="font-mono text-lg">{maskNIK(userData.nik)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShowNIK}
                  className="text-blue-600"
                >
                  {showFullNIK ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Nomor Telepon
                      </p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Email
                      </p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {userData.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Alamat
                      </p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {userData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className={`shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Badge & Pencapaian
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`rounded-lg p-3 text-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className={`shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Menu Lainnya
            </h3>
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`w-full flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-white' 
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>›</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Copyright & Terms */}
        <Card className={`border-gray-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'
        }`}>
          <CardContent className="p-6 text-center">
            <div className={`space-y-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div>
                <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Copyright & Terms of Service
                </h4>
                <p className="text-xs leading-relaxed">
                  © 2025 BERSIH.IN - Semua Hak Cipta Dilindungi<br/>
                  Dikembangkan oleh RUBIX STUDIO<br/>
                  Diciptakan oleh: Nathannael Wijaya, S.Ds, MIT
                </p>
              </div>
              
              <div className="border-t pt-3">
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Hak cipta aplikasi ini telah terdaftar dan dilindungi berdasarkan UU No. 28 Tahun 2014 
                  Tentang Hak Cipta di bawah naungan Direktorat Jenderal Kekayaan Intelektual (DJKI).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="destructive"
          className="w-full py-3 font-semibold"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Keluar dari Akun
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
