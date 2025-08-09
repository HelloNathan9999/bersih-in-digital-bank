<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
import OnboardingScreen from '../components/OnboardingScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import MainApp from '../components/MainApp';

const Index = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('onboarding');

  useEffect(() => {
<<<<<<< HEAD
    try {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      const userData = localStorage.getItem('userData'); // Ganti dari userToken

      if (hasSeenOnboarding) {
        setIsFirstTime(false);
        if (userData) {
          setIsAuthenticated(true);
          setCurrentView('main');
        } else {
          setCurrentView('login');
        }
      }
    } catch (error) {
      console.error('Error in Index useEffect:', error);
      setIsFirstTime(true);
      setCurrentView('onboarding');
=======
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
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
    }
  }, []);

  const handleOnboardingComplete = () => {
<<<<<<< HEAD
    try {
      localStorage.setItem('hasSeenOnboarding', 'true');
      setIsFirstTime(false);
      setCurrentView('login');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
=======
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsFirstTime(false);
    setCurrentView('login');
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('main');
  };

  const handleLogout = () => {
<<<<<<< HEAD
    try {
      localStorage.removeItem('userData'); // Ganti dari userToken
      setIsAuthenticated(false);
      setCurrentView('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
=======
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setCurrentView('login');
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
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
