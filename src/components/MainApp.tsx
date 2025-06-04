
import React, { useState } from 'react';
import { Home, Scan, Target, ShoppingBag, User } from 'lucide-react';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import ScanPage from './ScanPage';
import ShoppingPage from './ShoppingPage';
import ProfilePage from './ProfilePage';

interface MainAppProps {
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'news', icon: Target, label: 'Berita' },
    { id: 'scan', icon: Scan, label: 'Scan QR' },
    { id: 'shopping', icon: ShoppingBag, label: 'Belanja' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'news':
        return <NewsPage />;
      case 'scan':
        return <ScanPage />;
      case 'shopping':
        return <ShoppingPage />;
      case 'profile':
        return <ProfilePage onLogout={onLogout} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <div className="flex-1">
        {renderActiveTab()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 rounded-t-3xl mx-4 mb-4">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white scale-110'
                    : 'text-gray-600 hover:text-green-500'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
