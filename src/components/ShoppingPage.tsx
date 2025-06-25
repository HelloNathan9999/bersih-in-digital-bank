import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Zap, 
  Droplets, 
  Heart, 
  Wifi, 
  Phone, 
  Package, 
  Calendar,
  MapPin,
  Trophy,
  Gift,
  Calculator,
  Users,
  Settings,
  GraduationCap,
  Gamepad2,
  Earth,
  HandCoins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import BelanjaPage from './pages/BelanjaPage';
import ListrikPage from './pages/ListrikPage';
import PDAMPage from './pages/PDAMPage';
import CheckinPage from './pages/CheckinPage';
import LokasiPage from './pages/LokasiPage';
import PulsaDataPage from './pages/PulsaDataPage';
import SembakoPage from './pages/SembakoPage';
import PinjamModalPage from './pages/PinjamModalPage';
import LoanHistoryPage from './pages/LoanHistoryPage';
import LoanRejectionPage from './pages/LoanRejectionPage';

interface ShoppingPageProps {
  isDarkMode?: boolean;
}

const ShoppingPage: React.FC<ShoppingPageProps> = ({ isDarkMode = false }) => {
  const [activeToggle, setActiveToggle] = useState('pelayanan');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [loanAmount, setLoanAmount] = useState(0);

  const services = [
    { id: 'belanja', icon: ShoppingCart, label: 'Belanja', color: 'text-green-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-green-100' },
    { id: 'pinjam-modal', icon: HandCoins, label: 'Pinjam Modal', color: 'text-purple-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-purple-100' },
    { id: 'listrik', icon: Zap, label: 'Listrik', color: 'text-yellow-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-yellow-100' },
    { id: 'pdam', icon: Droplets, label: 'PDAM', color: 'text-blue-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-blue-100' },
    { id: 'bpjs', icon: Heart, label: 'BPJS', color: 'text-red-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-red-100' },
    { id: 'wifi', icon: Wifi, label: 'WiFi Bulanan', color: 'text-purple-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-purple-100' },
    { id: 'pulsa', icon: Phone, label: 'Pulsa & Data', color: 'text-orange-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-orange-100' },
    { id: 'sembako', icon: Package, label: 'Sembako', color: 'text-brown-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-orange-100' },
    { id: 'checkin', icon: Calendar, label: 'Check-in Harian', color: 'text-indigo-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-indigo-100' },
    { id: 'misi', icon: Users, label: 'Misi Komunitas', color: 'text-teal-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-teal-100' },
    { id: 'lokasi', icon: MapPin, label: 'Lokasi Bank Sampah', color: 'text-gray-600', bg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100' },
    { id: 'ranking', icon: Trophy, label: 'Ranking Pengguna', color: 'text-yellow-600', bg: isDarkMode ? 'bg-gray-700' : 'bg-yellow-100' },
    { id: 'voucher', icon: Gift, label: 'Voucher & Reward', color: 'text-pink-500', bg: isDarkMode ? 'bg-gray-700' : 'bg-pink-100' },
    { id: 'kalkulator', icon: Calculator, label: 'Kalkulator Sampah', color: 'text-blue-600', bg: isDarkMode ? 'bg-gray-700' : 'bg-blue-100' },
    { id: 'referral', icon: Users, label: 'Sistem Referral', color: 'text-green-600', bg: isDarkMode ? 'bg-gray-700' : 'bg-green-100' },
    { id: 'tema', icon: Settings, label: 'Pengaturan Tema', color: 'text-gray-700', bg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100' },
    { id: 'edukasi', icon: GraduationCap, label: 'Edukasi & Komunitas', color: 'text-blue-700', bg: isDarkMode ? 'bg-gray-700' : 'bg-blue-100' },
    { id: 'games', icon: Gamepad2, label: 'Mini Games', color: 'text-purple-600', bg: isDarkMode ? 'bg-gray-700' : 'bg-purple-100' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'Deposit sampah',
      amount: '+Rp 15,000',
      points: '+25 poin',
      date: '2025-06-04 14:30',
      status: 'success',
      description: 'Setor sampah plastik 2.5 kg'
    },
    {
      id: 2,
      type: 'Penarikan saldo',
      amount: '-Rp 50,000',
      points: '',
      date: '2025-06-03 10:15',
      status: 'success',
      description: 'Transfer ke BCA ****1234'
    },
    {
      id: 3,
      type: 'Pembelian listrik',
      amount: '-Rp 100,000',
      points: '',
      date: '2025-06-02 16:45',
      status: 'success',
      description: 'Token PLN 100k'
    },
    {
      id: 4,
      type: 'Penukaran poin',
      amount: '+Rp 25,000',
      points: '-50 poin',
      date: '2025-06-01 09:20',
      status: 'success',
      description: 'Tukar poin ke saldo'
    },
    {
      id: 5,
      type: 'Pembelian produk',
      amount: '-Rp 115,000',
      points: '',
      date: '2025-05-31 16:20',
      status: 'success',
      description: 'Tas Ramah Lingkungan + Botol Minum'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    navigateToService(serviceId);
  };

  const navigateToService = (serviceId: string) => {
    switch (serviceId) {
      case 'belanja':
      case 'listrik':
      case 'pdam':
      case 'checkin':
      case 'lokasi':
      case 'pulsa':
      case 'sembako':
      case 'pinjam-modal':
        setCurrentPage(serviceId);
        break;
      default:
        toast({
          title: "Fitur Akan Segera Hadir",
          description: `${services.find(s => s.id === serviceId)?.label} sedang dalam pengembangan`,
        });
    }
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const handleLoanSuccess = (amount: number) => {
    setLoanAmount(amount);
    
    // Update user balance
    const currentBalance = Number(localStorage.getItem('userBalance') || '0');
    const newBalance = currentBalance + amount;
    localStorage.setItem('userBalance', JSON.stringify(newBalance));
    
    // Add transaction record
    const transaction = {
      type: 'Pinjaman Modal Berhasil',
      amount: `+Rp ${amount.toLocaleString()}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success',
      description: `Pinjaman modal sebesar Rp ${amount.toLocaleString()} berhasil dicairkan`
    };

    const storedTxs = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    localStorage.setItem("userTransactions", JSON.stringify([transaction, ...storedTxs]));

    setCurrentPage('loan-history');
  };

  const handleLoanRejection = () => {
    setCurrentPage('loan-rejection');
  };

  // Render different pages
  if (currentPage === 'belanja') {
    return <BelanjaPage onBack={handleBack} isDarkMode={isDarkMode} />;
  }
  if (currentPage === 'listrik') {
    return <ListrikPage onBack={handleBack} />;
  }
  if (currentPage === 'pdam') {
    return <PDAMPage onBack={handleBack} />;
  }
  if (currentPage === 'checkin') {
    return <CheckinPage onBack={handleBack} />;
  }
  if (currentPage === 'lokasi') {
    return <LokasiPage onBack={handleBack} />;
  }
  if (currentPage === 'pulsa') {
    return <PulsaDataPage onBack={handleBack} isDarkMode={isDarkMode} />;
  }
  if (currentPage === 'sembako') {
    return <SembakoPage onBack={handleBack} isDarkMode={isDarkMode} />;
  }
  if (currentPage === 'pinjam-modal') {
    return (
      <PinjamModalPage 
        onBack={handleBack} 
        isDarkMode={isDarkMode}
        onLoanSuccess={handleLoanSuccess}
        onLoanRejection={handleLoanRejection}
      />
    );
  }
  if (currentPage === 'loan-history') {
    return (
      <LoanHistoryPage 
        onBack={handleBack} 
        isDarkMode={isDarkMode}
        loanAmount={loanAmount}
      />
    );
  }
  if (currentPage === 'loan-rejection') {
    return (
      <LoanRejectionPage 
        onBack={handleBack} 
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 rounded-b-2xl backdrop-blur-lg ${
        isDarkMode ? 'bg-gradient-to-r from-emerald-600/90 to-teal-700/90 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 border-white/20'
      } text-white border`}>
        <div className="px-6">
          <h1 className="text-2xl font-bold mb-4">
            Belanja & Layanan
          </h1>
          
          {/* Toggle Switch */}
          <div className={`flex rounded-full p-1 mb-4 ${
            isDarkMode ? 'bg-emerald-800' : 'bg-emerald-500'
          }`}>
            <button
              onClick={() => setActiveToggle('pelayanan')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeToggle === 'pelayanan'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              PELAYANAN
            </button>
            <button
              onClick={() => setActiveToggle('riwayat')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeToggle === 'riwayat'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              RIWAYAT
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6" style={{ marginTop: '140px' }}>
        {activeToggle === 'pelayanan' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Cari layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-4 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''
                }`}
              />
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-3 gap-4">
              {services
                .filter(service => 
                  service.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card 
                      key={service.id} 
                      className={`shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                      }`}
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                          <IconComponent className={`w-6 h-6 ${service.color}`} />
                        </div>
                        <p className={`text-xs font-medium leading-tight ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {service.label}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            {/* Featured Promotions */}
            <div className="space-y-4">
              <h2 className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Promo Spesial
              </h2>
              <Card className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-500'
              } text-white`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Cashback 10%</h3>
                      <p className="text-sm opacity-90">Untuk pembelian token listrik</p>
                    </div>
                    <Zap className="w-12 h-12 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeToggle === 'riwayat' && (
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <Card key={transaction.id} className={`shadow-sm ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {transaction.type}
                        </h3>
                        <p className={`text-sm mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {transaction.description}
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.amount.startsWith('+') 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.amount}
                        </div>
                        {transaction.points && (
                          <div className={`text-sm ${
                            transaction.points.startsWith('+')
                              ? 'text-blue-600'
                              : 'text-orange-600'
                          }`}>
                            {transaction.points}
                          </div>
                        )}
                        <div className="text-xs text-green-600 mt-1">
                          ✓ Berhasil
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Earth className={`w-24 h-24 mx-auto mb-4 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Oppssss…. Belum ada yang bantuin aku
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Riwayat transaksi akan muncul di sini
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingPage;
