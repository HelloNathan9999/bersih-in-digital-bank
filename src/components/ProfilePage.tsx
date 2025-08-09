
import React, { useState, useEffect } from 'react';
import { 
  User, 
<<<<<<< HEAD
  Settings, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Edit,
  Shield,
  Gift,
  Star,
  Wallet,
  Target,
  Users,
  TrendingUp,
  QrCode,
  Copy,
  Crown,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import WithdrawModal from './WithdrawModal';
import NotificationPage from './NotificationPage';
import WithdrawBankPage from './pages/WithdrawBankPage';
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

interface ProfilePageProps {
  onLogout: () => void;
  isDarkMode?: boolean;
}

<<<<<<< HEAD
interface LevelConfig {
  id: number;
  name: string;
  rank: string;
  design: string;
  cardGradient: string;
  chipColor: string;
  textColor: string;
  bgPattern: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, isDarkMode = false }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawBank, setShowWithdrawBank] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userBalance, setUserBalance] = useState(0);
  const [userData, setUserData] = useState({
    name: 'Nama Pengguna',
    email: 'email@example.com',
    joinDate: '2025-01-01',
    totalPoints: 0,
    totalEarnings: 0,
    totalWaste: 0,
    nik: ''
  });
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const user = JSON.parse(userDataString);
        setUserData({
          ...userData,
          name: user.nama_lengkap || '',
          nik: user.nik || '',
          joinDate: user.join_date || '',
          // ...state lain jika perlu
        });
          } catch {
        setUserData({
          name: '',
          email: '',
          joinDate: '',
          totalPoints: 0,
          totalEarnings: 0,
          totalWaste: 0,
          nik: '',
        });
      }
    }
  }, []);

