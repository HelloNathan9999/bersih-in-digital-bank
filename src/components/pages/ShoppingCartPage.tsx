
import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, MapPin, Truck, Building, Smartphone, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import PinDialog from '../PinDialog';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

interface ShoppingCartPageProps {
  onBack: () => void;
  onCheckout: (items: CartItem[], total: number) => void;
  isDarkMode?: boolean;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ 
  onBack, 
  onCheckout,
  isDarkMode = false,
  cartItems,
  setCartItems
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    postalCode: ''
  });

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

  const toggleItemSelection = (id: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => item.selected);
  };

  const handleCheckout = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      toast({
        title: "Pilih Produk",
        description: "Pilih produk yang ingin dibeli terlebih dahulu",
      });
      return;
    }
    setShowCheckout(true);
  };

  const handlePayment = () => {
    if (!paymentMethod || !address.name || !address.phone || !address.street) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang diperlukan",
      });
      return;
    }
    setShowPinDialog(true);
  };

  const handlePinSuccess = () => {
    const selectedItems = getSelectedItems();
    onCheckout(selectedItems, calculateTotal());
  };

  const paymentMethods = [
    { id: 'balance', icon: Wallet, label: 'Saldo Tersedia', description: 'Bayar dengan saldo aplikasi' },
    { id: 'bank', icon: Building, label: 'Transfer Bank', description: 'Transfer via bank lokal' },
    { id: 'va', icon: CreditCard, label: 'Virtual Account', description: 'Virtual Account bank' },
    { id: 'ewallet', icon: Smartphone, label: 'E-Wallet', description: 'GoPay, OVO, DANA, dll' }
  ];

  if (showCheckout) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowCheckout(false)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Checkout</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Shipping Address */}
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Alamat Pengiriman
                </h3>
              </div>
              <div className="space-y-3">
                <Input
                  placeholder="Nama Penerima"
                  value={address.name}
                  onChange={(e) => setAddress({...address, name: e.target.value})}
                  className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                />
                <Input
                  placeholder="Nomor Telepon"
                  value={address.phone}
                  onChange={(e) => setAddress({...address, phone: e.target.value})}
                  className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                />
                <Input
                  placeholder="Alamat Lengkap"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Kota"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                  <Input
                    placeholder="Kode Pos"
                    value={address.postalCode}
                    onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                    className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Metode Pembayaran
                </h3>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : isDarkMode 
                            ? 'border-gray-600 hover:border-gray-500' 
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-emerald-600" />
                        <div>
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {method.label}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Ringkasan Pesanan
              </h3>
              <div className="space-y-2 mb-4">
                {getSelectedItems().map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.name} x{item.quantity}
                    </span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Total
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    Rp {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 text-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Bayar Sekarang
          </Button>
        </div>

        <PinDialog
          open={showPinDialog}
          onClose={() => setShowPinDialog(false)}
          onSuccess={handlePinSuccess}
          title="Verifikasi Pembayaran"
          description={`Masukkan PIN untuk melanjutkan pembayaran Rp ${calculateTotal().toLocaleString()}`}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
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
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
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
                  Total ({getSelectedItems().length} item)
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  Rp {calculateTotal().toLocaleString()}
                </span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Truck className="w-4 h-4 mr-2" />
                Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
