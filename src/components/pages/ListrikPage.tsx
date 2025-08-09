
import React, { useState } from 'react';
<<<<<<< HEAD
import { ArrowLeft, Zap, CreditCard, Building, Smartphone, Wallet } from 'lucide-react';
=======
import { ArrowLeft, Zap, CreditCard } from 'lucide-react';
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
import PinDialog from '../PinDialog';
import TransactionReceiptPage from './TransactionReceiptPage';

interface ListrikPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const ListrikPage: React.FC<ListrikPageProps> = ({ onBack, isDarkMode = false }) => {
  const [meterNumber, setMeterNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
=======

interface ListrikPageProps {
  onBack: () => void;
}

const ListrikPage: React.FC<ListrikPageProps> = ({ onBack }) => {
  const [meterNumber, setMeterNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

  const amounts = [
    { value: '20000', label: 'Rp 20.000' },
    { value: '50000', label: 'Rp 50.000' },
    { value: '100000', label: 'Rp 100.000' },
    { value: '200000', label: 'Rp 200.000' },
    { value: '500000', label: 'Rp 500.000' },
    { value: 'custom', label: 'Nominal Lain' }
  ];

<<<<<<< HEAD
  const paymentMethods = [
    { id: 'balance', icon: Wallet, label: 'Saldo Tersedia', description: 'Bayar dengan saldo aplikasi' },
    { id: 'bank', icon: Building, label: 'Transfer Bank', description: 'Transfer via bank lokal' },
    { id: 'va', icon: CreditCard, label: 'Virtual Account', description: 'Virtual Account bank' },
    { id: 'ewallet', icon: Smartphone, label: 'E-Wallet', description: 'GoPay, OVO, DANA, dll' }
  ];

  const handleBuy = () => {
    if (!meterNumber || !selectedAmount) {
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      return;
    }
    setShowPinDialog(true);
  };

  const handlePinSuccess = () => {
    setShowReceipt(true);
  };

  const getAmount = () => {
    return selectedAmount === 'custom' ? customAmount : selectedAmount;
  };

  if (showReceipt) {
    const amount = getAmount();
    const transaction = {
      type: 'Pembelian Token Listrik',
      amount: `-Rp ${parseInt(amount).toLocaleString()}`,
      transactionId: `PLN${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `Token PLN ${amount} untuk meter ${meterNumber}`
    };

    return (
      <TransactionReceiptPage
        onBack={onBack}
        isDarkMode={isDarkMode}
        transaction={transaction}
      />
    );
  }

  if (showPayment) {
    const amount = getAmount();
    
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white p-4`}>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Pembayaran Token Listrik</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Detail Pembelian
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nomor Meter</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{meterNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nominal Token</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Rp {parseInt(amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Total</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    Rp {parseInt(amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Metode Pembayaran
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : isDarkMode 
                            ? 'border-gray-600 hover:border-gray-500' 
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-yellow-600" />
                        <div>
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {method.label}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handlePayment}
            className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 text-lg"
            disabled={!paymentMethod}
          >
            Bayar Sekarang
          </Button>
        </div>

        <PinDialog
          open={showPinDialog}
          onClose={() => setShowPinDialog(false)}
          onSuccess={handlePinSuccess}
          title="Verifikasi Pembayaran"
          description={`Masukkan PIN untuk membeli token listrik Rp ${parseInt(amount).toLocaleString()}`}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white p-4`}>
=======
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4">
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Token Listrik PLN</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
<<<<<<< HEAD
        <Card className={`${isDarkMode ? 'bg-yellow-800/20 border-yellow-600' : 'bg-yellow-50 border-yellow-200'}`}>
=======
        <Card className="bg-blue-50 border-blue-200">
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
          <CardContent className="p-4">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
<<<<<<< HEAD
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Token PLN Prabayar</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Beli token listrik dengan mudah dan cepat</p>
=======
                <h3 className="font-semibold">Token PLN Prabayar</h3>
                <p className="text-sm text-gray-600">Beli token listrik dengan mudah dan cepat</p>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meter Number Input */}
        <div className="space-y-2">
          <Label htmlFor="meter">Nomor Meter/ID Pelanggan</Label>
          <Input
            id="meter"
            placeholder="Masukkan nomor meter"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
<<<<<<< HEAD
            className={isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}
=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
          />
        </div>

        {/* Amount Selection */}
        <div className="space-y-2">
          <Label>Pilih Nominal</Label>
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amount) => (
              <Button
                key={amount.value}
                variant={selectedAmount === amount.value ? "default" : "outline"}
                onClick={() => setSelectedAmount(amount.value)}
<<<<<<< HEAD
                className={`h-12 ${
                  selectedAmount === amount.value 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : isDarkMode 
                      ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                      : ''
                }`}
=======
                className="h-12"
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
              >
                {amount.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        {selectedAmount === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Nominal Custom</Label>
            <Input
              id="custom-amount"
              placeholder="Masukkan nominal"
              type="number"
<<<<<<< HEAD
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className={isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}
=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
            />
          </div>
        )}

        {/* Buy Button */}
        <Button 
<<<<<<< HEAD
          onClick={handleBuy}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={!meterNumber || !selectedAmount || (selectedAmount === 'custom' && !customAmount)}
=======
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={!meterNumber || !selectedAmount}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Beli Token Sekarang
        </Button>

        {/* Recent Transactions */}
        <div className="space-y-2">
<<<<<<< HEAD
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Transaksi Terakhir</h3>
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Token PLN Rp 100.000</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Meter: ****5678</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2025-06-03 14:30</p>
=======
          <h3 className="font-semibold">Transaksi Terakhir</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Token PLN Rp 100.000</p>
                  <p className="text-sm text-gray-600">Meter: ****5678</p>
                  <p className="text-xs text-gray-500">2025-06-03 14:30</p>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                </div>
                <span className="text-green-600 font-semibold">Berhasil</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListrikPage;
