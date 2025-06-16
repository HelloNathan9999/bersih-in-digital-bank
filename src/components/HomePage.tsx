
import React, { useState } from 'react';
import { 
  Bell, 
  Eye, 
  EyeOff, 
  Plus, 
  Minus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift,
  Wallet,
  TrendingUp,
  Users,
  Leaf,
  Award,
  Calendar,
  CreditCard,
  Sparkles,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationPage from './NotificationPage';
import WithdrawModal from './WithdrawModal';
import WithdrawBankPage from './pages/WithdrawBankPage';
import { toast } from '@/hooks/use-toast';

interface HomePageProps {
  isDarkMode?: boolean;
  onThemeToggle: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [currentBalance, setCurrentBalance] = useState(1247500); // State untuk saldo yang bisa berubah

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Setor Sampah', 
      color: 'text-emerald-600', 
      bg: isDarkMode ? 'bg-gradient-to-br from-emerald-600/20 to-emerald-700/30' : 'bg-gradient-to-br from-emerald-100 to-emerald-200',
      action: () => toast({
        title: "Fitur Setor Sampah",
        description: "Halaman setor sampah akan segera tersedia",
      })
    },
    { 
      icon: Minus, 
      label: 'Tarik Saldo', 
      color: 'text-red-600', 
      bg: isDarkMode ? 'bg-gradient-to-br from-red-600/20 to-red-700/30' : 'bg-gradient-to-br from-red-100 to-red-200',
      action: () => setShowWithdrawModal(true)
    },
    { 
      icon: ArrowUpRight, 
      label: 'Transfer', 
      color: 'text-blue-600', 
      bg: isDarkMode ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/30' : 'bg-gradient-to-br from-blue-100 to-blue-200',
      action: () => toast({
        title: "Fitur Transfer",
        description: "Halaman transfer akan segera tersedia",
      })
    },
    { 
      icon: Gift, 
      label: 'Reward', 
      color: 'text-purple-600', 
      bg: isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-purple-700/30' : 'bg-gradient-to-br from-purple-100 to-purple-200',
      action: () => toast({
        title: "Fitur Reward",
        description: "Halaman reward akan segera tersedia",
      })
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'deposit',
      title: 'Setor Sampah Plastik',
      amount: '+Rp 15,000',
      points: '+25 poin',
      time: '2 jam lalu',
      icon: ArrowDownLeft,
      color: 'text-emerald-600'
    },
    {
      id: 2,
      type: 'withdraw',
      title: 'Penarikan Saldo',
      amount: '-Rp 50,000',
      time: '1 hari lalu',
      icon: ArrowUpRight,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'reward',
      title: 'Reward Mingguan',
      amount: '+Rp 10,000',
      points: '+15 poin',
      time: '3 hari lalu',
      icon: Gift,
      color: 'text-purple-600'
    }
  ];

  const achievements = [
    { title: 'Eco Warrior', description: 'Setor sampah 50x', icon: Leaf, progress: 80 },
    { title: 'Loyal Member', description: 'Aktif 30 hari berturut', icon: Award, progress: 95 },
    { title: 'Community Helper', description: 'Ajak 10 teman', icon: Users, progress: 60 }
  ];

  const handleNavigateToBank = (amount: string) => {
    setWithdrawAmount(amount);
    setCurrentPage('withdraw-bank');
  };

  const handleWithdrawComplete = (amount: number) => {
    // Potong saldo saat penarikan berhasil
    setCurrentBalance(prevBalance => prevBalance - amount);
    setCurrentPage('home');
    toast({
      title: "Penarikan Berhasil",
      description: `Saldo Rp ${amount.toLocaleString()} berhasil ditarik`,
    });
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  if (showNotifications) {
    return <NotificationPage onBack={() => setShowNotifications(false)} isDarkMode={isDarkMode} />;
  }

  if (currentPage === 'withdraw-bank') {
    return (
      <WithdrawBankPage 
        onBack={handleBack} 
        amount={withdrawAmount}
        isDarkMode={isDarkMode}
        onWithdrawComplete={handleWithdrawComplete}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header with Aurora Blue Colors */}
      <div className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6 pt-12 rounded-b-3xl shadow-2xl relative overflow-hidden`}>
        {/* Aurora Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-lg"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <h1 className="text-2xl font-bold">Selamat Datang!</h1>
              </div>
              <p className="opacity-90 text-blue-100">Kelola sampah, raih keuntungan bersama</p>
            </div>
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 relative shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold">3</span>
              </div>
            </button>
          </div>

          {/* Enhanced Balance Card */}
          <Card className="bg-white/15 backdrop-blur-md border-white/20 text-white shadow-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-blue-200" />
                  <span className="text-sm text-blue-100">Saldo Tersedia</span>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {showBalance ? `Rp ${currentBalance.toLocaleString()}` : 'Rp ••••••'}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-blue-100">Poin: 125</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-blue-100">Level: Gold</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.bg} p-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20`}
              >
                <IconComponent className={`w-7 h-7 ${action.color} mx-auto mb-3`} />
                <span className={`text-xs font-semibold block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced Recent Activities */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Aktivitas Terbaru
            </h2>
          </div>
          <Button variant="ghost" size="sm" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-semibold`}>
            Lihat Semua
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm border-white/50'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700/80' : 'bg-gray-100/80'} backdrop-blur-sm`}>
                        <IconComponent className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {activity.title}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${activity.color}`}>
                        {activity.amount}
                      </div>
                      {activity.points && (
                        <div className="text-xs text-blue-600 font-medium">
                          {activity.points}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enhanced Achievements */}
      <div className="px-6 mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Pencapaian
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm border-white/50'} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700/80' : 'bg-gray-100/80'} backdrop-blur-sm`}>
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        {achievement.description}
                      </p>
                      <div className={`h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {achievement.progress}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onNavigateToBank={handleNavigateToBank}
        isDarkMode={isDarkMode}
        currentBalance={currentBalance}
      />
    </div>
  );
};

export default HomePage;
