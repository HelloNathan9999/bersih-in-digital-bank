
import React from 'react';
import { ArrowLeft, CheckCircle, Download, Share, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface TransactionReceiptPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
  transaction: {
    type: string;
    amount: string;
    transactionId: string;
    date: string;
    status: 'success' | 'pending' | 'failed';
    description: string;
    bankName?: string;
    accountNumber?: string;
  };
}

const TransactionReceiptPage: React.FC<TransactionReceiptPageProps> = ({ 
  onBack, 
  isDarkMode = false,
  transaction 
}) => {
  const handleDownload = () => {
    // Create a simple receipt text
    const receiptText = `
=== BUKTI TRANSAKSI ===
${transaction.type}
${transaction.amount}
ID: ${transaction.transactionId}
Tanggal: ${transaction.date}
Status: Berhasil
Deskripsi: ${transaction.description}
${transaction.bankName ? `Bank: ${transaction.bankName}` : ''}
${transaction.accountNumber ? `Rekening: ${transaction.accountNumber}` : ''}
======================
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "✅ Berhasil Diunduh",
      description: "Bukti transaksi berhasil diunduh",
      duration: 3000,
    });
  };

  const handleShare = async () => {
    const shareText = `${transaction.type} - ${transaction.amount}\nID: ${transaction.transactionId}\nStatus: Berhasil`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bukti Transaksi',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "✅ Disalin",
          description: "Detail transaksi berhasil disalin ke clipboard",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "❌ Gagal Menyalin",
          description: "Tidak dapat menyalin ke clipboard",
          duration: 3000,
        });
      }
    }
  };

  const handleFinish = () => {
    toast({
      title: "✅ Transaksi Selesai",
      description: "Terima kasih telah menggunakan layanan kami",
      duration: 3000,
    });
    onBack();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Bukti Transaksi</h1>
        </div>
      </div>

      {/* Receipt Content */}
      <div className="p-4">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
          <CardContent className="p-8">
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="relative">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-scale-in" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 rounded-full mx-auto animate-ping"></div>
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Transaksi Berhasil
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {transaction.date}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jenis Transaksi</span>
                <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.type}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jumlah</span>
                <span className={`font-bold text-2xl ${
                  transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }`}>
                  {transaction.amount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID Transaksi</span>
                <span className={`font-mono text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.transactionId}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 font-semibold">
                    Berhasil
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Deskripsi</span>
                <span className={`font-semibold text-right text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.description}
                </span>
              </div>

              {transaction.bankName && (
                <div className="flex justify-between items-center">
                  <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bank</span>
                  <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {transaction.bankName}
                  </span>
                </div>
              )}

              {transaction.accountNumber && (
                <div className="flex justify-between items-center">
                  <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No. Rekening</span>
                  <span className={`font-mono text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {transaction.accountNumber}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handleDownload}
                className="py-3 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Simpan
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="py-3 text-lg"
              >
                <Share className="w-5 h-5 mr-2" />
                Bagikan
              </Button>
            </div>

            {/* Finish Button */}
            <Button
              onClick={handleFinish}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold"
            >
              <Check className="w-5 h-5 mr-2" />
              Selesai
            </Button>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <p className={`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            📞 Butuh bantuan? Hubungi customer service di 1500-123
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceiptPage;
