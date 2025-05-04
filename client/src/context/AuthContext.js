import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../config/axios';
import { useAlert } from './AlertContext';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAlert } = useAlert();

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        setAlert('Your session has expired. Please log in again.', 'warning');
      }
    }
    setLoading(false);
  }, [setAlert]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setAlert('Successfully logged in!', 'success');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const register = useCallback(async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setAlert('Account created successfully!', 'success');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setAlert('Successfully logged out!', 'success');
  }, [setAlert]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 