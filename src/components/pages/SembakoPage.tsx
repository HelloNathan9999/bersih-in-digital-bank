
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ShoppingCartPage from './ShoppingCartPage';
import TransactionReceiptPage from './TransactionReceiptPage';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

interface SembakoPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const SembakoPage: React.FC<SembakoPageProps> = ({ onBack, isDarkMode = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const sembakoProducts = [
    {
      id: 1,
      name: "Beras Premium 5kg",
      price: 65000,
      description: "Beras berkualitas tinggi dengan aroma wangi",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Beras",
      rating: 4.9,
      sold: 320,
      stock: 50
    },
    {
      id: 2,
      name: "Minyak Goreng 2L",
      price: 32000,
      description: "Minyak goreng murni untuk masakan sehari-hari",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Minyak",
      rating: 4.7,
      sold: 180,
      stock: 25
    },
    {
      id: 3,
      name: "Gula Pasir 1kg",
      price: 14000,
      description: "Gula pasir putih berkualitas untuk keperluan dapur",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Gula",
      rating: 4.8,
      sold: 245,
      stock: 40
    },
    {
      id: 4,
      name: "Tepung Terigu 1kg",
      price: 12000,
      description: "Tepung terigu protein sedang untuk berbagai masakan",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
      category: "Tepung",
      rating: 4.6,
      sold: 156,
      stock: 35
    },
    {
      id: 5,
      name: "Telur Ayam 1kg",
      price: 28000,
      description: "Telur ayam segar pilihan kualitas terbaik",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop",
      category: "Protein",
      rating: 4.9,
      sold: 290,
      stock: 20
    },
    {
      id: 6,
      name: "Susu UHT 1L",
      price: 18000,
      description: "Susu UHT full cream kaya nutrisi",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop",
      category: "Susu",
      rating: 4.8,
      sold: 198,
      stock: 30
    },
    {
      id: 7,
      name: "Kecap Manis 600ml",
      price: 15000,
      description: "Kecap manis tradisional dengan rasa otentik",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=200&fit=crop",
      category: "Bumbu",
      rating: 4.7,
      sold: 134,
      stock: 45
    },
    {
      id: 8,
      name: "Garam Dapur 500gr",
      price: 4000,
      description: "Garam dapur bersih untuk masakan sehari-hari",
      image: "https://images.unsplash.com/photo-1594736797933-d0c8a2df1b5b?w=300&h=200&fit=crop",
      category: "Bumbu",
      rating: 4.5,
      sold: 267,
      stock: 55
    },
    {
      id: 9,
      name: "Sabun Mandi 3pcs",
      price: 22000,
      description: "Paket sabun mandi dengan formula lembut",
      image: "https://images.unsplash.com/photo-1556228149-d75ba7d4d7a6?w=300&h=200&fit=crop",
      category: "Toiletries",
      rating: 4.6,
      sold: 89,
      stock: 60
    },
    {
      id: 10,
      name: "Pasta Gigi",
      price: 8500,
      description: "Pasta gigi dengan fluoride untuk gigi sehat",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      category: "Toiletries",
      rating: 4.4,
      sold: 156,
      stock: 40
    }
  ];

  const categories = ['Semua', 'Beras', 'Minyak', 'Gula', 'Tepung', 'Protein', 'Susu', 'Bumbu', 'Toiletries'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        selected: true
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${product.name} berhasil ditambahkan ke keranjang`,
    });
  };

  const handleCheckout = (items: CartItem[], total: number) => {
    const transaction = {
      type: 'Pembelian Sembako',
      amount: `-Rp ${total.toLocaleString()}`,
      transactionId: `SMB${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `Pembelian ${items.length} item sembako`,
    };
    
    setCurrentPage('receipt');
  };

  if (currentPage === 'cart') {
    return (
      <ShoppingCartPage
        onBack={() => setCurrentPage('products')}
        onCheckout={handleCheckout}
        isDarkMode={isDarkMode}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    );
  }

  if (currentPage === 'receipt') {
    const total = cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
    const mockTransaction = {
      type: 'Pembelian Sembako',
      amount: `-Rp ${total.toLocaleString()}`,
      transactionId: `SMB${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: 'Pembelian sembako berhasil'
    };

    return (
      <TransactionReceiptPage
        onBack={() => setCurrentPage('products')}
        isDarkMode={isDarkMode}
        transaction={mockTransaction}
      />
    );
  }

  const filteredProducts = sembakoProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Warung Sembako</h1>
          </div>
          
          {/* Shopping Cart Icon */}
          <button
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 rounded-full hover:bg-white/10"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari sembako..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                isDarkMode && selectedCategory !== category 
                  ? 'border-gray-600 bg-gray-800 text-white' 
                  : ''
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className={`overflow-hidden ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                  Stok: {product.stock}
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className={`font-semibold text-sm mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {product.name}
                </h3>
                <p className={`text-xs mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.description}
                </p>
                
                {/* Rating and sold */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {product.rating}
                    </span>
                  </div>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {product.sold} terjual
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">
                    Rp {product.price.toLocaleString()}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
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

export default SembakoPage;
