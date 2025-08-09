
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Recycle, Coins, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Recycle className="w-24 h-24 text-green-500 mx-auto mb-6" />,
      title: "Selamat Datang di BERSIH.IN",
      subtitle: "Bank Sampah Digital untuk Semua Kalangan",
      description: "Aplikasi revolusioner yang mengubah sampah menjadi saldo dan poin. Mari bersama-sama menciptakan lingkungan yang lebih bersih dan berkelanjutan."
    },
    {
      icon: <Coins className="w-24 h-24 text-blue-500 mx-auto mb-6" />,
      title: "Tukar Sampah Jadi Cuan",
      subtitle: "Dapatkan Saldo & Poin dari Sampah",
      description: "Setor sampah non-organik seperti plastik, kardus, dan logam. Dapatkan saldo yang bisa ditarik ke rekening atau poin untuk belanja produk ramah lingkungan."
    },
    {
      icon: <MapPin className="w-24 h-24 text-purple-500 mx-auto mb-6" />,
      title: "Mudah & Praktis",
      subtitle: "Scan QR, Setor, Dapat Saldo",
      description: "Cukup scan QR code di bank sampah mitra, serahkan sampah yang sudah dipilah, dan langsung terima saldo di aplikasi. Semudah itu!"
    },
    {
      icon: <Users className="w-24 h-24 text-orange-500 mx-auto mb-6" />,
      title: "Bergabung dengan Komunitas",
      subtitle: "Bersama Jaga Lingkungan",
      description: "Ikuti misi komunitas, kuis edukatif, dan mini games. Raih badge eksklusif dan masuk leaderboard pengguna terbaik!"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col">
      {/* Header dengan progress indicator */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div className="text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
        <button 
          onClick={onComplete}
          className="text-white text-sm font-medium opacity-70 hover:opacity-100"
        >
          Lewati
        </button>
      </div>

      {/* Progress bar */}
      <div className="mx-6 mb-8">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="text-center">
          {slides[currentSlide].icon}
          <h1 className="text-3xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-xl font-semibold text-white/90 mb-6">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-12">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 pb-12">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            className="bg-white text-green-600 hover:bg-white/90 font-semibold"
          >
            {currentSlide === slides.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
