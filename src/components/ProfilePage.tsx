
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
    totalWaste: 0,
    nik: ''
  });
  useEffect(() => {
    const loadUserData = async () => {
      const { secureStorage } = await import('@/lib/secure-storage');
      const user = secureStorage.getItem('userData');
      if (user) {
        setUserData({
          ...userData,
          name: user.nama_lengkap || '',
          nik: user.nik || '',
          joinDate: user.join_date || '',
        });
      } else {
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
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const loadCompleteUserData = async () => {
      const { secureStorage } = await import('@/lib/secure-storage');
      const user = secureStorage.getItem('userData');
      if (user) {
        setUserData({
          name: user.nama_lengkap || '',
          email: user.email || '',
          joinDate: user.join_date || '',
          totalPoints: user.totalPoints || 0,
          totalEarnings: user.totalEarnings || 0,
          totalWaste: user.totalWaste || 0,
          nik: user.nik || '',
        });
      } else {
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
    };
    loadCompleteUserData();
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
