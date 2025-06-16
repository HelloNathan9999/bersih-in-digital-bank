
import React, { useState } from 'react';
import { ArrowLeft, Droplets, CreditCard, Building, Smartphone, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PinDialog from '../PinDialog';
import TransactionReceiptPage from './TransactionReceiptPage';

interface PDAMPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const PDAMPage: React.FC<PDAMPageProps> = ({ onBack, isDarkMode = false }) => {
  const [customerId, setCustomerId] = useState('');
  const [billInfo, setBillInfo] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const paymentMethods = [
    { id: 'balance', icon: Wallet, label: 'Saldo Tersedia', description: 'Bayar dengan saldo aplikasi' },
    { id: 'bank', icon: Building, label: 'Transfer Bank', description: 'Transfer via bank lokal' },
    { id: 'va', icon: CreditCard, label: 'Virtual Account', description: 'Virtual Account bank' },
    { id: 'ewallet', icon: Smartphone, label: 'E-Wallet', description: 'GoPay, OVO, DANA, dll' }
  ];

  const checkBill = () => {
    // Simulate bill check
    setBillInfo({
      name: "John Doe",
      period: "Mei 2025",
      usage: "15 m³",
      amount: 145000,
      dueDate: "2025-06-15"
    });
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

  if (showReceipt) {
    const transaction = {
      type: 'Pembayaran PDAM',
      amount: `-Rp ${billInfo.amount.toLocaleString()}`,
      transactionId: `PDAM${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `Tagihan PDAM ${billInfo.period} - ${billInfo.name}`
    };

    return (
      <TransactionReceiptPage
        onBack={onBack}
        isDarkMode={isDarkMode}
        transaction={transaction}
      />
    );
  }

  if (showPayment && billInfo) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white p-4`}>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Pembayaran PDAM</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Detail Tagihan
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nama Pelanggan</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Periode</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pemakaian</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.usage}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jatuh Tempo</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.dueDate}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Total Tagihan</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rp {billInfo.amount.toLocaleString()}
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
                          ? 'border-blue-500 bg-blue-50'
                          : isDarkMode 
                            ? 'border-gray-600 hover:border-gray-500' 
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-blue-600" />
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
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
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
          description={`Masukkan PIN untuk membayar tagihan PDAM Rp ${billInfo.amount.toLocaleString()}`}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Bayar PDAM</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <Card className={`${isDarkMode ? 'bg-blue-800/20 border-blue-600' : 'bg-blue-50 border-blue-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Pembayaran Air PDAM</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bayar tagihan air bulanan dengan mudah</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer ID Input */}
        <div className="space-y-2">
          <Label htmlFor="customer-id">ID Pelanggan PDAM</Label>
          <div className="flex space-x-2">
            <Input
              id="customer-id"
              placeholder="Masukkan ID pelanggan"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className={`flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}`}
            />
            <Button 
              onClick={checkBill} 
              disabled={!customerId}
              className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Cek Tagihan
            </Button>
          </div>
        </div>

        {/* Bill Information */}
        {billInfo && (
          <Card className={`${isDarkMode ? 'bg-green-800/20 border-green-600' : 'bg-green-50 border-green-200'}`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Informasi Tagihan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nama Pelanggan:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Periode:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pemakaian:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.usage}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jatuh Tempo:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{billInfo.dueDate}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Total Tagihan:</span>
                    <span className="font-bold text-lg text-blue-600">
                      Rp {billInfo.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Button */}
        {billInfo && (
          <Button 
            onClick={() => setShowPayment(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Bayar Sekarang
          </Button>
        )}

        {/* Recent Payments */}
        <div className="space-y-2">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Pembayaran Terakhir</h3>
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>PDAM April 2025</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ID: ****1234</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2025-05-15 09:30</p>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-semibold">Berhasil</span>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Rp 135.000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDAMPage;
