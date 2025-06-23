
import React, { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import WithdrawModal from './WithdrawModal';
import NotificationPage from './NotificationPage';
import WithdrawBankPage from './pages/WithdrawBankPage';

interface ProfilePageProps {
  onLogout: () => void;
  isDarkMode?: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, isDarkMode = false }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawBank, setShowWithdrawBank] = useState(false);

  // Check if user is in initial setup (no bank data completed yet)
  const userBankName = localStorage.getItem('userBankName');
  const userAccountNumber = localStorage.getItem('userAccountNumber');
  const isInitialSetup = !userBankName || !userAccountNumber;

  const userStats = {
    totalDeposits: 47,
    totalEarnings: 'Rp 156,750',
    currentBalance: 'Rp 45,250',
    ecoPoints: 312,
    level: 'Eco Warrior',
    nextLevelPoints: 88
  };

  const achievements = [
    { icon: Star, label: 'First Deposit', unlocked: true },
    { icon: Target, label: '10x Deposits', unlocked: true },
    { icon: Users, label: 'Community Helper', unlocked: false },
    { icon: TrendingUp, label: 'Eco Champion', unlocked: false }
  ];

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
      <div className={`fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'
      } text-white`}>
        <div className="px-6">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="px-6 py-6" style={{ marginTop: '100px' }}>
        {/* Bank Data Notification - Only show during initial setup */}
        {isInitialSetup && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Data Tidak Lengkap</h3>
                  <p className="text-sm text-red-600 mb-3">
                    Lengkapi data bank & rekening Anda terlebih dahulu
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowWithdrawBank(true)}
                  >
                    Lengkapi Sekarang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Header */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  John Doe
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  john.doe@email.com
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {userStats.level}
                  </Badge>
                  <span className={`text-sm ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {userStats.nextLevelPoints} poin lagi
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Saldo</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userStats.currentBalance}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-emerald-500" />
              </div>
              <Button 
                size="sm" 
                className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowWithdrawModal(true)}
              >
                Tarik Saldo
              </Button>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Eco Points</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userStats.ecoPoints}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Pencapaian
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      achievement.unlocked 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <p className={`text-xs ${
                      achievement.unlocked 
                        ? isDarkMode ? 'text-white' : 'text-gray-800'
                        : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {achievement.label}
                    </p>
                  </div>
                );
              })}
            </div>
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
          currentBalance={userStats.currentBalance}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default ProfilePage;
