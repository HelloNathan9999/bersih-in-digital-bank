
import React, { useState } from 'react';
import { ArrowLeft, Phone, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PinDialog from '@/components/PinDialog';
import TransactionReceiptPage from '@/components/pages/TransactionReceiptPage';

interface PulsaDataPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const PulsaDataPage: React.FC<PulsaDataPageProps> = ({ onBack, isDarkMode = false }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const pulsaPackages = [
    { id: 'pulsa-25', type: 'Pulsa', amount: 25000, bonus: '', label: 'Pulsa Rp 25.000' },
    { id: 'pulsa-50', type: 'Pulsa', amount: 50000, bonus: '', label: 'Pulsa Rp 50.000' },
    { id: 'pulsa-100', type: 'Pulsa', amount: 100000, bonus: '', label: 'Pulsa Rp 100.000' },
    { id: 'data-1gb', type: 'Data', amount: 15000, bonus: '1GB 30 hari', label: 'Paket Data 1GB' },
    { id: 'data-3gb', type: 'Data', amount: 35000, bonus: '3GB 30 hari', label: 'Paket Data 3GB' },
    { id: 'data-5gb', type: 'Data', amount: 55000, bonus: '5GB 30 hari', label: 'Paket Data 5GB' },
    { id: 'data-10gb', type: 'Data', amount: 85000, bonus: '10GB 30 hari', label: 'Paket Data 10GB' },
    { id: 'unlimited', type: 'Unlimited', amount: 120000, bonus: 'Unlimited 30 hari', label: 'Paket Unlimited' }
  ];

  const paymentMethods = [
    { id: 'balance', label: 'Saldo Tersedia', description: 'Bayar dengan saldo aplikasi' },
    { id: 'bank', label: 'Transfer Bank', description: 'Transfer via bank lokal' },
    { id: 'va', label: 'Virtual Account', description: 'Virtual Account bank' }
  ];

  const handleBuy = () => {
    if (!phoneNumber || !selectedProduct) {
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

  if (showReceipt) {
    const selectedPkg = pulsaPackages.find(pkg => pkg.id === selectedProduct);
    const transaction = {
      type: `Pembelian ${selectedPkg?.type}`,
      amount: `-Rp ${selectedPkg?.amount.toLocaleString()}`,
      transactionId: `PLS${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `${selectedPkg?.label} ke ${phoneNumber}`
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
    const selectedPkg = pulsaPackages.find(pkg => pkg.id === selectedProduct);
    
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white p-4`}>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Pembayaran</h1>
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
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nomor HP</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Produk</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedPkg?.label}</span>
                </div>
                {selectedPkg?.bonus && (
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bonus</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedPkg.bonus}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rp {selectedPkg?.amount.toLocaleString()}
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
                {paymentMethods.map((method) => (
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {method.label}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {method.description}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === method.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
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
          description={`Masukkan PIN untuk membeli ${selectedPkg?.label}`}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Pulsa & Paket Data</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card className={`${isDarkMode ? 'bg-blue-800/20 border-blue-600' : 'bg-blue-50 border-blue-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Phone className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Pulsa & Paket Data
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Isi pulsa dan beli paket data dengan mudah
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Handphone</Label>
          <Input
            id="phone"
            placeholder="Masukkan nomor handphone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label>Pilih Paket</Label>
          <div className="grid grid-cols-1 gap-3">
            {pulsaPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`cursor-pointer transition-all ${
                  selectedProduct === pkg.id
                    ? 'ring-2 ring-blue-500 border-blue-500'
                    : isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                      : 'bg-white hover:shadow-md'
                }`}
                onClick={() => setSelectedProduct(pkg.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {pkg.label}
                      </h4>
                      {pkg.bonus && (
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {pkg.bonus}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-blue-600">
                        Rp {pkg.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleBuy}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!phoneNumber || !selectedProduct}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default PulsaDataPage;
