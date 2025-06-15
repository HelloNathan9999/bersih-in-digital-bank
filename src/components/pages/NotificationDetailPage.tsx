
import React from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationDetailPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
  notification: {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'info';
    read: boolean;
    details?: string;
  };
}

const NotificationDetailPage: React.FC<NotificationDetailPageProps> = ({ 
  onBack, 
  isDarkMode = false,
  notification 
}) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      default:
        return <Bell className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Detail Notifikasi</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              {getIconByType(notification.type)}
              <h2 className={`text-2xl font-bold mt-4 mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {notification.title}
              </h2>
              <div className="flex items-center justify-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {notification.time}
              </div>
            </div>

            <div className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {notification.message}
            </div>

            {notification.details && (
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Detail Lengkap:
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {notification.details}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationDetailPage;