useEffect(() => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    try {
      const user = JSON.parse(userDataString);
      setUserData({
        name: user.nama_lengkap || '',
        email: user.email || '',
        joinDate: user.join_date || '',
        totalPoints: user.totalPoints || 0,
        totalEarnings: user.totalEarnings || 0,
        totalWaste: user.totalWaste || 0,
        nik: user.nik || '',
      });
    } catch {
      setUserData({
        name: '',
        email: '',
        joinDate: '',
        totalPoints: 0,
        totalEarnings: 0,
        totalWaste: 0,
        nik: '',
      });
    }
  }
}, []);

    // Level configs and related logic
    const levelConfigs: LevelConfig[] = [
      {
        id: 1,
        name: 'Bronze',
        rank: 'Pemula',
        design: 'bronze',
        cardGradient: 'bg-gradient-to-r from-yellow-400/80 to-yellow-700/80',
        chipColor: 'bg-yellow-300',
        textColor: 'text-yellow-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/40 to-yellow-500/10'
      },
      // ... add more levels as needed
      {
        id: 2,
        name: 'Silver',
        rank: 'Menengah',
        design: 'silver',
        cardGradient: 'bg-gradient-to-r from-gray-300/80 to-gray-500/80',
        chipColor: 'bg-gray-200',
        textColor: 'text-gray-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-200/40 to-gray-500/10'
      },
      {
        id: 3,
        name: 'Gold',
        rank: 'Ahli',
        design: 'gold',
        cardGradient: 'bg-gradient-to-r from-yellow-300/80 to-yellow-500/80',
        chipColor: 'bg-yellow-200',
        textColor: 'text-yellow-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/40 to-yellow-500/10'
      },
      {
        id: 4,
        name: 'Platinum',
        rank: 'Master',
        design: 'platinum',
        cardGradient: 'bg-gradient-to-r from-blue-200/80 to-blue-400/80',
        chipColor: 'bg-blue-200',
        textColor: 'text-blue-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/40 to-blue-400/10'
      },
      {
        id: 5,
        name: 'Diamond',
        rank: 'Elite',
        design: 'diamond',
        cardGradient: 'bg-gradient-to-r from-indigo-200/80 to-indigo-400/80',
        chipColor: 'bg-indigo-200',
        textColor: 'text-indigo-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/40 to-indigo-400/10'
      },
      {
        id: 6,
        name: 'Emerald',
        rank: 'Champion',
        design: 'emerald',
        cardGradient: 'bg-gradient-to-r from-emerald-300/80 to-emerald-500/80',
        chipColor: 'bg-emerald-200',
        textColor: 'text-emerald-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/40 to-emerald-500/10'
      },
      {
        id: 7,
        name: 'Ruby',
        rank: 'Legend',
        design: 'ruby',
        cardGradient: 'bg-gradient-to-r from-red-300/80 to-red-500/80',
        chipColor: 'bg-red-200',
        textColor: 'text-red-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-200/40 to-red-500/10'
      },
      {
        id: 8,
        name: 'Sapphire',
        rank: 'Mythic',
        design: 'sapphire',
        cardGradient: 'bg-gradient-to-r from-blue-400/80 to-blue-700/80',
        chipColor: 'bg-blue-300',
        textColor: 'text-blue-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/40 to-blue-700/10'
      },
      {
        id: 9,
        name: 'Crown',
        rank: 'Ultimate',
        design: 'crown',
        cardGradient: 'bg-gradient-to-r from-yellow-400/90 to-yellow-600/90',
        chipColor: 'bg-yellow-400',
        textColor: 'text-yellow-900',
        bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/40 to-yellow-600/10'
      }
    ];

    const currentLevelConfig = levelConfigs.find(lvl => lvl.id === currentLevel) || levelConfigs[0];

    // Menu items
    const menuItems = [
      {
        label: 'Pengaturan Akun',
        icon: Settings,
        action: () => toast({ title: 'Pengaturan Akun', description: 'Fitur belum tersedia.' })
      },
      {
        label: 'Notifikasi',
        icon: Bell,
        action: () => setShowNotifications(true)
      },
      {
        label: 'Tarik Saldo',
        icon: Wallet,
        action: () => setShowWithdrawModal(true)
      },
      {
        label: 'Bantuan',
        icon: HelpCircle,
        action: () => toast({ title: 'Bantuan', description: 'Fitur belum tersedia.' })
      },
      {
        label: 'Reward',
        icon: Gift,
        action: () => toast({ title: 'Reward', description: 'Fitur belum tersedia.' })
      },
      {
        label: 'Keamanan',
        icon: Shield,
        action: () => toast({ title: 'Keamanan', description: 'Fitur belum tersedia.' })
      }
    ];

    // Referral copy handler
    const handleCopyReferral = () => {
      const code = `BERSIH${userData.name?.substring(0, 3).toUpperCase() || 'USR'}${currentLevel}`;
      navigator.clipboard.writeText(code);
      toast({ title: 'Kode Referral Disalin', description: code });
    };

    // Conditional rendering for notifications and withdraw bank
    if (showNotifications) {
      return (
        <NotificationPage 
          onBack={() => setShowNotifications(false)}
          isDarkMode={isDarkMode}
        />
      );
    }

    if (showWithdrawBank) {
      return (
        <WithdrawBankPage 
          onBack={() => setShowWithdrawBank(false)}
          amount="0"
          isDarkMode={isDarkMode}
        />
      );
    }

    return (
      <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 rounded-b-2xl backdrop-blur-lg ${
          isDarkMode ? 'bg-gradient-to-r from-emerald-600/90 to-teal-700/90 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 border-white/20'
        } text-white border`}>
          <div className="px-6">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Debit Card Design */}
          <Card className={`mb-6 overflow-hidden ${currentLevelConfig.bgPattern} ${currentLevelConfig.cardGradient} shadow-2xl`}>
            <CardContent className="p-6 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className={`text-xl font-bold ${currentLevelConfig.textColor}`}>
                      BERSIH.IN CARD
                    </h2>
                    <p className={`text-sm opacity-80 ${currentLevelConfig.textColor}`}>
                      MEMBERSHIP
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className={`w-6 h-6 ${currentLevel >= 9 ? 'text-yellow-300' : currentLevelConfig.textColor}`} />
                    <span className={`text-lg font-bold ${currentLevelConfig.textColor}`}>
                      LV.{currentLevel}
                    </span>
                  </div>
                </div>

                {/* Chip and QR */}
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-12 h-8 ${currentLevelConfig.chipColor} rounded-md flex items-center justify-center shadow-lg`}>
                    <div className="w-8 h-6 bg-black/20 rounded-sm"></div>
                  </div>
                  <button
                    onClick={handleCopyReferral}
                    className={`p-2 ${currentLevelConfig.chipColor} rounded-lg hover:opacity-80 transition-opacity`}
                  >
                    <QrCode className="w-6 h-6 text-gray-800" />
                  </button>
                </div>

                {/* Balance */}
                <div className="mb-4">
                  <p className={`text-sm opacity-80 ${currentLevelConfig.textColor}`}>
                    Total Saldo
                  </p>
                  <p className={`text-2xl font-bold ${currentLevelConfig.textColor}`}>
                    Rp {userBalance.toLocaleString()}
                  </p>
                </div>

                {/* Card Number (Mock) */}
                <div className="mb-6">
                  <p className={`text-lg font-mono tracking-widest ${currentLevelConfig.textColor}`}>
                    •••• •••• •••• {userData.nik ? userData.nik.slice(-4) : '0000'}
                  </p>
                </div>

                {/* Cardholder Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className={`text-xs opacity-80 ${currentLevelConfig.textColor}`}>
                      NAMA MEMBER
                    </p>
                    <p className={`text-sm font-bold ${currentLevelConfig.textColor}`}>
                      {userData.name ? userData.name.toUpperCase() : 'NAMA PENGGUNA'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs opacity-80 ${currentLevelConfig.textColor}`}>
                      BERGABUNG
                    </p>
                    <p className={`text-sm font-bold ${currentLevelConfig.textColor}`}>
                      {userData.joinDate
                      ? new Date(userData.joinDate).toLocaleDateString('id-ID', { month: '2-digit', year: '2-digit' })
                      : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Level indicator */}
              <div className="absolute top-2 right-2">
                <Badge className={`${currentLevelConfig.chipColor} text-gray-800 font-bold`}>
                  {currentLevelConfig.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Level Information */}
          <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Status Level
                </h3>
                <Award className={`w-5 h-5 ${currentLevel >= 6 ? 'text-yellow-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Level Saat Ini
                  </p>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentLevelConfig.name}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pangkat
                  </p>
                  <p className={`font-semibold text-emerald-600`}>
                    {currentLevelConfig.rank}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Poin</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {userData.totalPoints}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Sampah</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {userData.totalWaste} kg
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Section */}
          <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Referral Code
                </h3>
                <Users className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              
              <div className="flex items-center space-x-3">
                <code className={`flex-1 p-3 rounded-lg font-mono text-center ${
                  isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-green-600'
                }`}>
                  BERSIH{userData.name?.substring(0, 3).toUpperCase() || 'USR'}{currentLevel}
                </code>
                <Button
                  size="sm"
                  onClick={handleCopyReferral}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bagikan kode ini untuk mendapatkan reward
              </p>
            </CardContent>
          </Card>

          {/* Menu Items */}
          <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-0">
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
<<<<<<< HEAD
                    className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
                    } ${isDarkMode ? 'hover:bg-gray-700 border-gray-700' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button
            variant="outline"
            className={`w-full mb-6 ${
              isDarkMode 
                ? 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white' 
                : 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white'
            }`}
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Keluar
          </Button>
        </div>

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <WithdrawModal
            isOpen={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            onNavigateToBank={(amount: string) => {
              setShowWithdrawBank(true);
            }}
            currentBalance={userBalance}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    );
  };
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

export default ProfilePage;
