
import React from 'react';
import { Bell, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationPageProps {
  isDarkMode?: boolean;
  onBack: () => void;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ isDarkMode = false, onBack }) => {
  const notifications = [
    {
      id: 1,
      title: 'Setor Sampah Berhasil!',
      message: 'Selamat! Anda telah menyetor 2.5kg sampah plastik dan mendapat +125 poin.',
      time: '2 jam lalu',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Promo Tukar Poin',
      message: 'Dapatkan diskon 20% untuk voucher belanja dengan menukar 500 poin!',
      time: '1 hari lalu',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Target Mingguan',
      message: 'Anda hampir mencapai target mingguan! Tinggal 1.5kg lagi.',
      time: '2 hari lalu',
      type: 'warning',
      read: true
    },
    {
      id: 4,
      title: 'Penarikan Berhasil',
      message: 'Penarikan saldo Rp 50.000 telah berhasil diproses.',
      time: '3 hari lalu',
      type: 'success',
      read: true
    }
  ];

  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Notifikasi
          </h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${!notification.read ? 'ring-2 ring-blue-500/20' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getIconByType(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'} ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
