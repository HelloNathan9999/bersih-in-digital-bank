
import React, { useState } from 'react';
import { Bell, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NotificationDetailPage from './pages/NotificationDetailPage';

interface NotificationPageProps {
  isDarkMode?: boolean;
  onBack: () => void;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ isDarkMode = false, onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Setor Sampah Berhasil!',
      message: 'Selamat! Anda telah menyetor 2.5kg sampah plastik dan mendapat +125 poin.',
      time: '2 jam lalu',
      type: 'success' as const,
      isRead: false,
      details: {
        transactionId: 'TXN001234',
        amount: '+125 poin',
        date: '19 Juni 2025, 14:30',
        status: 'Berhasil'
      }
    },
    {
      id: '2',
      title: 'Promo Tukar Poin',
      message: 'Dapatkan diskon 20% untuk voucher belanja dengan menukar 500 poin!',
      time: '1 hari lalu',
      type: 'info' as const,
      isRead: false,
      details: {
        amount: '500 poin',
        date: '18 Juni 2025',
        status: 'Aktif'
      }
    },
    {
      id: '3',
      title: 'Target Mingguan',
      message: 'Anda hampir mencapai target mingguan! Tinggal 1.5kg lagi.',
      time: '2 hari lalu',
      type: 'warning' as const,
      isRead: true,
      details: {
        amount: '8.5/10kg',
        date: '17 Juni 2025',
        status: 'Progress'
      }
    },
    {
      id: '4',
      title: 'Penarikan Berhasil',
      message: 'Penarikan saldo Rp 50.000 telah berhasil diproses.',
      time: '3 hari lalu',
      type: 'success' as const,
      isRead: true,
      details: {
        transactionId: 'WD001234',
        amount: '-Rp 50.000',
        date: '16 Juni 2025, 10:15',
        status: 'Berhasil'
      }
    },
    {
      id: '5',
      title: 'Pembelian Token Listrik',
      message: 'Pembelian token listrik Rp 100.000 berhasil diproses.',
      time: '4 hari lalu',
      type: 'success' as const,
      isRead: true,
      details: {
        transactionId: 'PLN001234',
        amount: '-Rp 100.000',
        date: '15 Juni 2025, 09:45',
        status: 'Berhasil'
      }
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

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

  if (selectedNotification) {
    return (
      <NotificationDetailPage
        onBack={() => setSelectedNotification(null)}
        isDarkMode={isDarkMode}
        notification={selectedNotification}
        onMarkAsRead={handleMarkAsRead}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 p-4 border-b ${
        isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-600 text-white'
      }`}>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">
            Notifikasi
          </h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            } ${!notification.isRead ? 'ring-2 ring-blue-500/20' : ''}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getIconByType(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } ${!notification.isRead ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
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
