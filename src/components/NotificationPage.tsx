import React, { useState, useEffect } from 'react';
import { Bell, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NotificationDetailPage from './pages/NotificationDetailPage';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  isRead: boolean;
  details: {
    transactionId?: string;
    amount: string;
    date: string;
    status: string;
  };
}

interface NotificationPageProps {
  isDarkMode?: boolean;
  onBack: () => void;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ isDarkMode = false, onBack }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  // Ambil notifikasi dari localStorage saat pertama kali render
  useEffect(() => {
    const stored = localStorage.getItem("userNotifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  // Simpan notifikasi ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("userNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const handleNotificationClick = (notification: NotificationItem) => {
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
          <h1 className="text-xl font-bold">Notifikasi</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.length === 0 && (
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ooopssss, kamu belum punya Transaksi nih.
          </p>
        )}
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
