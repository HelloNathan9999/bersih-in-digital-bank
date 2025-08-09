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
  Coins,
  User
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

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error' | 'promo' | 'reminder';
  isRead: boolean;
  details: {
    transactionId?: string;
    amount: string;
    date: string;
    status: string;
  };
}


const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [totalSampah, setTotalSampah] = useState(0);
  const [totalPoin, setTotalPoin] = useState(0);
  const [userName, setuserName] = useState('');
  useEffect(() => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      setuserName(userData.nama_lengkap || '');
    } catch {
      setuserName('');
    }
  }
}, []);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    nik: '',
    phone: '',
    email: '',
    address: '',
    level: 'Eco Starter',
    totalPoints: 0,
    totalEarnings: 0,
    totalWaste: 0,
    joinDate: ''
  });
  

useEffect(() => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      setuserName(userData.nama_lengkap || '');
      // Kalau mau, kamu juga bisa set data lain di userData state, contoh:
      setUserData({
        name: userData.nama_lengkap || '',
        nik: userData.nik || '',
        phone: userData.nomor_hp || '',
        email: userData.email || '',
        address: userData.alamat || '',
        level: userData.level || 'Eco Starter',
        totalPoints: userData.total_poin || 0,
        totalEarnings: userData.total_saldo || 0,
        totalWaste: userData.total_sampah || 0,
        joinDate: userData.tanggal_join || '',
      });
    } catch {
      setuserName('');
    }
  }
}, []);



  // Persist theme mode
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedBank(parsed.bank || '');
      setAccountNumber(parsed.accountNumber || '');
    }
  }, []);

  useEffect(() => {
    const balance = localStorage.getItem("userBalance");
    if (balance) setCurrentBalance(Number(balance));
  }, []);

  useEffect(() => {
    // Balance
    const stored = localStorage.getItem("userBalance");
    const parsed = stored ? Number(stored) : 0;
    setCurrentBalance(isNaN(parsed) ? 0 : parsed);

    // User Data
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // Notifications
    const storedNotif = localStorage.getItem("userNotifications");
    if (storedNotif) {
      setNotifications(JSON.parse(storedNotif));
    }
  }, []);

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

  // Reset header to collapsed when returning to home
  useEffect(() => {
    if (currentPage === 'home') {
      setIsHeaderExpanded(false);
    }
  }, [currentPage]);

  const handleNavigateToBank = (amount: string) => {
    setWithdrawAmount(amount);
    setCurrentPage('withdraw-bank');
  };

  const handleWithdrawComplete = (amount: number) => {
    const newBalance = currentBalance - amount;

    const transaction: Transaction = {
      type: 'Penarikan Saldo',
      amount: `Rp ${amount.toLocaleString()}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success',
      description: 'Penarikan saldo berhasil',
      bankName: selectedBank,
      accountNumber: `****${accountNumber.slice(-4)}`
    };

    setCurrentBalance(newBalance);
    localStorage.setItem("userBalance", JSON.stringify(newBalance));

    setCurrentTransaction(transaction);
    setCurrentPage('transaction-receipt');

    const storedTxs = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    const updatedTxs = [transaction, ...storedTxs];
    localStorage.setItem("userTransactions", JSON.stringify(updatedTxs));

    const notif = {
      id: Date.now().toString(),
      title: 'Penarikan Berhasil',
      message: `Penarikan saldo Rp ${amount.toLocaleString()} telah berhasil diproses.`,
      time: 'Baru saja',
      type: 'success',
      isRead: false,
      details: {
        transactionId: transaction.transactionId,
        amount: `-Rp ${amount.toLocaleString()}`,
        date: transaction.date,
        status: 'Berhasil'
      }
    };
    const storedNotif = JSON.parse(localStorage.getItem("userNotifications") || "[]");
    localStorage.setItem("userNotifications", JSON.stringify([notif, ...storedNotif]));

    toast({
      title: "✅ Penarikan Berhasil",
      description: `Saldo Rp ${amount.toLocaleString()} berhasil ditarik`,
      duration: 2000, // Changed from 3000 to 2000ms (2 seconds)
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

  // Expanded news timeline with 20 items
  const newsTimeline = [
    {
      id: 1,
      title: "Gubernur Kang Dedi Mulyadi Launching Program Bank Sampah Digital BERSIH.IN",
      summary: "Program revolusioner bank sampah digital diluncurkan untuk masyarakat Jawa Barat",
      time: "2 jam lalu",
      category: "Berita Utama",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      isBreaking: true
    },
    {
      id: 2,
      title: "Walikota Sukabumi H. Ayep Zaki Dukung Penuh Program Kebersihan Digital",
      summary: "Dukungan penuh dari pemerintah daerah untuk implementasi teknologi ramah lingkungan",
      time: "4 jam lalu",
      category: "Pemerintahan",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Reward Poin Naik 50% untuk Setoran Sampah Plastik",
      summary: "Peningkatan insentif untuk mendorong partisipasi masyarakat dalam daur ulang",
      time: "6 jam lalu",
      category: "Update",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Event Bersih-Bersih Kota Sukabumi Weekend Ini",
      summary: "Bergabunglah dalam aksi nyata membersihkan lingkungan bersama ribuan relawan",
      time: "8 jam lalu",
      category: "Event",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Fitur AI Pendeteksi Jenis Sampah Kini Tersedia",
      summary: "Teknologi artificial intelligence membantu identifikasi sampah secara otomatis",
      time: "12 jam lalu",
      category: "Teknologi",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Kemitraan dengan 100+ Toko untuk Program Voucher",
      summary: "Ekspansi jaringan merchant untuk memudahkan penukaran poin dengan voucher",
      time: "1 hari lalu",
      category: "Partnership",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      title: "Workshop Edukasi Lingkungan di 50 Sekolah",
      summary: "Program edukasi kesadaran lingkungan untuk generasi muda dimulai bulan ini",
      time: "1 hari lalu",
      category: "Edukasi",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      title: "Komunitas BERSIH.IN Capai 10,000 Anggota Aktif",
      summary: "Milestone penting dalam membangun komunitas peduli lingkungan yang solid",
      time: "2 hari lalu",
      category: "Komunitas",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop"
    },
    {
      id: 9,
      title: "Bank Sampah Digital Raih Penghargaan Inovasi Terbaik",
      summary: "Pengakuan atas kontribusi teknologi dalam pengelolaan sampah berkelanjutan",
      time: "2 hari lalu",
      category: "Prestasi",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
    },
    {
      id: 10,
      title: "Peluncuran Program Mini Games Edukatif",
      summary: "Belajar sambil bermain dengan games ramah lingkungan yang mendidik",
      time: "3 hari lalu",
      category: "Games",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=200&fit=crop"
    },
    {
      id: 11,
      title: "Sistem Poin Loyalty Terintegrasi dengan E-Wallet",
      summary: "Kemudahan konversi poin ke saldo digital untuk transaksi sehari-hari",
      time: "3 hari lalu",
      category: "Fintech",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
    },
    {
      id: 12,
      title: "Kolaborasi dengan Dinas Lingkungan Hidup Jawa Barat",
      summary: "Sinergi pemerintah dan teknologi untuk lingkungan yang lebih bersih",
      time: "4 hari lalu",
      category: "Kolaborasi",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop"
    },
    {
      id: 13,
      title: "Update Fitur Tracking Jejak Karbon Personal",
      summary: "Monitor dampak lingkungan aktivitas harian Anda secara real-time",
      time: "4 hari lalu",
      category: "Fitur Baru",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop"
    },
    {
      id: 14,
      title: "Webinar Nasional: 'Masa Depan Pengelolaan Sampah Digital'",
      summary: "Diskusi dengan pakar lingkungan tentang revolusi teknologi hijau",
      time: "5 hari lalu",
      category: "Webinar",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=200&fit=crop"
    },
    {
      id: 15,
      title: "Implementasi QR Code untuk Tracking Sampah Real-time",
      summary: "Teknologi QR memungkinkan pelacakan sampah dari sumber hingga pengolahan",
      time: "5 hari lalu",
      category: "Teknologi",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=200&fit=crop"
    },
    {
      id: 16,
      title: "Program Beasiswa Lingkungan untuk Mahasiswa Berprestasi",
      summary: "Investasi pendidikan untuk menciptakan generasi peduli lingkungan",
      time: "6 hari lalu",
      category: "Beasiswa",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=200&fit=crop"
    },
    {
      id: 17,
      title: "Peluncuran Marketplace Produk Daur Ulang",
      summary: "Platform jual-beli produk ramah lingkungan dari hasil daur ulang",
      time: "6 hari lalu",
      category: "Marketplace",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=200&fit=crop"
    },
    {
      id: 18,
      title: "Kampanye #SetoranSampahChallenge Viral di Media Sosial",
      summary: "Gerakan viral yang menginspirasi jutaan orang untuk berpartisipasi",
      time: "1 minggu lalu",
      category: "Viral",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=200&fit=crop"
    },
    {
      id: 19,
      title: "Integrasi dengan Sistem Pembayaran BPJS dan Tagihan Listrik",
      summary: "Satu aplikasi untuk semua kebutuhan pembayaran dan lingkungan",
      time: "1 minggu lalu",
      category: "Integrasi",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=200&fit=crop"
    },
    {
      id: 20,
      title: "Roadmap 2025: Ekspansi ke Seluruh Indonesia",
      summary: "Visi besar menjangkau seluruh nusantara dengan teknologi ramah lingkungan",
      time: "1 minggu lalu",
      category: "Roadmap",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=200&fit=crop"
    }
  ];

  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Floating Tray Header */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className={`rounded-3xl shadow-2xl backdrop-blur-lg border relative overflow-hidden transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 border-purple-500/20' 
            : 'bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-indigo-700/95 border-white/20'
        } ${isHeaderExpanded ? 'pb-6' : 'pb-4'}`}>
          {/* Aurora Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-lg"></div>
          
          <div className="relative z-10 px-6 pt-4 text-white">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <div>
                  <h1 className="text-xl font-bold">Selamat Datang</h1>
                  <p className="text-sm text-blue-100">{userName || "Guest"}</p>
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
                  {unreadNotificationsCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{unreadNotificationsCount}</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Expandable Content */}
            {isHeaderExpanded && (
              <div className="animate-fade-in px-4 py-4 bg-white/5 backdrop-blur-md rounded-xl mt-2 space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xxs text-blue-100">Saldo</p>
                    <p className="text-2xl font-bold">
                      {showBalance ? `Rp ${currentBalance.toLocaleString()}` : 'Rp ••••••••'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white/80 hover:text-white transition"
                  >
                    {showBalance ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-8">
                    <div className="text-left">
                      <div className="text-xl font-bold text-green-200">{totalSampah} kg</div>
                      <div className="text-xxs text-blue-100">Sampah</div>
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-bold text-yellow-200">{totalPoin}</div>
                      <div className="text-xxs text-blue-100">Poin</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full shadow-lg transition"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Repositioned Toggle Button - Moved to bottom center with better positioning */}
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white hover:text-blue-200 transition z-60"
            >
              {isHeaderExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with proper spacing */}
      <div className={`px-6 py-6 ${isHeaderExpanded ? 'mt-[280px]' : 'mt-[120px]'}`}>
        {/* News Timeline */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Timeline Berita Terbaru
            </h2>
          </div>
          
          <div className="space-y-4">
            {newsTimeline.map((news) => (
              <Card key={news.id} className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/50'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${news.isBreaking ? 'ring-2 ring-red-500' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-28 h-28 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          {news.isBreaking && (
                            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2 animate-pulse">
                              BREAKING
                            </span>
                          )}
                          <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {news.title}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                            {news.summary}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : ''}`}>
                          {news.category}
                        </span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {news.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
