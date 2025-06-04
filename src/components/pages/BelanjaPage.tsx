
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface BelanjaPageProps {
  onBack: () => void;
}

const BelanjaPage: React.FC<BelanjaPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang",
      image: "🛍️",
      category: "Eco-Friendly"
    },
    {
      id: 2,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi",
      image: "🌾",
      category: "Sembako"
    },
    {
      id: 3,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan",
      image: "🍼",
      category: "Eco-Friendly"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-500 text-white p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Belanja Produk</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" size="sm">Semua</Button>
          <Button variant="outline" size="sm">Sembako</Button>
          <Button variant="outline" size="sm">Eco-Friendly</Button>
          <Button variant="outline" size="sm">Voucher</Button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4">
          {products
            .filter(product => 
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <Card key={product.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="text-4xl text-center mb-2">{product.image}</div>
                  <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <Button size="sm" className="bg-green-500">
                      <ShoppingCart className="w-4 h-4" />
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

export default BelanjaPage;
