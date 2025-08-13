import React from 'react';
import MainApp from '@/components/MainApp';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainApp onLogout={handleLogout} />
    </div>
  );
};

export default Index;
