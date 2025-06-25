
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, DollarSign, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface LoanHistoryPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
  loanAmount: number;
}

interface LoanData {
  amount: number;
  startDate: string;
  dueDate: string;
  remainingAmount: number;
  monthlyPayment: number;
  status: 'active' | 'completed' | 'overdue';
}

const LoanHistoryPage: React.FC<LoanHistoryPageProps> = ({ onBack, isDarkMode = false, loanAmount }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    // Initialize loan data
    const startDate = new Date();
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 3); // 3 months loan period

    const loan: LoanData = {
      amount: loanAmount,
      startDate: startDate.toLocaleDateString('id-ID'),
      dueDate: dueDate.toLocaleDateString('id-ID'),
      remainingAmount: loanAmount,
      monthlyPayment: Math.ceil(loanAmount / 3),
      status: 'active'
    };

    setLoanData(loan);
    localStorage.setItem('currentLoan', JSON.stringify(loan));
  }, [loanAmount]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (loanData) {
        const now = new Date();
        const due = new Date(loanData.dueDate.split('/').reverse().join('-'));
        const timeDiff = due.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          
          setTimeRemaining(`${days} hari ${hours} jam ${minutes} menit ${seconds} detik`);
        } else {
          setTimeRemaining('Waktu pembayaran telah berakhir');
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [loanData]);

  const handleInstallmentPayment = () => {
    if (!loanData) return;

    const installmentAmount = loanData.monthlyPayment;
    const newRemainingAmount = loanData.remainingAmount - installmentAmount;
    
    // Update current balance
    const currentBalance = Number(localStorage.getItem('userBalance') || '0');
    const newBalance = currentBalance - installmentAmount;
    localStorage.setItem('userBalance', JSON.stringify(newBalance));

    // Update loan data
    const updatedLoan = {
      ...loanData,
      remainingAmount: newRemainingAmount,
      status: newRemainingAmount <= 0 ? 'completed' as const : 'active' as const
    };

    setLoanData(updatedLoan);
    localStorage.setItem('currentLoan', JSON.stringify(updatedLoan));

    // Add transaction record
    const transaction = {
      type: 'Pembayaran Cicilan Pinjaman',
      amount: `-Rp ${installmentAmount.toLocaleString()}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success',
      description: `Pembayaran cicilan pinjaman Rp ${installmentAmount.toLocaleString()}`
    };

    const storedTxs = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    localStorage.setItem("userTransactions", JSON.stringify([transaction, ...storedTxs]));

    toast({
      title: "✅ Pembayaran Berhasil",
      description: `Cicilan Rp ${installmentAmount.toLocaleString()} berhasil dibayar`,
    });

    if (newRemainingAmount <= 0) {
      toast({
        title: "🎉 Pinjaman Lunas",
        description: "Selamat! Pinjaman Anda telah lunas",
      });
    }
  };

  const handleFullPayment = () => {
    if (!loanData) return;

    const fullAmount = loanData.remainingAmount;
    
    // Update current balance
    const currentBalance = Number(localStorage.getItem('userBalance') || '0');
    const newBalance = currentBalance - fullAmount;
    localStorage.setItem('userBalance', JSON.stringify(newBalance));

    // Update loan data
    const updatedLoan = {
      ...loanData,
      remainingAmount: 0,
      status: 'completed' as const
    };

    setLoanData(updatedLoan);
    localStorage.setItem('currentLoan', JSON.stringify(updatedLoan));

    // Add transaction record
    const transaction = {
      type: 'Pelunasan Pinjaman',
      amount: `-Rp ${fullAmount.toLocaleString()}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success',
      description: `Pelunasan pinjaman Rp ${fullAmount.toLocaleString()}`
    };

    const storedTxs = JSON.parse(localStorage.getItem("userTransactions") || "[]");
    localStorage.setItem("userTransactions", JSON.stringify([transaction, ...storedTxs]));

    toast({
      title: "🎉 Pinjaman Lunas",
      description: `Pinjaman Rp ${fullAmount.toLocaleString()} berhasil dilunasi`,
    });
  };

  if (!loanData) {
    return <div>Loading...</div>;
  }

  const progressPercentage = ((loanData.amount - loanData.remainingAmount) / loanData.amount) * 100;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4 rounded-b-2xl backdrop-blur-lg bg-opacity-90`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Riwayat Pinjaman</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Loan Status Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} overflow-hidden`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Status Pinjaman
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                loanData.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : loanData.status === 'overdue'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {loanData.status === 'completed' ? 'Lunas' : 
                 loanData.status === 'overdue' ? 'Terlambat' : 'Aktif'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Jumlah Pinjaman
                  </p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Rp {loanData.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sisa Pembayaran
                  </p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Rp {loanData.remainingAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Progress Pembayaran
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Countdown Timer */}
        {loanData.status === 'active' && (
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-orange-500" />
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Waktu Tersisa
                </h3>
              </div>
              <div className={`text-2xl font-mono font-bold text-center p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-orange-400' : 'bg-orange-50 text-orange-600'
              }`}>
                {timeRemaining}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loan Details */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Detail Pinjaman
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tanggal Mulai
                </span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {loanData.startDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Jatuh Tempo
                </span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {loanData.dueDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cicilan per Bulan
                </span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Rp {loanData.monthlyPayment.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        {loanData.status === 'active' && loanData.remainingAmount > 0 && (
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Opsi Pembayaran
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={handleInstallmentPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Bayar Cicilan (Rp {loanData.monthlyPayment.toLocaleString()})
                </Button>
                <Button
                  onClick={handleFullPayment}
                  variant="outline"
                  className={`w-full ${
                    isDarkMode 
                      ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' 
                      : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Bayar Lunas (Rp {loanData.remainingAmount.toLocaleString()})
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed Status */}
        {loanData.status === 'completed' && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">
                Pinjaman Telah Lunas
              </h3>
              <p className="text-green-600">
                Selamat! Anda telah berhasil melunasi pinjaman sebesar Rp {loanData.amount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoanHistoryPage;
