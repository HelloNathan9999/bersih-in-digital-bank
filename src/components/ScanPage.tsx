
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, AlertCircle, X, RotateCcw } from 'lucide-react';
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
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    try {
      // Request camera permission and start video stream
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera if available
        } 
      });
      
      setStream(mediaStream);
      setCameraActive(true);
      setIsScanning(true);
      setScanResult(null);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      toast({
        title: "Kamera Diaktifkan",
        description: "Arahkan kamera ke QR code bank sampah",
      });

      // Simulate QR detection after some time
      setTimeout(() => {
        const mockResult = {
          qrCode: 'BS2025060400123',
          bankSampah: 'Bank Sampah Hijau',
          operator: 'Ahmad Sutrisno',
          timestamp: new Date().toISOString(),
          ready: true,
          sampahType: 'Plastik',
          weight: 0,
          points: 0,
          amount: 0
        };
        
        setScanResult(mockResult);
        setIsScanning(false);
        stopCamera();
        
        toast({
          title: "QR Code Berhasil Dipindai",
          description: `Terhubung dengan ${mockResult.bankSampah}`,
        });
      }, 5000); // Simulate successful scan after 5 seconds

    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Error Kamera",
        description: "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const stopScan = () => {
    setIsScanning(false);
    stopCamera();
    setScanResult(null);
    
    toast({
      title: "Scan Dibatalkan",
      description: "Kamera ditutup",
    });
  };

  const confirmTransaction = () => {
    if (scanResult) {
      toast({
        title: "Koneksi Berhasil!",
        description: `Silakan serahkan sampah ke operator ${scanResult.operator}`,
      });
      setScanResult(null);
    }
  };

  // Cleanup camera when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-emerald-700' : 'bg-emerald-600'
      } text-white shadow-sm`}>
        <div className="px-6">
          <h1 className="text-2xl font-bold">
            Scan QR Code
          </h1>
          <p className="text-sm opacity-90">
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
                // Real Camera View
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-64 object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    {/* Scanner overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-4 border-green-500 rounded-lg relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>
                      </div>
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
                // Scan result
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
                        <RotateCcw className="w-4 h-4 mr-2" />
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
