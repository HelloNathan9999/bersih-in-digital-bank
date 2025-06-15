
import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import PinDialog from '../PinDialog';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartPageProps {
  onBack: () => void;
  onCheckout: (items: CartItem[], total: number) => void;
  isDarkMode?: boolean;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ 
  onBack, 
  onCheckout,
  isDarkMode = false 
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Tas Ramah Lingkungan",
      price: 25000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Botol Minum Stainless",
      price: 45000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop"
    }
  ]);

  const [showPinDialog, setShowPinDialog] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item Dihapus",
      description: "Produk berhasil dihapus dari keranjang",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan produk ke keranjang terlebih dahulu",
      });
      return;
    }
    setShowPinDialog(true);
  };

  const handlePinSuccess = () => {
    onCheckout(cartItems, calculateTotal());
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Keranjang Belanja</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Cart Items */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card key={item.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <p className="text-emerald-600 font-bold">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className={`px-3 py-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.quantity}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Keranjang belanja kosong
            </p>
          </div>
        )}

        {/* Total and Checkout */}
        {cartItems.length > 0 && (
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Total
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  Rp {calculateTotal().toLocaleString()}
                </span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <PinDialog
        open={showPinDialog}
        onClose={() => setShowPinDialog(false)}
        onSuccess={handlePinSuccess}
        title="Verifikasi Pembayaran"
        description="Masukkan PIN untuk melanjutkan pembayaran"
      />
    </div>
  );
};

export default ShoppingCartPage;
