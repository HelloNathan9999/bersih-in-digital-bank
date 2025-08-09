import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen
      onLoginSuccess={() => {
        // misal navigate ke home atau trigger apapun
        console.log('Login sukses!');
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
