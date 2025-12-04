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
    const initializeAuth = async () => {
    const storedUser = authAPI.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          const userData = {
            ...response.data,
            token
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        } catch (error) {
          authAPI.logout();
          console.error('Failed to rehydrate session', error);
        }
      }

    setLoading(false);
    };

    initializeAuth();
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

