import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = authAPI.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.data);
      setShowAuthModal(false);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username, email, password, role = 'user') => {
    try {
      const response = await authAPI.signup({ username, email, password, role });
      setUser(response.data);
      setShowAuthModal(false);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const openSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    openSignIn,
    openSignUp,
    showAuthModal,
    authMode,
    closeAuthModal,
    isSignedIn: !!user,
    isLoaded: !loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

