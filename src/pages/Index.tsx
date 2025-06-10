
import React, { useState } from 'react';
import LoginScreen from '../components/LoginScreen';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatInterface onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
