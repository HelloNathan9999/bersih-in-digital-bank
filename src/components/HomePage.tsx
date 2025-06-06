
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  Wallet,
  TrendingUp,
  Recycle,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  Gift,
  Users,
  Star,
  ArrowDownLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationPage from './NotificationPage';
import WithdrawModal from './WithdrawModal';

interface HomePageProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [userData, setUserData] = useState({
    name: 'Pengguna BERSIH.IN',
    saldo: 125000,
    poin: 2450,
    level: 'Eco Warrior',
    sampahDisetor: 45.5
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [headerExpanded, setHeaderExpanded] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsed = JSON.parse(storedUserData);
      setUserData(prev => ({
        ...prev,
        name: parsed.name || 'Pengguna BERSIH.IN'
      }));
    }
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const quickActions = [
    { icon: Recycle, label: 'Setor Sampah', action: () => console.log('Setor sampah') },
    { icon: MapPin, label: 'Lokasi Terdekat', action: () => console.log('Lokasi') },
    { icon: Gift, label: 'Tukar Poin', action: () => console.log('Tukar poin') },
    { icon: Users, label: 'Komunitas', action: () => console.log('Komunitas') }
  ];

  if (showNotifications) {
    return <NotificationPage isDarkMode={isDarkMode} onBack={() => setShowNotifications(false)} />;
  }

  // Custom colors based on theme
  const themeColors = {
    primary: isDarkMode ? 'from-emerald-400 to-teal-500' : 'from-sky-400 to-blue-500',
    secondary: isDarkMode ? 'from-emerald-500 to-green-600' : 'from-blue-500 to-indigo-600',
    accent: isDarkMode ? 'from-teal-500 to-cyan-600' : 'from-indigo-500 to-purple-600',
    background: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
  };

  return (
    <div className={`min-h-screen ${themeColors.background}`}>
      {/* Compact Header */}
      <div className="sticky top-0 z-20 p-4">
        <Card className={`backdrop-blur-xl border-0 shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } ${headerExpanded ? 'pb-6' : ''}`}>
          <CardContent className="p-4">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Halo, {userData.name.split(' ')[0]} 👋
                </p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {userData.level}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={onThemeToggle}
                  className={`p-2 rounded-full transition-all ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isDarkMode ? 
                    <Sun className="w-4 h-4 text-yellow-500" /> : 
                    <Moon className="w-4 h-4 text-purple-600" />
                  }
                </button>
                
                <button 
                  onClick={handleNotificationClick}
                  className={`p-2 rounded-full relative transition-all ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Bell className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                
                <button
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  className={`p-2 rounded-full transition-all ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {headerExpanded ? 
                    <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} /> :
                    <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  }
                </button>
              </div>
            </div>

            {/* Expandable Balance Section */}
            {headerExpanded && (
              <div className="mt-4 space-y-3 animate-slide-up">
                <div className="grid grid-cols-3 gap-2">
                  <div className={`text-center p-3 rounded-xl text-white bg-gradient-to-br ${themeColors.primary}`}>
                    <Wallet className="w-5 h-5 mx-auto mb-1 opacity-90" />
                    <div className="text-sm font-bold">Rp {(userData.saldo / 1000).toFixed(0)}K</div>
                    <div className="text-xs opacity-80">Saldo</div>
                  </div>
                  <div className={`text-center p-3 rounded-xl text-white bg-gradient-to-br ${themeColors.secondary}`}>
                    <Award className="w-5 h-5 mx-auto mb-1 opacity-90" />
                    <div className="text-sm font-bold">{(userData.poin / 1000).toFixed(1)}K</div>
                    <div className="text-xs opacity-80">Poin</div>
                  </div>
                  <div className={`text-center p-3 rounded-xl text-white bg-gradient-to-br ${themeColors.accent}`}>
                    <Recycle className="w-5 h-5 mx-auto mb-1 opacity-90" />
                    <div className="text-sm font-bold">{userData.sampahDisetor}kg</div>
                    <div className="text-xs opacity-80">Disetor</div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleWithdraw}
                  className={`w-full bg-gradient-to-r ${themeColors.primary} hover:opacity-90 text-white font-medium py-2`}
                >
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Tarik Saldo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 space-y-4">
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 rounded-2xl shadow-sm hover:scale-105 transition-all duration-200 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <action.icon className={`w-6 h-6 mx-auto mb-2 ${
                isDarkMode ? 'text-emerald-400' : 'text-blue-600'
              }`} />
              <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {action.label}
              </div>
            </button>
          ))}
        </div>

        {/* Stats Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
          <CardContent className="p-4">
            <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              🌱 Dampak Lingkungan
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`}>
                  2.1 ton
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  CO₂ Dikurangi
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`}>
                  156
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Pohon Diselamatkan
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
          <CardContent className="p-4">
            <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Aktivitas Terbaru
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-emerald-900' : 'bg-green-100'
                }`}>
                  <Recycle className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-green-600'}`} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Setor Sampah Plastik
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    2.5kg • +125 poin
                  </div>
                </div>
                <div className={`font-bold text-sm ${isDarkMode ? 'text-emerald-400' : 'text-green-600'}`}>
                  +Rp 12.500
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WithdrawModal 
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        isDarkMode={isDarkMode}
        currentBalance={userData.saldo}
      />
    </div>
  );
};

export default HomePage;
