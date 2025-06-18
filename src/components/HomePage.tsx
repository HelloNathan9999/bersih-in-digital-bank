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
  ArrowDownLeft,
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  Zap,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationPage from './NotificationPage';
import WithdrawModal from './WithdrawModal';
import WithdrawBankPage from './pages/WithdrawBankPage';
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
      />
    );
  }

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
      />
    </div>
  );
};

export default HomePage;
