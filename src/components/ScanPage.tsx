
import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, AlertCircle, RefreshCw, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [recentScans, setRecentScans] = useState([
    {
      id: 1,
      date: '2025-06-04 14:30',
      type: 'Plastik',
      weight: 2.5,
      points: 25,
      amount: 5000,
      location: 'Bank Sampah Hijau'
    },
    {
      id: 2,
      date: '2025-06-03 10:15',
      type: 'Kardus',
      weight: 1.8,
      points: 18,
      amount: 3600,
      location: 'Bank Sampah Mandiri'
    },
    {
      id: 3,
      date: '2025-06-02 16:45',
      type: 'Logam',
      weight: 0.5,
      points: 15,
      amount: 7500,
      location: 'Bank Sampah Bersih'
    }
  ]);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate camera scanning
    setTimeout(() => {
      // Simulate successful scan
      const mockResult = {
        qrCode: 'BS2025060400123',
        bankSampah: 'Bank Sampah Hijau',
        operator: 'Ahmad Sutrisno',
        timestamp: new Date().toISOString(),
        ready: true
      };
      
      setScanResult(mockResult);
      setIsScanning(false);
      
      toast({
        title: "QR Code Berhasil Dipindai",
        description: `Terhubung dengan ${mockResult.bankSampah}`,
      });
    }, 2000);
  };

  const confirmTransaction = () => {
    // Simulate processing transaction
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      type: 'Plastik',
      weight: 3.2,
      points: 32,
      amount: 6400,
      location: scanResult.bankSampah
    };

    setRecentScans(prev => [newTransaction, ...prev.slice(0, 4)]);
    
    toast({
      title: "Transaksi Berhasil!",
      description: `Anda mendapat ${newTransaction.points} poin dan Rp ${newTransaction.amount.toLocaleString()}`,
    });

    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10 pt-12 pb-4">
        <div className="px-6">
          <h1 className="text-2xl font-bold text-gray-800">Scan QR Code</h1>
          <p className="text-gray-600 text-sm">Pindai QR code di bank sampah mitra</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6" style={{ marginTop: '120px' }}>
        {/* Scanner Area */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              {!isScanning && !scanResult && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
                    <Camera className="w-24 h-24 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Siap untuk Scan QR Code
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Arahkan kamera ke QR code yang tersedia di bank sampah mitra
                    </p>
                    <Button
                      onClick={startScan}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Mulai Scan
                    </Button>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-blue-500 rounded-lg mx-auto mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse"></div>
                        <RefreshCw className="w-16 h-16 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Sedang Memindai...
                    </h3>
                    <p className="text-gray-600">
                      Arahkan kamera ke QR code
                    </p>
                  </div>
                </div>
              )}

              {scanResult && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      QR Code Berhasil Dipindai!
                    </h3>
                    
                    <div className="bg-white rounded-xl p-4 mb-4">
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bank Sampah:</span>
                          <span className="font-semibold">{scanResult.bankSampah}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Operator:</span>
                          <span className="font-semibold">{scanResult.operator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kode QR:</span>
                          <span className="font-mono text-sm">{scanResult.qrCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="text-green-600 font-semibold">Siap Terima Sampah</span>
                        </div>
                      </div>
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
                        Konfirmasi Setor
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Cara Menggunakan:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>1. Kunjungi bank sampah mitra terdekat</li>
                  <li>2. Pilah sampah sesuai jenisnya</li>
                  <li>3. Scan QR code yang tersedia</li>
                  <li>4. Serahkan sampah ke operator</li>
                  <li>5. Saldo dan poin otomatis masuk ke akun</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">Riwayat Scan Terakhir</h2>
          </div>
          
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <Card key={scan.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {scan.type}
                        </span>
                        <span className="text-xs text-gray-500">{scan.date}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{scan.location}</h3>
                      <p className="text-sm text-gray-600">{scan.weight} kg</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-bold">
                        +{scan.points} poin
                      </div>
                      <div className="text-blue-600 font-bold">
                        +Rp {scan.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
