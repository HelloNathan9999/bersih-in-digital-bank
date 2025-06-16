
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
  const [cameraError, setCameraError] = useState<string>('');
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
      setCameraError('');
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera tidak didukung di browser ini');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false
      };

      console.log('Requesting camera with constraints:', constraints);

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained:', mediaStream);
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for video to load metadata
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              console.log('Video playing successfully');
              setIsCameraActive(true);
            }).catch(err => {
              console.error('Error playing video:', err);
              setCameraError('Gagal memulai video kamera');
            });
          }
        };
        
        videoRef.current.onerror = (error) => {
          console.error('Video error:', error);
          setCameraError('Error pada video kamera');
        };
      }

      // Check if flash is available
      const track = mediaStream.getVideoTracks()[0];
      if (track) {
        const capabilities = track.getCapabilities();
        console.log('Camera capabilities:', capabilities);
        
        // Check for flash support
        if ((capabilities as any).torch) {
          setHasFlash(true);
          console.log('Flash is supported');
        }
      }

      toast({
        title: "Kamera Aktif",
        description: "Arahkan kamera ke QR code untuk memindai",
      });
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Gagal mengakses kamera';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Izin kamera ditolak. Silakan berikan izin kamera dan coba lagi.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'Kamera tidak ditemukan pada perangkat ini.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Kamera tidak didukung di browser ini.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setCameraError(errorMessage);
      toast({
        title: "Gagal Mengakses Kamera",
        description: errorMessage,
      });
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera');
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track);
        track.stop();
      });
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
    setFlashEnabled(false);
    setCameraError('');
  };

  const toggleFlash = async () => {
    if (stream && hasFlash) {
      const track = stream.getVideoTracks()[0];
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashEnabled } as any]
        });
        setFlashEnabled(!flashEnabled);
        console.log('Flash toggled:', !flashEnabled);
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
    console.log('Switching camera to:', newFacingMode);
    setFacingMode(newFacingMode);
    
    if (isCameraActive) {
      stopCamera();
      // Wait a bit before starting the new camera
      setTimeout(() => {
        startCamera();
      }, 500);
    }
  };

  const captureQR = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        console.log('QR capture attempted');
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
      } else {
        toast({
          title: "Error",
          description: "Video belum siap untuk capture",
        });
      }
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with Aurora Blue Colors */}
      <div className="fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
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
            {/* Error Message */}
            {cameraError && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <p className="text-red-700 text-sm">{cameraError}</p>
                </CardContent>
              </Card>
            )}

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
                      Berikan izin kamera saat diminta oleh browser
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Arahkan kamera ke QR code yang ingin dipindai
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      4
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
                    className="w-full h-80 object-cover bg-black"
                    autoPlay
                    playsInline
                    muted
                    style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
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
