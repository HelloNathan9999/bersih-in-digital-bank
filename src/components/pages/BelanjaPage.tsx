<<<<<<< HEAD
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Star, Plus } from 'lucide-react';
=======

import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Star } from 'lucide-react';
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
<<<<<<< HEAD
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
=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

interface BelanjaPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const BelanjaPage: React.FC<BelanjaPageProps> = ({ onBack, isDarkMode = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

  const products = [
    {
      id: 1,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 2,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 3,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 4,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 5,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 6,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 7,
<<<<<<< HEAD
      name: "Notebook Kertas Daur Ulang",
      price: 15000,
      description: "Notebook ramah lingkungan dari kertas daur ulang",
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.5,
      sold: 90
    },
    {
      id: 8,
      name: "Madu Organik 250ml",
      price: 75000,
      description: "Madu murni organik dari lebah lokal",
      image: "https://images.unsplash.com/photo-1587049332846-4a222e784d9d?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 110
    }
  ];

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
      type: 'Pembelian Produk',
      amount: `-Rp ${total.toLocaleString()}`,
      transactionId: `TRX${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: `Pembelian ${items.length} produk`,
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
    const mockTransaction = {
      type: 'Pembelian Produk',
      amount: '-Rp 115.000',
      transactionId: `TRX${Date.now()}`,
      date: new Date().toLocaleString('id-ID'),
      status: 'success' as const,
      description: 'Pembelian produk berhasil'
    };

    return (
      <TransactionReceiptPage
        onBack={() => setCurrentPage('products')}
        isDarkMode={isDarkMode}
        transaction={mockTransaction}
      />
    );
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600/90 to-teal-700/90 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 border-white/20'} text-white p-4 rounded-b-2xl backdrop-blur-lg border`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Belanja Produk</h1>
          </div>
          
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
=======
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 8,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 9,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 10,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 11,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 12,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 13,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 14,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 15,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 16,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 17,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 18,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 19,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 20,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 21,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 22,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 23,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 24,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 25,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 26,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 27,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 28,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 29,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 30,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 31,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 32,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 33,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 34,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 35,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 36,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 37,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 38,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 39,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 40,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 41,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 42,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 43,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 44,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 45,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 46,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 47,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 48,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 49,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 50,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 51,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 52,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 53,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 54,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 55,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 56,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 57,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      description: "Tas dari bahan daur ulang berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 120
    },
    {
      id: 58,
      name: "Beras Organik 5kg",
      price: 65000,
      description: "Beras organik berkualitas tinggi bebas pestisida",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 85
    },
    {
      id: 59,
      name: "Botol Minum Stainless",
      price: 45000,
      description: "Botol minum ramah lingkungan tahan karat",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.7,
      sold: 200
    },
    {
      id: 60,
      name: "Gula Aren Organik",
      price: 35000,
      description: "Gula aren alami tanpa bahan pengawet",
      image: "https://images.unsplash.com/photo-1559058922-a40d9817ffe3?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.6,
      sold: 65
    },
    {
      id: 61,
      name: "Dompet Daur Ulang",
      price: 55000,
      description: "Dompet unik dari bahan daur ulang",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
      category: "Eco-Friendly",
      rating: 4.8,
      sold: 45
    },
    {
      id: 62,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 63,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 64,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
    {
      id: 65,
      name: "Minyak Kelapa VCO",
      price: 40000,
      description: "Virgin Coconut Oil murni 100%",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      category: "Sembako",
      rating: 4.9,
      sold: 150
    },
  ];

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${productName} berhasil ditambahkan ke keranjang`,
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-green-500'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Belanja Produk</h1>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
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
          <Button variant="outline" size="sm" className={isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : ''}>
            Semua
          </Button>
          <Button variant="outline" size="sm" className={isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : ''}>
            Sembako
          </Button>
          <Button variant="outline" size="sm" className={isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : ''}>
            Eco-Friendly
          </Button>
          <Button variant="outline" size="sm" className={isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : ''}>
            Voucher
          </Button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4">
          {products
            .filter(product => 
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <Card key={product.id} className={`overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
<<<<<<< HEAD
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs">
=======
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                    {product.category}
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
                  
<<<<<<< HEAD
=======
                  {/* Rating and sold */}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
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
<<<<<<< HEAD
                    <span className="font-bold text-emerald-600">
=======
                    <span className="font-bold text-green-600">
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
                      Rp {product.price.toLocaleString()}
                    </span>
                    <Button 
                      size="sm" 
<<<<<<< HEAD
                      className="bg-emerald-500 hover:bg-emerald-600"
                      onClick={() => handleAddToCart(product)}
=======
                      className="bg-green-500"
                      onClick={() => handleAddToCart(product.name)}
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
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

export default BelanjaPage;
