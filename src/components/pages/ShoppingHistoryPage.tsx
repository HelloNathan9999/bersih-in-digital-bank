
import React, { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShoppingHistoryPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  rating?: number;
}

const ShoppingHistoryPage: React.FC<ShoppingHistoryPageProps> = ({ 
  onBack, 
  isDarkMode = false 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'processing' | 'shipped'>('all');

  const orderHistory: OrderItem[] = [
    {
      id: 'ORD001',
      name: 'Beras Premium 5kg',
      price: 85000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
      status: 'delivered',
      orderDate: '2024-01-15',
      trackingNumber: 'TRK123456789',
      rating: 5
    },
    {
      id: 'ORD002',
      name: 'Minyak Goreng 2L',
      price: 32000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
      status: 'shipped',
      orderDate: '2024-01-18',
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'TRK123456790'
    },
    {
      id: 'ORD003',
      name: 'Gula Pasir 1kg',
      price: 15000,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=100&h=100&fit=crop',
      status: 'processing',
      orderDate: '2024-01-19'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Selesai' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Terkirim' },
      processing: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Diproses' },
      shipped: { color: 'bg-blue-100 text-blue-800', icon: Truck, text: 'Dikirim' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center space-x-1`}>
        <IconComponent className="w-3 h-3" />
        <span>{config.text}</span>
      </Badge>
    );
  };

  const filteredOrders = activeTab === 'all' 
    ? orderHistory 
    : orderHistory.filter(order => order.status === activeTab);

  const tabs = [
    { id: 'all', label: 'Semua', count: orderHistory.length },
    { id: 'completed', label: 'Selesai', count: orderHistory.filter(o => o.status === 'delivered').length },
    { id: 'processing', label: 'Diproses', count: orderHistory.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Dikirim', count: orderHistory.filter(o => o.status === 'shipped').length }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Riwayat Belanja</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>{tab.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Belum Ada Pesanan
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Anda belum memiliki riwayat pesanan untuk kategori ini
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  {/* Order Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {order.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Jumlah: {order.quantity} | Rp {order.price.toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} space-y-1`}>
                      <p>Pesanan: {order.id}</p>
                      <p>Tanggal: {new Date(order.orderDate).toLocaleDateString('id-ID')}</p>
                      {order.trackingNumber && (
                        <p>Tracking: {order.trackingNumber}</p>
                      )}
                      {order.estimatedDelivery && (
                        <p>Estimasi: {new Date(order.estimatedDelivery).toLocaleDateString('id-ID')}</p>
                      )}
                    </div>

                    {/* Rating for completed orders */}
                    {order.status === 'delivered' && order.rating && (
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className={`ml-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          ({order.rating}/5)
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3">
                      {order.status === 'delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                        >
                          Beli Lagi
                        </Button>
                      )}
                      {(order.status === 'shipped' || order.status === 'processing') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                        >
                          Lacak Pesanan
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingHistoryPage;
