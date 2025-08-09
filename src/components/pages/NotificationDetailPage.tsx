
import React from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationDetailPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error' | 'promo' | 'reminder';
    time: string;
    isRead: boolean;
    details?: {
      transactionId?: string;
      amount?: string;
      date?: string;
      status?: string;
    };
  };
  onMarkAsRead: (id: string) => void;
}

const NotificationDetailPage: React.FC<NotificationDetailPageProps> = ({ 
  onBack, 
  isDarkMode = false,
  notification,
  onMarkAsRead
}) => {
  React.useEffect(() => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  }, [notification.id, notification.isRead, onMarkAsRead]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      default:
        return <Clock className="w-8 h-8 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Detail Notifikasi</h1>
        </div>
      </div>

      {/* Notification Content */}
      <div className="p-4">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
          <CardContent className="p-6">
            {/* Type Icon and Title */}
            <div className="flex items-start space-x-4 mb-6">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-gray-700' : getTypeColor(notification.type)
              }`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {notification.title}
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notification.time}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Pesan
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {notification.message}
              </p>
            </div>

            {/* Transaction Details */}
            {notification.details && (
              <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Detail Transaksi
                </h3>
                <div className="space-y-3">
                  {notification.details.transactionId && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ID Transaksi
                      </span>
                      <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {notification.details.transactionId}
                      </span>
                    </div>
                  )}
                  {notification.details.amount && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Jumlah
                      </span>
                      <span className={`font-semibold ${
                        notification.details.amount.startsWith('-') 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        {notification.details.amount}
                      </span>
                    </div>
                  )}
                  {notification.details.date && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Tanggal
                      </span>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {notification.details.date}
                      </span>
                    </div>
                  )}
                  {notification.details.status && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Status
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        notification.details.status === 'Berhasil' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {notification.details.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-8">
              <Button 
                onClick={onBack}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Kembali
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationDetailPage;
