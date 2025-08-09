
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, BellOff, Clock, CheckCircle, AlertTriangle, Info, Gift, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationDetailPage from './pages/NotificationDetailPage';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error' | 'promo' | 'reminder';
  isRead: boolean;
  details: {
    transactionId?: string;
    amount: string;
    date: string;
    status: string;
  };
}

interface NotificationPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ onBack, isDarkMode = false }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  useEffect(() => {
    const storedNotifications = localStorage.getItem('userNotifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  const handleNotificationClick = (notification: NotificationItem) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    
    setSelectedNotification(notification);
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  const getNotificationIcon = (type: string) => {
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
<<<<<<< HEAD
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'promo':
        return <Gift className="w-5 h-5 text-purple-500" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  if (selectedNotification) {
    return (
      <NotificationDetailPage
        notification={selectedNotification}
        onBack={() => setSelectedNotification(null)}
        isDarkMode={isDarkMode}
        onMarkAsRead={(id) => {
          const updatedNotifications = notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
          );
          setNotifications(updatedNotifications);
          localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white p-4 rounded-b-3xl backdrop-blur-lg bg-opacity-90 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Notifikasi</h1>
          </div>
          <Bell className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6">
        {notifications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <BellOff className={`w-20 h-20 mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Opsss.. Kamu Saat ini belum memiliki informasi apa apa nih
            </h3>
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Notifikasi akan muncul di sini ketika ada aktivitas atau informasi penting untuk Anda.
            </p>
          </div>
        ) : (
          /* Notifications List */
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                } ${!notification.isRead ? 'ring-2 ring-blue-200' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className={`ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
      </div>
    </div>
  );
};

export default NotificationPage;
