
import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Bell, 
  Sun, 
  Moon, 
  Wallet,
  TrendingUp,
  Recycle,
  Award,
  ChevronRight,
  Play,
  Leaf,
  Target,
  Gift,
  Users,
  Star,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  const handleWithdraw = () => {
    console.log('Opening withdrawal modal...');
  };

  const handleNotificationClick = () => {
    console.log('Opening notifications...');
  };

  const quickActions = [
    { icon: Recycle, label: 'Setor Sampah', color: 'bg-green-500', action: () => console.log('Setor sampah') },
    { icon: MapPin, label: 'Lokasi Terdekat', color: 'bg-blue-500', action: () => console.log('Lokasi') },
    { icon: Gift, label: 'Tukar Poin', color: 'bg-purple-500', action: () => console.log('Tukar poin') },
    { icon: Users, label: 'Komunitas', color: 'bg-orange-500', action: () => console.log('Komunitas') }
  ];

  const achievements = [
    { title: 'Eco Beginner', desc: 'Setor sampah pertama', completed: true },
    { title: 'Konsisten', desc: 'Setor 7 hari berturut', completed: true },
    { title: 'Eco Master', desc: 'Setor 100kg sampah', completed: false },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
      {/* Floating Header Card */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4">
        <Card className={`backdrop-blur-xl border-0 shadow-2xl ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Selamat Datang Kembali 👋</p>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.name}</h1>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userData.level}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onThemeToggle}
                  className={`p-3 rounded-full transition-all ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-purple-600" />}
                </button>
                <button 
                  onClick={handleNotificationClick}
                  className={`p-3 rounded-full relative transition-all ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
                <Wallet className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <div className="text-lg font-bold">Rp {(userData.saldo / 1000).toFixed(0)}K</div>
                <div className="text-xs opacity-80">Saldo</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
                <Award className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <div className="text-lg font-bold">{(userData.poin / 1000).toFixed(1)}K</div>
                <div className="text-xs opacity-80">Poin</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
                <Recycle className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <div className="text-lg font-bold">{userData.sampahDisetor}kg</div>
                <div className="text-xs opacity-80">Disetor</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6" style={{ marginTop: '200px' }}>
        
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-6 rounded-3xl text-white shadow-lg hover:scale-105 transition-all duration-200 ${action.color}`}
              >
                <action.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold text-sm">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress & Achievement */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              🏆 Pencapaian Minggu Ini
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {achievement.completed ? (
                      <Award className="w-4 h-4 text-white" />
                    ) : (
                      <Target className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {achievement.title}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {achievement.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg overflow-hidden`}>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Dampak Lingkungan Anda</h3>
                <p className="text-sm opacity-90">Kontribusi Anda untuk bumi 🌍</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>2.1 ton</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>CO₂ Dikurangi</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>156</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pohon Diselamatkan</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Aktivitas Terbaru
              </h3>
              <button className="text-green-600 text-sm font-medium">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Setor Sampah Plastik
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    2.5kg • +125 poin • 2 jam lalu
                  </div>
                </div>
                <div className="text-green-600 font-bold">
                  +Rp 12.500
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Tukar Poin - Voucher
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    500 poin • 1 hari lalu
                  </div>
                </div>
                <div className="text-blue-600 font-bold">
                  -500 poin
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default HomePage;
