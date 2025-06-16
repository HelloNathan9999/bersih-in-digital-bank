
import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Flashlight, FlashlightOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ScanPageProps {
  isDarkMode?: boolean;
}

const ScanPage: React.FC<ScanPageProps> = ({ isDarkMode = false }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setIsCameraActive(true);

      // Check if flash is available (simplified check)
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      // Use type assertion to handle the torch property safely
      const supportedConstraints = navigator.mediaDevices.getSupportedConstraints() as any;
      if ((capabilities as any).torch || supportedConstraints.torch) {
        setHasFlash(true);
      }

      toast({
        title: "Kamera Aktif",
        description: "Arahkan kamera ke QR code untuk memindai",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Gagal Mengakses Kamera",
        description: "Pastikan izin kamera telah diberikan",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setFlashEnabled(false);
  };

  const toggleFlash = async () => {
    if (stream && hasFlash) {
      const track = stream.getVideoTracks()[0];
      try {
        // Use a more compatible approach for torch control
        await track.applyConstraints({
          advanced: [{ torch: !flashEnabled } as any]
        });
        setFlashEnabled(!flashEnabled);
      } catch (error) {
        console.error('Error toggling flash:', error);
        toast({
          title: "Flash Error",
          description: "Tidak dapat mengontrol flash pada perangkat ini",
        });
      }
    }
  };

  const switchCamera = async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  const captureQR = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Simulate QR code detection
        toast({
          title: "QR Code Terdeteksi",
          description: "Menganalisis QR code...",
        });
        
        // Simulate processing delay
        setTimeout(() => {
          toast({
            title: "Scan Berhasil",
            description: "QR Code berhasil dipindai!",
          });
        }, 1500);
      }
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gradient-to-r from-purple-600 to-indigo-700' : 'bg-gradient-to-r from-purple-500 to-indigo-600'
      } text-white`}>
        <div className="px-6">
          <h1 className="text-2xl font-bold mb-2">
            Scan QR Code
          </h1>
          <p className="text-sm opacity-90">
            Pindai QR code untuk transaksi cepat
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6" style={{ marginTop: '100px' }}>
        {!isCameraActive ? (
          <div className="space-y-6">
            {/* Info Card */}
            <Card className={`${isDarkMode ? 'bg-purple-800/20 border-purple-600' : 'bg-purple-50 border-purple-200'}`}>
              <CardContent className="p-6 text-center">
                <Camera className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Scan QR Code
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Aktifkan kamera untuk memindai QR code dan melakukan transaksi dengan mudah
                </p>
                <Button 
                  onClick={startCamera}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Buka Kamera
                </Button>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardContent className="p-6">
                <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cara Menggunakan:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Tekan tombol "Buka Kamera" untuk mengaktifkan kamera
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Arahkan kamera ke QR code yang ingin dipindai
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Pastikan QR code berada dalam frame dan tunggu deteksi otomatis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Camera View */}
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} relative overflow-hidden`}>
              <CardContent className="p-0">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-80 object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  
                  {/* QR Frame Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-white rounded-lg relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-purple-500"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-purple-500"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-purple-500"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-purple-500"></div>
                    </div>
                  </div>

                  {/* Camera Controls */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {hasFlash && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleFlash}
                        className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                      >
                        {flashEnabled ? <Flashlight className="w-4 h-4" /> : <FlashlightOff className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={switchCamera}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={stopCamera}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Capture Button */}
            <Button 
              onClick={captureQR}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capture QR Code
            </Button>

            <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Posisikan QR code dalam frame putih untuk deteksi otomatis
            </p>
          </div>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ScanPage;
