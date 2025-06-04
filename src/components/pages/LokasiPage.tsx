
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LokasiPageProps {
  onBack: () => void;
}

const LokasiPage: React.FC<LokasiPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const bankSampah = [
    {
      id: 1,
      name: "Bank Sampah Hijau Lestari",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      distance: "0.8 km",
      rating: 4.5,
      phone: "021-7654321",
      hours: "08:00 - 16:00",
      types: ["Plastik", "Kertas", "Logam"],
      isOpen: true
    },
    {
      id: 2,
      name: "Bank Sampah Bersih Mandiri",
      address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
      distance: "1.2 km",
      rating: 4.2,
      phone: "021-5556789",
      hours: "07:00 - 15:00",
      types: ["Plastik", "Kardus", "Botol"],
      isOpen: false
    },
    {
      id: 3,
      name: "Bank Sampah Eco Community",
      address: "Jl. Sudirman No. 78, Jakarta Pusat",
      distance: "2.1 km",
      rating: 4.7,
      phone: "021-3334567",
      hours: "09:00 - 17:00",
      types: ["Semua Jenis"],
      isOpen: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Lokasi Bank Sampah</h1>
        </div>
        
        {/* Search */}
        <Input
          placeholder="Cari bank sampah terdekat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Map Placeholder */}
        <Card className="h-48 bg-green-100 border-2 border-dashed border-green-300">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center text-green-600">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Peta Lokasi Bank Sampah</p>
              <p className="text-sm">Integrasi dengan Google Maps</p>
            </div>
          </CardContent>
        </Card>

        {/* Location List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Bank Sampah Terdekat</h3>
          
          {bankSampah
            .filter(bank => 
              bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              bank.address.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((bank) => (
              <Card key={bank.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{bank.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{bank.address}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{bank.distance}</span>
                        <Star className="w-4 h-4 ml-3 mr-1 text-yellow-500" />
                        <span>{bank.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bank.isOpen 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {bank.isOpen ? 'Buka' : 'Tutup'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{bank.hours}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Jenis sampah diterima:</p>
                    <div className="flex flex-wrap gap-1">
                      {bank.types.map((type, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Telepon
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-600">
                      <Navigation className="w-4 h-4 mr-1" />
                      Rute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LokasiPage;
