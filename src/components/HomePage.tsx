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
  CreditCard
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
      bg: isDarkMode ? 'bg-gray-700' : 'bg-emerald-100',
      action: () => toast({
        title: "Fitur Setor Sampah",
        description: "Halaman setor sampah akan segera tersedia",
      })
    },
    { 
      icon: Minus, 
      label: 'Tarik Saldo', 
      color: 'text-red-600', 
      bg: isDarkMode ? 'bg-gray-700' : 'bg-red-100',
      action: () => setShowWithdrawModal(true)
    },
    { 
      icon: ArrowUpRight, 
      label: 'Transfer', 
      color: 'text-blue-600', 
      bg: isDarkMode ? 'bg-gray-700' : 'bg-blue-100',
      action: () => toast({
        title: "Fitur Transfer",
        description: "Halaman transfer akan segera tersedia",
      })
    },
    { 
      icon: Gift, 
      label: 'Reward', 
      color: 'text-purple-600', 
      bg: isDarkMode ? 'bg-gray-700' : 'bg-purple-100',
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
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-6 pt-12 rounded-b-3xl`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Selamat Datang!</h1>
            <p className="opacity-90">Kelola sampah, raih keuntungan</p>
          </div>
          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">3</span>
            </div>
          </button>
        </div>

        {/* Balance Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/20'} backdrop-blur-sm border-0 text-white`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-80">Saldo Tersedia</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-3xl font-bold mb-3">
              {showBalance ? `Rp ${currentBalance.toLocaleString()}` : 'Rp ••••••'}
            </div>
            <div className="flex justify-between text-sm opacity-80">
              <span>Poin: 125</span>
              <span>Level: Gold</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.bg} p-4 rounded-2xl transition-all hover:scale-105 shadow-sm`}
              >
                <IconComponent className={`w-6 h-6 ${action.color} mx-auto mb-2`} />
                <span className={`text-xs font-medium block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Aktivitas Terbaru
          </h2>
          <Button variant="ghost" size="sm" className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
            Lihat Semua
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
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
                      <div className={`font-bold ${activity.color}`}>
                        {activity.amount}
                      </div>
                      {activity.points && (
                        <div className="text-xs text-blue-600">
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

      {/* Achievements */}
      <div className="px-6 mb-6">
        <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Pencapaian
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <IconComponent className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                      <div className={`mt-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {achievement.progress}%
                    </span>
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
