
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import PinDialog from '../PinDialog';

interface WithdrawBankPageProps {
  onBack: () => void;
  amount: string;
  isDarkMode?: boolean;
}

const WithdrawBankPage: React.FC<WithdrawBankPageProps> = ({ 
  onBack, 
  amount, 
  isDarkMode = false 
}) => {
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);

  const banks = [
    { id: 'bca', name: 'BCA', code: '014' },
    { id: 'mandiri', name: 'Bank Mandiri', code: '008' },
    { id: 'bni', name: 'BNI', code: '009' },
    { id: 'bri', name: 'BRI', code: '002' },
    { id: 'cimb', name: 'CIMB Niaga', code: '022' },
    { id: 'danamon', name: 'Bank Danamon', code: '011' }
  ];

  const ewallets = [
    { id: 'gopay', name: 'GoPay', icon: '🟢' },
    { id: 'ovo', name: 'OVO', icon: '🔵' },
    { id: 'dana', name: 'DANA', icon: '🔷' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🧡' }
  ];

  const handleWithdraw = () => {
    if (!accountNumber || !accountName || (withdrawMethod === 'bank' && !bankName)) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Harap lengkapi semua data yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    setShowPinDialog(true);
  };

  const handlePinSuccess = () => {
    toast({
      title: "Penarikan Berhasil",
      description: `Penarikan sebesar Rp ${parseInt(amount).toLocaleString()} sedang diproses`,
    });
    onBack();
  };

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
            </Button>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Metode Penarikan
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount Info */}
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-green-200'}`}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Jumlah Penarikan
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Rp {parseInt(amount).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Method Selection */}
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Pilih Metode Penarikan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center space-x-2 cursor-pointer">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Transfer Bank
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ewallet" id="ewallet" />
                  <Label htmlFor="ewallet" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="w-5 h-5 text-purple-500" />
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      E-Wallet
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Bank Transfer Form */}
          {withdrawMethod === 'bank' && (
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Data Rekening Bank
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Pilih Bank
                  </Label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className={`w-full mt-1 p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Bank</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.name}>
                        {bank.name} ({bank.code})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Nomor Rekening
                  </Label>
                  <Input
                    type="number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Masukkan nomor rekening"
                    className={`mt-1 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Nama Pemilik Rekening
                  </Label>
                  <Input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Masukkan nama sesuai rekening"
                    className={`mt-1 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* E-Wallet Form */}
          {withdrawMethod === 'ewallet' && (
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Data E-Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Pilih E-Wallet
                  </Label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className={`w-full mt-1 p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Pilih E-Wallet</option>
                    {ewallets.map((wallet) => (
                      <option key={wallet.id} value={wallet.name}>
                        {wallet.icon} {wallet.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Nomor HP / Virtual Account
                  </Label>
                  <Input
                    type="tel"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Masukkan nomor HP"
                    className={`mt-1 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <Label className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Nama Pemilik
                  </Label>
                  <Input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Masukkan nama pemilik akun"
                    className={`mt-1 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <Card className={`${isDarkMode ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    Keamanan Transaksi
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    Pastikan data rekening yang Anda masukkan sudah benar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Info */}
          <Card className={`${isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                    Waktu Pemrosesan
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    Proses penarikan membutuhkan waktu 1-3 hari kerja
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            onClick={handleWithdraw}
            className="w-full py-3 text-lg bg-green-600 hover:bg-green-700"
            disabled={!accountNumber || !accountName || (withdrawMethod === 'bank' && !bankName)}
          >
            Konfirmasi Penarikan
          </Button>
        </div>
      </div>

      {/* PIN Dialog */}
      <PinDialog
        open={showPinDialog}
        onClose={() => setShowPinDialog(false)}
        onSuccess={handlePinSuccess}
        title="Verifikasi PIN"
        description="Masukkan PIN untuk mengkonfirmasi penarikan saldo"
      />
    </>
  );
};

export default WithdrawBankPage;
