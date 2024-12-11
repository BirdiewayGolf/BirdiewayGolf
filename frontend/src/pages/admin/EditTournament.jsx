import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';
import TournamentForm from '../../components/admin/TournamentForm';

const EditTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!id; // Check if we're editing (has ID) or creating (no ID)

  useEffect(() => {
    // Only fetch tournament data if we're editing
    if (isEditing) {
      fetchTournament();
    }
  }, [id]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      const response = await apiService.tournaments.getOne(id);
      setTournament(response.data);
    } catch (error) {
      console.error('Error fetching tournament:', error);
      toast.error('Failed to load tournament');
      navigate('/admin/tournaments');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      if (isEditing) {
        await apiService.tournaments.update(id, formData);
        toast.success('Tournament updated successfully');
      } else {
        await apiService.tournaments.create(formData);
        toast.success('Tournament created successfully');
      }
      navigate('/admin/tournaments');
    } catch (error) {
      console.error('Error saving tournament:', error);
      toast.error(error.response?.data?.message || 'Failed to save tournament');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading tournament...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Tournament' : 'Create Tournament'}
        </h1>
        
        <TournamentForm 
          initialData={tournament} 
          onSubmit={handleSave}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default EditTournament;