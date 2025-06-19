
import React, { useState, useEffect } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import MainApp from '../components/MainApp';

const Index = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('onboarding');

  useEffect(() => {
    try {
      // Check if user has seen onboarding before
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      const userToken = localStorage.getItem('userToken');
      
      if (hasSeenOnboarding) {
        setIsFirstTime(false);
        if (userToken) {
          setIsAuthenticated(true);
          setCurrentView('main');
        } else {
          setCurrentView('login');
        }
      }
    } catch (error) {
      console.error('Error in Index useEffect:', error);
      // Fallback to onboarding if there's an error
      setIsFirstTime(true);
      setCurrentView('onboarding');
    }
  }, []);

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem('hasSeenOnboarding', 'true');
      setIsFirstTime(false);
      setCurrentView('login');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('main');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setCurrentView('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isFirstTime) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'login' && (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      )}
      {currentView === 'register' && (
        <RegisterScreen 
          onRegisterSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
      {currentView === 'main' && (
        <MainApp onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
