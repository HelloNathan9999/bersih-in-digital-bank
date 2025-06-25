
import React, { useState, useEffect } from 'react';
import { 
  User, 
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

interface ProfilePageProps {
  onLogout: () => void;
  isDarkMode?: boolean;
}

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
    totalWaste: 0
  });

  const levelConfigs: LevelConfig[] = [
    {
      id: 1,
      name: "Al-Balad",
      rank: "Tamtama 1 – Prajurit Dua",
      design: "1 garis kuning datar, latar hijau tua",
      cardGradient: "from-green-800 via-green-700 to-green-900",
      chipColor: "bg-yellow-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 2,
      name: "Al-Insyiqaq",
      rank: "Tamtama 2 – Prajurit Satu",
      design: "2 garis kuning datar, simple",
      cardGradient: "from-green-700 via-green-600 to-green-800",
      chipColor: "bg-yellow-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 3,
      name: "Al-Muthaffifin",
      rank: "Bintara 1 – Sersan Dua",
      design: "Chevron perak satu, ikon mini daur ulang",
      cardGradient: "from-slate-600 via-slate-500 to-slate-700",
      chipColor: "bg-emerald-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 4,
      name: "Ar-Rum",
      rank: "Bintara 2 – Sersan Satu",
      design: "Chevron perak dua, lingkaran hijau",
      cardGradient: "from-slate-500 via-slate-400 to-slate-600",
      chipColor: "bg-green-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 5,
      name: "Al-Ma'un",
      rank: "Bintara 3 – Sersan Mayor",
      design: "Chevron emas + bintang kecil",
      cardGradient: "from-yellow-600 via-yellow-500 to-yellow-700",
      chipColor: "bg-white",
      textColor: "text-gray-900",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 6,
      name: "Al-Hujurat",
      rank: "Perwira 1 – Letnan Dua",
      design: "1 bintang emas + latar berlapis daun",
      cardGradient: "from-emerald-600 via-emerald-500 to-green-600",
      chipColor: "bg-yellow-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 7,
      name: "Al-Baqarah",
      rank: "Perwira 2 – Letnan Satu",
      design: "2 bintang emas + garis sampah daur ulang",
      cardGradient: "from-blue-600 via-blue-500 to-indigo-600",
      chipColor: "bg-yellow-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 8,
      name: "Sad",
      rank: "Perwira 3 – Kapten",
      design: "3 bintang emas + ikon edukasi terbuka",
      cardGradient: "from-purple-600 via-purple-500 to-indigo-600",
      chipColor: "bg-yellow-400",
      textColor: "text-white",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 9,
      name: "An-Nur",
      rank: "Perwira Tinggi – Kolonel",
      design: "Lambang daun emas + lingkaran sinar",
      cardGradient: "from-orange-500 via-yellow-500 to-orange-600",
      chipColor: "bg-white",
      textColor: "text-gray-900",
      bgPattern: "bg-gradient-to-br"
    },
    {
      id: 10,
      name: "Al-A'raf",
      rank: "Jenderal Kehormatan",
      design: "4 bintang emas, mahkota sampah & cahaya hijau",
      cardGradient: "from-gradient-to-r from-purple-600 via-pink-500 to-red-500",
      chipColor: "bg-yellow-300",
      textColor: "text-white",
      bgPattern: "bg-gradient-conic"
    }
  ];

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setCurrentLevel(parsedUser.level || 1);
    }

    const balance = localStorage.getItem('userBalance');
    if (balance) {
      setUserBalance(Number(balance));
    }
  }, []);

  const currentLevelConfig = levelConfigs.find(level => level.id === currentLevel) || levelConfigs[0];

  const handleCopyReferral = () => {
    const referralCode = `BERSIH${userData.name?.substring(0, 3).toUpperCase()}${currentLevel}${Date.now().toString().slice(-4)}`;
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Kode Referral Disalin",
      description: `Kode referral ${referralCode} berhasil disalin`,
    });
  };

  const menuItems = [
    { icon: CreditCard, label: 'Metode Pembayaran', action: () => setShowWithdrawBank(true) },
    { icon: Bell, label: 'Notifikasi', action: () => setShowNotifications(true) },
    { icon: Gift, label: 'Reward & Voucher', action: () => {} },
    { icon: Shield, label: 'Keamanan Akun', action: () => {} },
    { icon: HelpCircle, label: 'Bantuan & FAQ', action: () => {} },
    { icon: Settings, label: 'Pengaturan', action: () => {} }
  ];

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
                    ECO MEMBER
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
                  •••• •••• •••• {String(currentLevel).padStart(4, '0')}
                </p>
              </div>

              {/* Cardholder Info */}
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-xs opacity-80 ${currentLevelConfig.textColor}`}>
                    NAMA MEMBER
                  </p>
                  <p className={`text-sm font-bold ${currentLevelConfig.textColor}`}>
                    {userData.name?.toUpperCase() || 'NAMA PENGGUNA'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs opacity-80 ${currentLevelConfig.textColor}`}>
                    BERGABUNG
                  </p>
                  <p className={`text-sm font-bold ${currentLevelConfig.textColor}`}>
                    {new Date(userData.joinDate).toLocaleDateString('id-ID', { month: '2-digit', year: '2-digit' })}
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
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
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

export default ProfilePage;
