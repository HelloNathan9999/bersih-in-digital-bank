
import React, { useState } from 'react';
import { Camera, CheckCircle, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ScanPageProps {
  isDarkMode?: boolean;
}

const ScanPage: React.FC<ScanPageProps> = ({ isDarkMode = false }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startScan = () => {
    setCameraActive(true);
    setIsScanning(true);
    setScanResult(null);

    toast({
      title: "Kamera Diaktifkan",
      description: "Arahkan kamera ke QR code bank sampah",
    });

    // Simulasi scanning yang realistis - tidak langsung berhasil
    setTimeout(() => {
      // Simulasi gagal scan pertama
      toast({
        title: "Mencari QR Code...",
        description: "Pastikan QR code terlihat jelas",
      });
    }, 2000);

    // Hanya berhasil jika QR code benar-benar "terdeteksi"
    // Untuk demo, kita akan simulasi bahwa scan berhasil setelah 8 detik
    setTimeout(() => {
      // User harus benar-benar scan QR code yang valid
      // Untuk sementara, kita simulasi sukses hanya kadang-kadang
      const scanSuccess = Math.random() > 0.3; // 70% chance sukses

      if (scanSuccess) {
        const mockResult = {
          qrCode: 'BS2025060400123',
          bankSampah: 'Bank Sampah Hijau',
          operator: 'Ahmad Sutrisno',
          timestamp: new Date().toISOString(),
          ready: true,
          sampahType: 'Plastik',
          weight: 0, // Weight akan diinput manual oleh operator
          points: 0,
          amount: 0
        };
        
        setScanResult(mockResult);
        setIsScanning(false);
        setCameraActive(false);
        
        toast({
          title: "QR Code Berhasil Dipindai",
          description: `Terhubung dengan ${mockResult.bankSampah}`,
        });
      } else {
        setIsScanning(false);
        setCameraActive(false);
        toast({
          title: "Scan Gagal",
          description: "QR code tidak terdeteksi. Coba lagi.",
        });
      }
    }, 8000);
  };

  const stopScan = () => {
    setIsScanning(false);
    setCameraActive(false);
    setScanResult(null);
    
    toast({
      title: "Scan Dibatalkan",
      description: "Kamera ditutup",
    });
  };

  const confirmTransaction = () => {
    if (scanResult) {
      // Hanya konfirmasi koneksi, bukan transaksi
      toast({
        title: "Koneksi Berhasil!",
        description: `Silakan serahkan sampah ke operator ${scanResult.operator}`,
      });
      setScanResult(null);
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg shadow-sm`}>
        <div className="px-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Scan QR Code
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Pindai QR code di bank sampah mitra
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6" style={{ marginTop: '120px' }}>
        {/* Camera/Scanner Area */}
        <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="text-center">
              {cameraActive && isScanning ? (
                // Camera Simulation
                <div className="space-y-4">
                  <div className={`rounded-2xl p-8 relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                      : 'bg-gradient-to-br from-gray-800 to-black'
                  }`}>
                    {/* Camera viewfinder */}
                    <div className="relative w-64 h-64 mx-auto border-4 border-green-500 rounded-lg">
                      <div className="absolute inset-4 border-2 border-white/30 rounded"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
                      </div>
                      {/* Scanning line animation */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 animate-pulse"></div>
                    </div>
                    
                    <button
                      onClick={stopScan}
                      className="absolute top-4 right-4 p-2 bg-red-500 rounded-full"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Sedang Memindai QR Code...
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Arahkan kamera ke QR code di bank sampah
                  </p>
                </div>
              ) : !scanResult ? (
                // Initial state
                <div className="space-y-4">
                  <div className={`rounded-2xl p-8 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-900/20 to-blue-900/20' 
                      : 'bg-gradient-to-br from-green-100 to-blue-100'
                  }`}>
                    <Camera className={`w-24 h-24 mx-auto mb-4 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Siap untuk Scan QR Code
                    </h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Arahkan kamera ke QR code yang tersedia di bank sampah mitra
                    </p>
                    <Button
                      onClick={startScan}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Buka Kamera
                    </Button>
                  </div>
                </div>
              ) : (
                // Scan result - hanya menunjukkan koneksi berhasil
                <div className="space-y-4">
                  <div className={`rounded-2xl p-6 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20' 
                      : 'bg-gradient-to-br from-green-100 to-emerald-100'
                  }`}>
                    <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Koneksi Berhasil!
                    </h3>
                    
                    <div className={`rounded-xl p-4 mb-4 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Bank Sampah:
                          </span>
                          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {scanResult.bankSampah}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Operator:
                          </span>
                          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {scanResult.operator}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Status:
                          </span>
                          <span className="font-semibold text-green-600">
                            Siap Menerima Sampah
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>Petunjuk:</strong> Serahkan sampah Anda ke operator. 
                        Operator akan menimbang dan mencatat transaksi secara manual.
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setScanResult(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Scan Ulang
                      </Button>
                      <Button
                        onClick={confirmTransaction}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                      >
                        Mengerti
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className={`border-blue-200 ${
          isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-5 h-5 mt-1 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <div>
                <h4 className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  Cara Menggunakan:
                </h4>
                <ul className={`text-sm space-y-1 ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-700'
                }`}>
                  <li>1. Kunjungi bank sampah mitra terdekat</li>
                  <li>2. Pilah sampah sesuai jenisnya</li>
                  <li>3. Scan QR code yang tersedia di bank sampah</li>
                  <li>4. Serahkan sampah ke operator untuk ditimbang</li>
                  <li>5. Operator akan input data dan saldo masuk otomatis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScanPage;
