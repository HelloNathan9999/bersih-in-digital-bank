
import React, { useState, useEffect } from 'react';
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
  Star,
  Trophy,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Trash2,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationPage from './NotificationPage';
import WithdrawModal from './WithdrawModal';
import WithdrawBankPage from './pages/WithdrawBankPage';
import TransactionReceiptPage from './pages/TransactionReceiptPage';
import { toast } from '@/hooks/use-toast';

interface HomePageProps {
  isDarkMode?: boolean;
  onThemeToggle: () => void;
}

interface Transaction {
  type: string;
  amount: string;
  transactionId: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
  description: string;
  bankName?: string;
  accountNumber?: string;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [currentBalance, setCurrentBalance] = useState(1247500);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  // Persist theme mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && !isDarkMode) {
      onThemeToggle();
    } else if (savedTheme === 'light' && isDarkMode) {
      onThemeToggle();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleNavigateToBank = (amount: string) => {
    setWithdrawAmount(amount);
    setCurrentPage('withdraw-bank');
  };

  const handleWithdrawComplete = (amount: number) => {
    const transaction: Transaction = {
      type: 'Penarikan Saldo',
      amount: `Rp ${amount.toLocaleString()}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success',
      description: 'Penarikan saldo berhasil',
      bankName: 'Bank BCA',
      accountNumber: '****1234'
    };
    
    setCurrentBalance(prevBalance => prevBalance - amount);
    setCurrentTransaction(transaction);
    setCurrentPage('transaction-receipt');
    
    // Show floating toast notification
    toast({
      title: "✅ Penarikan Berhasil",
      description: `Saldo Rp ${amount.toLocaleString()} berhasil ditarik`,
      duration: 3000,
    });
  };

  const handleBack = () => {
    if (currentPage === 'transaction-receipt') {
      setCurrentPage('home');
      setCurrentTransaction(null);
    } else {
      setCurrentPage('home');
    }
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

  if (currentPage === 'transaction-receipt' && currentTransaction) {
    return (
      <TransactionReceiptPage
        onBack={handleBack}
        isDarkMode={isDarkMode}
        transaction={currentTransaction}
      />
    );
  }

  // Educational banners and news data
  const educationalBanners = [
    {
      id: 1,
      title: "Cara Memilah Sampah yang Benar",
      description: "Pelajari cara memilah sampah organik dan anorganik untuk lingkungan yang lebih bersih",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop",
      tag: "Edukasi"
    },
    {
      id: 2,
      title: "Manfaat Daur Ulang Plastik",
      description: "Ketahui dampak positif mendaur ulang plastik bagi bumi kita",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop",
      tag: "Lingkungan"
    },
    {
      id: 3,
      title: "Tips Mengurangi Sampah Harian",
      description: "Langkah sederhana untuk mengurangi produksi sampah di rumah",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop",
      tag: "Tips"
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: "Program Bank Sampah Terbaru",
      summary: "Peluncuran program bank sampah digital untuk masyarakat urban",
      time: "2 jam lalu",
      category: "Berita"
    },
    {
      id: 2,
      title: "Reward Poin Bertambah",
      summary: "Sistem reward baru memberikan poin lebih banyak untuk setiap setoran",
      time: "5 jam lalu",
      category: "Update"
    },
    {
      id: 3,
      title: "Event Kebersihan Kota",
      summary: "Bergabunglah dalam acara bersih-bersih kota weekend ini",
      time: "1 hari lalu",
      category: "Event"
    }
  ];

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Floating Tray Header */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className={`rounded-2xl shadow-2xl backdrop-blur-lg border relative overflow-hidden transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 border-purple-500/30' 
            : 'bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-indigo-700/95 border-white/20'
        } ${isHeaderExpanded ? 'pb-6' : 'pb-4'}`}>
          {/* Aurora Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-lg"></div>
          
          <div className="relative z-10 px-6 pt-4 text-white">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <div>
                  <h1 className="text-xl font-bold">Selamat Datang</h1>
                  <p className="text-sm text-blue-100">Ahmad Rizky</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onThemeToggle}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 relative"
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Expandable Content */}
            {isHeaderExpanded && (
              <div className="space-y-4 animate-fade-in">
                {/* Balance and Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-white/15 backdrop-blur-md border-white/20 text-white">
                    <CardContent className="p-4 text-center">
                      <Wallet className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                      <div className="text-lg font-bold">
                        {showBalance ? `Rp ${currentBalance.toLocaleString()}` : 'Rp ••••••'}
                      </div>
                      <p className="text-xs text-blue-100">Saldo</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/15 backdrop-blur-md border-white/20 text-white">
                    <CardContent className="p-4 text-center">
                      <Trash2 className="w-6 h-6 mx-auto mb-2 text-green-200" />
                      <div className="text-lg font-bold">45 kg</div>
                      <p className="text-xs text-blue-100">Sampah</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/15 backdrop-blur-md border-white/20 text-white">
                    <CardContent className="p-4 text-center">
                      <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-200" />
                      <div className="text-lg font-bold">125</div>
                      <p className="text-xs text-blue-100">Poin</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Withdraw Button */}
                <Button 
                  onClick={() => setShowWithdrawModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                >
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Tarik Saldo
                </Button>
              </div>
            )}

            {/* Transparent Toggle Button */}
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {isHeaderExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with proper spacing */}
      <div className="px-6 py-6" style={{ marginTop: '200px' }}>
        {/* Educational Banners */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Leaf className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Edukasi Kebersihan
            </h2>
          </div>
          
          <div className="space-y-4">
            {educationalBanners.map((banner) => (
              <Card key={banner.id} className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/50'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}>
                <CardContent className="p-0">
                  <div className="flex">
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {banner.title}
                        </h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {banner.tag}
                        </span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {banner.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section className="mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Berita Terbaru
            </h2>
          </div>
          
          <div className="space-y-4">
            {latestNews.map((news) => (
              <Card key={news.id} className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/50'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {news.title}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                    {news.summary}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {news.time}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Statistik Mingguan
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/50'}`}>
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'} flex items-center justify-center mx-auto mb-3`}>
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>12 kg</div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sampah Minggu Ini</p>
              </CardContent>
            </Card>
            
            <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/50'}`}>
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'} flex items-center justify-center mx-auto mb-3`}>
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>#15</div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ranking Komunitas</p>
              </CardContent>
            </Card>
          </div>
        </section>
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
