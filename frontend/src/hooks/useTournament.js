// src/hooks/useTournament.js
import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const useTournament = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTournament = async (tournamentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/admin/tournaments', tournamentData);
      toast.success(`Tournament successfully created for ${tournamentData.league} league!`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create tournament';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTournament
  };
};