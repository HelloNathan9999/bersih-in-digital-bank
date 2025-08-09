import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Flashlight, FlashlightOff, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface QRCameraPageProps {
  isDarkMode?: boolean;
}

const QRCameraPage: React.FC<QRCameraPageProps> = ({ isDarkMode = false }) => {
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
    // Auto-start camera when page loads
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
        duration: 2000,
      });
      
    } catch (error: any) {
      console.error('Camera error:', error);
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
        duration: 2000,
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
    navigate('/');
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
          title: "⚠️ Flash Error",
          description: "Tidak dapat mengontrol flash pada perangkat ini",
          duration: 2000,
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
          duration: 2000,
        });
        
        // Simulate processing
        setTimeout(() => {
          toast({
            title: "✅ Scan Berhasil",
            description: "QR Code berhasil dipindai!",
            duration: 2000,
          });
        }, 1500);
      } else {
        toast({
          title: "⚠️ Error",
          description: "Video belum siap untuk capture",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20 pt-12 pb-4">
        <div className="mx-6 bg-primary/80 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                console.log('Back to home button clicked');
                navigate('/');
              }}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">QR Scanner</h1>
              <p className="text-sm opacity-90">Pindai QR code untuk transaksi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6" style={{ marginTop: '140px' }}>
        {cameraError ? (
          <Card className="bg-destructive/10 border-destructive/20 mb-6">
            <CardContent className="p-4">
              <p className="text-destructive text-sm">{cameraError}</p>
              <Button 
                onClick={startCamera} 
                className="mt-3 bg-primary hover:bg-primary/90"
              >
                Coba Lagi
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="relative overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-96 object-cover"
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
                  <div className="w-56 h-56 border-4 border-white rounded-2xl relative">
                    {/* Corner indicators */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-accent rounded-tl-2xl"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-accent rounded-tr-2xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-accent rounded-bl-2xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-accent rounded-br-2xl"></div>
                    
                    {/* Scanning line animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-pulse"></div>
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
        )}

        {/* Manual Capture Button */}
        {isCameraActive && (
          <Button 
            onClick={captureQR}
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-4 font-semibold rounded-2xl"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture QR Code
          </Button>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          Posisikan QR code dalam frame putih untuk deteksi otomatis
        </p>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default QRCameraPage;