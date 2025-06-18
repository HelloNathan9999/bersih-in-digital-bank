
import React, { useState, useEffect } from 'react';
import { Home, Scan, Target, ShoppingBag, User } from 'lucide-react';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import ScanPage from './ScanPage';
import ShoppingPage from './ShoppingPage';
import ProfilePage from './ProfilePage';
import ChatBot from './ChatBot';
import { Toaster } from '@/components/ui/toaster';

interface MainAppProps {
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const tabs = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'news', icon: Target, label: 'Berita' },
    { id: 'scan', icon: Scan, label: 'Scan QR' },
    { id: 'shopping', icon: ShoppingBag, label: 'Belanja' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />;
      case 'news':
        return <NewsPage isDarkMode={isDarkMode} />;
      case 'scan':
        return <ScanPage isDarkMode={isDarkMode} />;
      case 'shopping':
        return <ShoppingPage isDarkMode={isDarkMode} />;
      case 'profile':
        return <ProfilePage onLogout={onLogout} isDarkMode={isDarkMode} />;
      default:
        return <HomePage isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />;
    }
  };

  // Custom colors based on theme
  const themeColors = {
    active: isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-sky-500 to-blue-600',
    navBg: isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
  };

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <div className="flex-1">
        {renderActiveTab()}
      </div>

      {/* Chat Bot */}
      <ChatBot isDarkMode={isDarkMode} />

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t rounded-t-2xl mx-3 mb-3 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `${themeColors.active} text-white scale-105 shadow-lg`
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-emerald-400' 
                      : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-sm' : ''}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default MainApp;
