
import React, { useState } from 'react';
import { X, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBank: (amount: string) => void;
  isDarkMode?: boolean;
  currentBalance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateToBank,
  isDarkMode = false,
  currentBalance 
}) => {
  const [amount, setAmount] = useState('');

  const quickAmounts = [50000, 100000, 200000, 500000];

  const handleWithdraw = () => {
    if (amount && parseInt(amount) <= currentBalance) {
      onNavigateToBank(amount);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className={`w-full max-w-md rounded-t-3xl p-6 animate-slide-up ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Tarik Saldo
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
        </div>

        {/* Current Balance */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Wallet className="w-6 h-6 text-green-600" />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Saldo Tersedia</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Rp {currentBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            Jumlah Penarikan
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Masukkan jumlah"
            className={`w-full p-3 rounded-xl border text-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Rp {quickAmount.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Withdraw Button */}
        <Button 
          onClick={handleWithdraw}
          disabled={!amount || parseInt(amount) > currentBalance}
          className="w-full py-3 text-lg bg-green-600 hover:bg-green-700"
        >
          <span>Lanjutkan</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className={`text-xs text-center mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Proses penarikan membutuhkan waktu 2 - 5 Menit
        </p>
      </div>
    </div>
  );
};

export default WithdrawModal;
