
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PinjamModalPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
  onLoanSuccess?: (amount: number) => void;
  onLoanRejection?: () => void;
}

const PinjamModalPage: React.FC<PinjamModalPageProps> = ({ 
  onBack, 
  isDarkMode = false, 
  onLoanSuccess,
  onLoanRejection 
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loanAmounts = [
    { amount: 50000, label: 'Rp 50.000', duration: '7 hari' },
    { amount: 100000, label: 'Rp 100.000', duration: '14 hari' },
    { amount: 250000, label: 'Rp 250.000', duration: '30 hari' },
    { amount: 500000, label: 'Rp 500.000', duration: '60 hari' },
  ];

  const handleLoanApplication = async () => {
    if (!selectedAmount) return;
    
    setIsProcessing(true);
    
    // Simulate loan processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // 70% chance of approval for demo
      const isApproved = Math.random() > 0.3;
      
      if (isApproved && onLoanSuccess) {
        onLoanSuccess(selectedAmount);
      } else if (onLoanRejection) {
        onLoanRejection();
      }
    }, 2000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-teal-600'} text-white p-4 rounded-b-3xl backdrop-blur-lg bg-opacity-90 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Pinjam Modal</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Loan Amount Selection */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Pilih Jumlah Pinjaman
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {loanAmounts.map((loan) => (
                <button
                  key={loan.amount}
                  onClick={() => setSelectedAmount(loan.amount)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedAmount === loan.amount
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {loan.label}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {loan.duration}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Information */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Bunga Rendah
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bunga mulai dari 0.5% per hari
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Proses Cepat
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Persetujuan dalam hitungan menit
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleLoanApplication}
          disabled={!selectedAmount || isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
        >
          {isProcessing ? 'Memproses...' : 'Ajukan Pinjaman'}
        </Button>
      </div>
    </div>
  );
};

export default PinjamModalPage;
