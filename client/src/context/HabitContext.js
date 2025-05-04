import { createContext, useContext, useState, useCallback } from 'react';
import api from '../config/axios';
import { useAlert } from './AlertContext';

const HabitContext = createContext();

export const useHabits = () => {
  return useContext(HabitContext);
};

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const { setAlert } = useAlert();

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/habits');
      setHabits(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch habits';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const logHabit = useCallback(async (habitData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/habits', habitData);
      setHabits(prevHabits => [...prevHabits, response.data]);
      setAlert('Habit logged successfully!', 'success');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to log habit';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/habits/stats');
      setStats(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stats';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const fetchGlobalStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/stats/global');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch global stats';
      setError(errorMessage);
      setAlert(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const value = {
    habits,
    loading,
    error,
    stats,
    fetchHabits,
    logHabit,
    fetchStats,
    fetchGlobalStats
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}; 