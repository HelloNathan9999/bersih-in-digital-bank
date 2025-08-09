
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
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
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
      </div>
    </div>
  );
};

export default NotificationPage;
