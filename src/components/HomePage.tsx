
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
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface HomePageProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [headerExpanded, setHeaderExpanded] = useState(false);
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

  const banners = [
    {
      title: "Promo Spesial Hari Lingkungan",
      subtitle: "Dapatkan 2x poin untuk setor sampah plastik",
      color: "from-green-500 to-blue-500",
      image: "🌱"
    },
    {
      title: "Event Komunitas",
      subtitle: "Bersih-bersih pantai bersama BERSIH.IN",
      color: "from-blue-500 to-purple-500",
      image: "🏖️"
    },
    {
      title: "Tips Daur Ulang",
      subtitle: "10 cara kreatif mengolah sampah plastik",
      color: "from-orange-500 to-red-500",
      image: "♻️"
    }
  ];

  const newsItems = [
    {
      title: "5 Cara Mudah Mengurangi Sampah Plastik di Rumah",
      category: "Tips",
      time: "2 jam lalu",
      image: "🏠"
    },
    {
      title: "Komunitas BERSIH.IN Berhasil Kumpulkan 10 Ton Sampah",
      category: "Event",
      time: "1 hari lalu",
      image: "🎉"
    },
    {
      title: "Video: Proses Daur Ulang Botol Plastik Menjadi Pakaian",
      category: "Edukasi",
      time: "2 hari lalu",
      image: "📹",
      isVideo: true
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with rounded corners and blur effect */}
      <div 
        className={`fixed top-0 left-0 right-0 z-20 mx-4 mt-4 transition-all duration-300 ${
          headerExpanded ? 'rounded-b-3xl pb-8' : 'rounded-3xl pb-6'
        } bg-gradient-to-r from-green-500/90 to-blue-500/90 backdrop-blur-lg border border-white/20 shadow-xl`}
        style={{ paddingTop: '3rem' }}
      >
        {/* Normal Header Content */}
        <div className="px-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-white">
              <p className="text-sm opacity-90">Selamat Datang</p>
              <h1 className="text-lg font-bold">{userData.name}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onThemeToggle}
                className="p-2 bg-white/10 rounded-full backdrop-blur-sm"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
              </button>
              <button 
                onClick={handleNotificationClick}
                className="p-2 bg-white/10 rounded-full backdrop-blur-sm relative"
              >
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
          </div>

          {/* Pull to expand indicator */}
          <div className="text-center">
            <button
              onClick={() => setHeaderExpanded(!headerExpanded)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              {headerExpanded ? (
                <ArrowUp className="w-5 h-5" />
              ) : (
                <ArrowDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Header Content */}
        {headerExpanded && (
          <div className="px-6 mt-4 pb-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  Rp {userData.saldo.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Saldo</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  {userData.poin.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Poin</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  {userData.sampahDisetor} kg
                </div>
                <div className="text-white/80 text-sm">Sampah Disetor</div>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              className="w-full bg-white/20 text-white hover:bg-white/30 font-semibold backdrop-blur-sm border border-white/30"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Tarik Saldo
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6" style={{ marginTop: headerExpanded ? '240px' : '140px' }}>
        {/* Quick Stats */}
        {!headerExpanded && (
          <div className="grid grid-cols-3 gap-4">
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
              <CardContent className="p-4 text-center">
                <Wallet className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {(userData.saldo / 1000).toFixed(0)}K
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Saldo</div>
              </CardContent>
            </Card>
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {(userData.poin / 1000).toFixed(1)}K
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Poin</div>
              </CardContent>
            </Card>
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
              <CardContent className="p-4 text-center">
                <Recycle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userData.sampahDisetor}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>kg Disetor</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Banner Promo */}
        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Promo & Event</h2>
          <div className="space-y-3">
            {banners.map((banner, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`bg-gradient-to-r ${banner.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
                      <p className="text-sm opacity-90">{banner.subtitle}</p>
                    </div>
                    <div className="text-4xl ml-4">{banner.image}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* News & Education Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Berita & Edukasi Terbaru</h2>
            <button className="text-green-600 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-3">
            {newsItems.map((item, index) => (
              <Card key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.time}</span>
                        {item.isVideo && (
                          <Play className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <h3 className={`font-semibold text-sm leading-5 mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
