import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as apiLogout } from '../api/userService';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/logIn');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigate]);

  const loginUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  return { user, logout, loginUser, loggedIn: !!user };
};
