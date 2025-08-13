
import React, { useState } from 'react';
import { ArrowLeft, Building, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import PinDialog from '@/components/PinDialog';
import TransactionReceiptPage from '@/components/pages/TransactionReceiptPage';

interface WithdrawBankPageProps {
  onBack: () => void;
  amount?: string;
  isDarkMode?: boolean;
  onWithdrawComplete?: (amount: number) => void;
}

const WithdrawBankPage: React.FC<WithdrawBankPageProps> = ({ 
  onBack, 
  amount = "0", 
  isDarkMode = false,
  onWithdrawComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Check if this is just for setting up bank details (amount is 0 or not provided)
  const isSetupMode = !amount || amount === "0";

  const withdrawMethods = [
    { id: 'bank', icon: Building, label: 'Transfer Bank', color: 'text-blue-600' },
    { id: 'emoney', icon: CreditCard, label: 'E-Money', color: 'text-green-600' },
    { id: 'ewallet', icon: Smartphone, label: 'E-Wallet', color: 'text-purple-600' }
  ];

  const bankList = [
    'Bank BCA', 'Bank Mandiri', 'Bank BRI', 'Bank BNI', 'Bank BTN', 
    'Bank Danamon', 'Bank CIMB Niaga', 'Bank Permata', 'Bank Maybank'
  ];

  const ewalletList = [
    'GoPay', 'OVO', 'DANA', 'LinkAja', 'ShopeePay'
  ];

  const handleSaveOrWithdraw = () => {
    if (!selectedMethod || !accountNumber || !accountName) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang diperlukan",
      });
      return;
    }

    if (isSetupMode) {
      // Save bank details to localStorage
      localStorage.setItem('userBankName', bankName || selectedMethod);
      localStorage.setItem('userAccountNumber', accountNumber);
      localStorage.setItem('userAccountName', accountName);
      localStorage.setItem('userPaymentMethod', selectedMethod);
      
      toast({
        title: "Data Berhasil Disimpan",
        description: "Data bank dan rekening telah disimpan",
      });
      
      // Go back to profile
      onBack();
    } else {
      // Proceed with withdrawal
      setShowPinDialog(true);
    }
  };

  const handlePinSuccess = () => {
    // Show receipt page
    setShowReceipt(true);
    
    // Call onWithdrawComplete to update balance in parent component
    if (onWithdrawComplete) {
      onWithdrawComplete(parseInt(amount));
    }
    
    toast({
      title: "Penarikan Berhasil",
      description: "Permintaan penarikan telah diproses",
    });
  };

  if (showReceipt) {
    const transaction = {
      type: 'Penarikan Saldo',
      amount: `-Rp ${parseInt(amount).toLocaleString()}`,
      transactionId: `WD${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `Transfer ke ${bankName || selectedMethod}`,
      bankName: bankName || selectedMethod,
      accountNumber: accountNumber
    };

    return (
      <TransactionReceiptPage
        onBack={onBack}
        isDarkMode={isDarkMode}
        transaction={transaction}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">
            {isSetupMode ? 'Setup Metode Pembayaran' : 'Tarik Saldo'}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Amount Display - Only show if not in setup mode */}
        {!isSetupMode && (
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Jumlah Penarikan
              </p>
              <p className={`text-3xl font-bold text-emerald-600`}>
                Rp {parseInt(amount).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Withdrawal Methods */}
        <div className="space-y-4">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {isSetupMode ? 'Pilih Metode Pembayaran' : 'Pilih Metode Penarikan'}
          </h3>
          <div className="grid gap-3">
            {withdrawMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                  } ${
                    selectedMethod === method.id 
                      ? 'ring-2 ring-emerald-500' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4 flex items-center space-x-3">
                    <IconComponent className={`w-6 h-6 ${method.color}`} />
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {method.label}
                    </span>
                    {selectedMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bank/E-wallet Selection */}
        {selectedMethod && (
          <div className="space-y-4">
            {selectedMethod === 'bank' && (
              <div className="space-y-3">
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Pilih Bank
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Pilih Bank</option>
                  {bankList.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedMethod === 'ewallet' && (
              <div className="space-y-3">
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Pilih E-Wallet
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Pilih E-Wallet</option>
                  {ewalletList.map((wallet) => (
                    <option key={wallet} value={wallet}>{wallet}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Account Details */}
            <div className="space-y-3">
              <div>
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  {selectedMethod === 'bank' ? 'Nomor Rekening' : 'Nomor Akun'}
                </label>
                <Input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={selectedMethod === 'bank' ? 'Masukkan nomor rekening' : 'Masukkan nomor akun'}
                  className={isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}
                />
              </div>
              
              <div>
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Nama Pemilik Akun
                </label>
                <Input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Masukkan nama pemilik akun"
                  className={isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSaveOrWithdraw}
              className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 text-lg"
              disabled={!selectedMethod || !accountNumber || !accountName}
            >
              {isSetupMode ? 'Simpan Data' : 'Proses Penarikan'}
            </Button>
          </div>
        )}
      </div>

      {!isSetupMode && (
        <PinDialog
          open={showPinDialog}
          onClose={() => setShowPinDialog(false)}
          onSuccess={handlePinSuccess}
          title="Verifikasi Penarikan"
          description={`Masukkan PIN untuk menarik saldo Rp ${parseInt(amount).toLocaleString()}`}
        />
      )}
    </div>
  );
};

export default WithdrawBankPage;
