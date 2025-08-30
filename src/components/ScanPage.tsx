
import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Flashlight, FlashlightOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError('');
      
      // Stop existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera tidak didukung di browser ini');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280, min: 320 },
          height: { ideal: 720, min: 240 }
        },
        audio: false
      };

      console.log('Requesting camera access...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained successfully');
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for video to be ready
        const playVideo = () => {
          return new Promise<void>((resolve, reject) => {
            if (!videoRef.current) {
              reject(new Error('Video element not found'));
              return;
            }

            const video = videoRef.current;
            
            const onLoadedMetadata = () => {
              video.removeEventListener('loadedmetadata', onLoadedMetadata);
              video.removeEventListener('error', onError);
              
              video.play()
                .then(() => {
                  console.log('Video started playing');
                  setIsCameraActive(true);
                  resolve();
                })
                .catch(reject);
            };

            const onError = (error: Event) => {
              video.removeEventListener('loadedmetadata', onLoadedMetadata);
              video.removeEventListener('error', onError);
              reject(error);
            };

            video.addEventListener('loadedmetadata', onLoadedMetadata);
            video.addEventListener('error', onError);
            
            // Trigger load if not already loading
            if (video.readyState === 0) {
              video.load();
            } else if (video.readyState >= 1) {
              onLoadedMetadata();
            }
          });
        };

        await playVideo();
      }

      // Check for flash support
      const track = mediaStream.getVideoTracks()[0];
      if (track) {
        const capabilities = track.getCapabilities();
        console.log('Camera capabilities:', capabilities);
        
        if ((capabilities as any).torch) {
          setHasFlash(true);
          console.log('Flash is supported');
        }
      }

      toast({
        title: "✅ Kamera Aktif",
        description: "Arahkan kamera ke QR code untuk memindai",
        duration: 3000,
      });
      
    } catch (error: any) {
      console.log('Camera error:', error);
      let errorMessage = 'Gagal mengakses kamera';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Izin kamera ditolak. Silakan berikan izin kamera dan coba lagi.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'Kamera tidak ditemukan pada perangkat ini.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Kamera sedang digunakan aplikasi lain.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Kamera tidak mendukung konfigurasi yang diminta.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setCameraError(errorMessage);
      setIsCameraActive(false);
      
      toast({
        title: "❌ Gagal Mengakses Kamera",
        description: errorMessage,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera');
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track.label);
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
        console.log('Error toggling flash:', error);
        toast({
          title: "⚠️ Flash Error",
          description: "Tidak dapat mengontrol flash pada perangkat ini",
          duration: 3000,
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
      setTimeout(() => {
        startCamera();
      }, 500);
    }
  };

  const captureQR = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        console.log('QR capture attempted');
        toast({
          title: "📷 QR Code Terdeteksi",
          description: "Menganalisis QR code...",
          duration: 3000,
        });
        
        // Simulate processing
        setTimeout(() => {
          toast({
            title: "✅ Scan Berhasil",
            description: "QR Code berhasil dipindai!",
            duration: 3000,
          });
        }, 1500);
      } else {
        toast({
          title: "⚠️ Error",
          description: "Video belum siap untuk capture",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 shadow-sm z-10 pt-12 pb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="px-6">
          <h1 className="text-2xl font-bold mb-2">Scan QR Code</h1>
          <p className="text-sm opacity-90">Pindai QR code untuk transaksi cepat</p>
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

            {/* Camera Activation Card */}
            <Card className={`${isDarkMode ? 'bg-purple-800/20 border-purple-600' : 'bg-purple-50 border-purple-200'}`}>
              <CardContent className="p-6 text-center">
                <Camera className={`w-20 h-20 mx-auto mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Scan QR Code
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Aktifkan kamera untuk memindai QR code dan melakukan transaksi dengan mudah
                </p>
                <Button 
                  onClick={() => navigate('/qr-camera')}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Mengaktifkan...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Buka Kamera
                    </>
                  )}
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
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Tekan tombol "Buka Kamera" untuk mengaktifkan kamera
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Berikan izin kamera saat diminta oleh browser
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Arahkan kamera ke QR code yang ingin dipindai
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
                <div className="relative bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-80 object-cover"
                    autoPlay
                    playsInline
                    muted
                    style={{ 
                      transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                      backgroundColor: 'black'
                    }}
                  />
                  
                  {/* QR Frame Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-white rounded-lg relative">
                      {/* Corner indicators */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-purple-400 rounded-tl-lg"></div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-r-4 border-t-4 border-purple-400 rounded-tr-lg"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-4 border-b-4 border-purple-400 rounded-bl-lg"></div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-purple-400 rounded-br-lg"></div>
                      
                      {/* Scanning line animation */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-purple-400 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Camera Controls */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {hasFlash && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleFlash}
                        className="bg-black/60 border-white/30 text-white hover:bg-black/80 backdrop-blur-sm"
                      >
                        {flashEnabled ? <Flashlight className="w-4 h-4" /> : <FlashlightOff className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={switchCamera}
                      className="bg-black/60 border-white/30 text-white hover:bg-black/80 backdrop-blur-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={stopCamera}
                      className="bg-black/60 border-white/30 text-white hover:bg-black/80 backdrop-blur-sm"
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
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
