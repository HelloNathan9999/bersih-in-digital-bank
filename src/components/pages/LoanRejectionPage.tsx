
import React from 'react';
import { ArrowLeft, XCircle, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LoanRejectionPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const LoanRejectionPage: React.FC<LoanRejectionPageProps> = ({ onBack, isDarkMode = false }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-red-600 to-pink-700' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white p-4 rounded-b-2xl backdrop-blur-lg bg-opacity-90`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Status Pinjaman</h1>
          </div>
        </div>
      </div>

      <div className="p-6 flex items-center justify-center min-h-[80vh]">
        <Card className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-8 text-center">
            {/* Rejection Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>

            {/* Main Message */}
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Maaf, Permintaan kamu Belum di Setujui
            </h2>

            <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Jangan kecewa, Masih bisa di coba
            </p>

            {/* Retry Information */}
            <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  3 Bulan kemudian
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Anda dapat mengajukan pinjaman kembali setelah 3 bulan
              </p>
            </div>

            {/* Additional Information */}
            <Card className={`mb-6 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Info className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div className="text-left">
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      Tips untuk meningkatkan peluang persetujuan:
                    </h4>
                    <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-yellow-700'}`}>
                      <li>• Tingkatkan aktivitas setor sampah</li>
                      <li>• Kumpulkan lebih banyak poin</li>
                      <li>• Lengkapi profil dan data diri</li>
                      <li>• Aktif dalam komunitas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onBack}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Kembali ke Beranda
              </Button>
              
              <Button
                variant="outline"
                className={`w-full ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  // Navigate to profile or tips page
                  onBack();
                }}
              >
                Lihat Tips Lengkap
              </Button>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Butuh bantuan? Hubungi customer service kami
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanRejectionPage;
