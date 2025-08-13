import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return isLogin ? (
    <LoginScreen
      onLoginSuccess={() => {
        // Navigate to onboarding after successful login
        navigate('/onboarding');
      }}
      onSwitchToRegister={() => setIsLogin(false)}
    />
  ) : (
    <RegisterScreen
      onRegisterSuccess={() => setIsLogin(true)}
      onSwitchToLogin={() => setIsLogin(true)}
    />
  );
};

export default AuthScreen;
