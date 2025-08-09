import React, { useState, useEffect } from 'react';
import { 
  Bell, 
<<<<<<< HEAD
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
=======
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
  ArrowDownLeft,
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  Zap,
  Eye
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationPage from './NotificationPage';
import WithdrawModal from './WithdrawModal';
import WithdrawBankPage from './pages/WithdrawBankPage';
<<<<<<< HEAD
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
=======
import ChatBot from './ChatBot';

interface HomePageProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false, onThemeToggle }) => {
  const [userData, setUserData] = useState({
    name: 'Pengguna BERSIH.IN',
    saldo: 0,
    poin: 0,
    level: 'Eco Warrior',
    sampahDisetor: 0
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showWithdrawBank, setShowWithdrawBank] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Cashback 15%",
      subtitle: "Token Listrik",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      color: isDarkMode ? "from-emerald-500 to-teal-600" : "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Tukar Poin",
      subtitle: "Dapat Voucher",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      color: isDarkMode ? "from-teal-500 to-cyan-600" : "from-indigo-500 to-purple-600"
    }
  ];

  const featuredProducts = [
    { id: 1, name: "Token Listrik 100K", price: "Rp 100.000", discount: "5%", icon: Zap },
    { id: 2, name: "Voucher Belanja", price: "500 Poin", discount: "New", icon: ShoppingBag }
  ];

const feedPosts = [
  {
    id: 1,
    author: "BERSIH.IN ✔️",
    content: "Tips hari ini: Pisahkan sampah organik dan anorganik untuk hasil maksimal! 🌱",
    image: "https://img.antarafoto.com/cache/1200x799/2018/11/06/pengelolaan-sampah-plastik-i2vz-dom.webp",
    likes: 124,
    comments: 18,
    shares: 7,
    time: "1 jam lalu"
  },
  {
    id: 2,
    author: "BERSIH.IN ✔️",
    content: "\"📢 BREAKING NEWS!!!!!\n\n Ini adalah terobosan anak muda yang patut diapresiasi. Saya mendukung penuh kegiatan ini!\" ucap sang Gubernur Jawa Barat, Dedi Mulyadi",
    image: "https://cdn.grid.id/crop/0x0:0x0/360x240/photo/2025/05/26/gubernur-jawa-barat-dedi-mulyadi-20250526121645.jpg",
    likes: 124,
    comments: 18,
    shares: 7,
    time: "2 jam lalu"
  },
  {
    id: 3,
    author: "BERSIH.IN ✔️",
    content: "Selamat kepada user yang berhasil mencapai 100kg sampah disetor bulan ini! 🏆",
    likes: 89,
    comments: 12,
    shares: 4,
    time: "4 jam lalu"
  },
  {
    id: 4,
    author: "BERSIH.IN ✔️",
    content: "📸 Yuk ikutan lomba #TantanganBersih! Upload foto kamu sedang memilah sampah & menangkan hadiah menarik!",
    image: "https://images.unsplash.com/photo-1581574201548-f278b392d63b",
    likes: 76,
    comments: 25,
    shares: 10,
    time: "6 jam lalu"
  },
  {
    id: 5,
    author: "BERSIH.IN ✔️",
    content: "Tahukah kamu? 1 botol plastik butuh 450 tahun untuk terurai di alam. Yuk, kurangi plastik mulai hari ini. ♻️",
    likes: 98,
    comments: 14,
    shares: 5,
    time: "8 jam lalu"
  },
  {
    id: 6,
    author: "BERSIH.IN ✔️",
    content: "Testimoni user: \"Aplikasi BERSIH.IN bikin nabung jadi makin semangat, karena sambil jaga bumi juga!\" 🌏",
    image: "https://img.freepik.com/free-photo/happy-woman-recycling_53876-13911.jpg",
    likes: 142,
    comments: 31,
    shares: 13,
    time: "10 jam lalu"
  },
  {
    id: 7,
    author: "BERSIH.IN ✔️",
    content: "🎉 Kami telah mengumpulkan 10 TON sampah bersama komunitas! Terima kasih Sobat Bersih!",
    likes: 211,
    comments: 45,
    shares: 22,
    time: "12 jam lalu"
  },
  {
    id: 8,
    author: "BERSIH.IN ✔️",
    content: "Infografik: Jenis sampah yang paling banyak dikumpulkan bulan ini adalah... Plastik kemasan! 🧃📦",
    image: "https://cdn.pixabay.com/photo/2016/04/01/09/11/garbage-1293721_960_720.png",
    likes: 64,
    comments: 9,
    shares: 6,
    time: "14 jam lalu"
  },
  {
    id: 9,
    author: "BERSIH.IN ✔️",
    content: "🌿 DIY: Cara mudah membuat kompos dari sampah dapur. Cocok buat pemula! #ZeroWaste",
    video: "https://www.youtube.com/watch?v=hak2rihouNg",
    likes: 157,
    comments: 22,
    shares: 9,
    time: "16 jam lalu"
  },
  {
    id: 10,
    author: "BERSIH.IN ✔️",
    content: "📦 Paket edukasi daur ulang telah tiba! Terima kasih kepada 100 relawan pertama.",
    image: "https://images.unsplash.com/photo-1558888578-250a099fb712",
    likes: 84,
    comments: 17,
    shares: 5,
    time: "18 jam lalu"
  },
  {
    id: 11,
    author: "BERSIH.IN ✔️",
    content: "📹 Liputan kegiatan bersih-bersih pantai minggu lalu. Lihat keseruannya yuk! 🏖️",
    video: "https://www.w3schools.com/html/movie.mp4",
    likes: 201,
    comments: 38,
    shares: 19,
    time: "20 jam lalu"
  },
  {
    id: 12,
    author: "BERSIH.IN ✔️",
    content: "🥤 Sampah botol plastik bisa kamu tukar jadi saldo e-wallet? Di BERSIH.IN, BISA!",
    image: "https://images.unsplash.com/photo-1591293832822-df846dfc7a84",
    likes: 97,
    comments: 12,
    shares: 8,
    time: "22 jam lalu"
  },
  {
    id: 13,
    author: "BERSIH.IN ✔️",
    content: "🎥 Ayo nonton: Edukasi seru buat anak-anak soal pentingnya memilah sampah sejak dini! 👧🧒",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    likes: 110,
    comments: 27,
    shares: 11,
    time: "1 hari lalu"
  }
];


useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    const parsed = JSON.parse(storedUserData);
    setUserData(prev => ({
      ...prev,
      name: parsed.name || 'Pengguna BERSIH.IN'
    }));
  }

  // Auto slide banner
  const interval = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, 4000);

  // 🔁 IntersectionObserver untuk autoplay video saat di-scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  const videos = document.querySelectorAll(".video-feed");
  videos.forEach(video => observer.observe(video));

  return () => {
    clearInterval(interval);
    videos.forEach(video => observer.unobserve(video));
  };
}, []);


  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const handleNavigateToBank = (amount: string) => {
    setWithdrawAmount(amount);
    setShowWithdrawModal(false);
    setShowWithdrawBank(true);
  };

  const handleBackFromBank = () => {
    setShowWithdrawBank(false);
    setWithdrawAmount('');
  };

  if (showNotifications) {
    return <NotificationPage isDarkMode={isDarkMode} onBack={() => setShowNotifications(false)} />;
  }

  if (showWithdrawBank) {
    return (
      <WithdrawBankPage 
        onBack={handleBackFromBank}
        amount={withdrawAmount}
        isDarkMode={isDarkMode}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
      />
    );
  }

<<<<<<< HEAD
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
=======
  const themeColors = {
    primary: isDarkMode ? 'from-emerald-400 to-teal-500' : 'from-sky-400 to-blue-500',
    secondary: isDarkMode ? 'from-emerald-500 to-green-600' : 'from-blue-500 to-indigo-600',
    accent: isDarkMode ? 'from-teal-500 to-cyan-600' : 'from-indigo-500 to-purple-600',
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                </button>
              </div>
            </div>

<<<<<<< HEAD
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
=======
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
        
        {/* Banner Slider */}
        <div className="relative h-32 rounded-2xl overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`w-full h-full flex-shrink-0 bg-gradient-to-r ${banner.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-4 flex items-center justify-between h-full">
                  <div className="text-white">
                    <h3 className="text-lg font-bold">{banner.title}</h3>
                    <p className="text-sm opacity-90">{banner.subtitle}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Banner Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentBanner === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="space-y-3">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Produk Terlaris
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {featuredProducts.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card key={product.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.discount === 'New' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {product.discount}
                      </span>
                    </div>
                    <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {product.name}
                    </h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.price}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-3">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Aktivitas Terbaru
          </h3>
{feedPosts.map((post) => (
  <Card key={post.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
    <CardContent className="p-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-emerald-600' : 'bg-blue-600'} flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">
            {post.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {post.author}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {post.time}
          </p>
        </div>
      </div>

      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {post.content}
      </p>

{post.image && (
  <div className="mb-3 rounded-lg overflow-hidden">
    <img
      src={post.image}
      alt="Post"
      className="w-full object-contain max-h-[500px] mx-auto rounded-md"
    />
  </div>
)}


      {post.video && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <video
            src={post.video}
            muted
            loop
            playsInline
            className="w-full h-48 object-cover rounded-md video-feed"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-red-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Share2 className="w-4 h-4" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
))}

        </div>
      </div>

      {/* Chat Bot */}
      <ChatBot isDarkMode={isDarkMode} />

      <WithdrawModal 
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)} 
        onNavigateToBank={handleNavigateToBank}
        isDarkMode={isDarkMode}
        currentBalance={userData.saldo}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
      />
    </div>
  );
};

export default HomePage;
