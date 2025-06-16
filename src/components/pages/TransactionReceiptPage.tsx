
import React from 'react';
import { ArrowLeft, CheckCircle, Download, Share } from 'lucide-react';
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
    toast({
      title: "Mengunduh Bukti",
      description: "Bukti transaksi berhasil diunduh",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bukti Transaksi',
        text: `${transaction.type} - ${transaction.amount}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${transaction.type} - ${transaction.amount} - ${transaction.transactionId}`);
      toast({
        title: "Disalin",
        description: "Detail transaksi berhasil disalin",
      });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Bukti Transaksi</h1>
        </div>
      </div>

      {/* Receipt Content */}
      <div className="p-4">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Transaksi Berhasil
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {transaction.date}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jenis Transaksi</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.type}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jumlah</span>
                <span className={`font-bold text-lg ${
                  transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }`}>
                  {transaction.amount}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID Transaksi</span>
                <span className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.transactionId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  ✓ Berhasil
                </span>
              </div>

              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Deskripsi</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {transaction.description}
                </span>
              </div>

              {transaction.bankName && (
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bank</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {transaction.bankName}
                  </span>
                </div>
              )}

              {transaction.accountNumber && (
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No. Rekening</span>
                  <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {transaction.accountNumber}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Unduh
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionReceiptPage;
