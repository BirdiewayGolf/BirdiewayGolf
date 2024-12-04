// src/pages/admin/EditTournament.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { tournamentService } from '../../services/api';
import './EditTournament.css';

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, tournamentName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Tournament</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{tournamentName}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Tournament
          </button>
        </div>
      </div>
    </div>
  );
};

const EditTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    date: '',
    location: '',
    format: '',
    entryFee: '',
    description: '',
    maxPlayers: '',
    status: '',
    registrationDeadline: '',
    startTime: '',
    courseName: '',
    courseAddress: '',
    handicapRequirements: '',
    prizeDistribution: '',
    rules: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const fetchTournament = async () => {
    try {
      const tournament = await tournamentService.getOne(id);
      const formattedData = {
        ...tournament,
        date: new Date(tournament.date).toISOString().split('T')[0],
        registrationDeadline: new Date(tournament.registrationDeadline).toISOString().split('T')[0],
        entryFee: Number(tournament.entryFee).toString(),
        maxPlayers: Number(tournament.maxPlayers).toString()
      };
      setFormData(formattedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tournament:', err);
      setError('Failed to fetch tournament details');
      setLoading(false);
      toast.error('Failed to load tournament');
    }
  };

  const handleDelete = async () => {
    try {
      await tournamentService.delete(id);
      toast.success('Tournament deleted successfully');
      navigate('/admin/tournaments');
    } catch (err) {
      console.error('Error deleting tournament:', err);
      toast.error('Failed to delete tournament');
      setShowDeleteModal(false);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'name', 'league', 'date', 'location', 'format', 
      'entryFee', 'description', 'maxPlayers', 'registrationDeadline'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (isNaN(formData.entryFee) || formData.entryFee < 0) {
      toast.error('Entry fee must be a valid number');
      return false;
    }

    if (isNaN(formData.maxPlayers) || formData.maxPlayers < 1) {
      toast.error('Maximum players must be a valid positive number');
      return false;
    }

    const tournamentDate = new Date(formData.date);
    const registrationDeadline = new Date(formData.registrationDeadline);

    if (registrationDeadline > tournamentDate) {
      toast.error('Registration deadline must be before tournament date');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        entryFee: parseFloat(formData.entryFee),
        maxPlayers: parseInt(formData.maxPlayers),
        date: new Date(formData.date).toISOString(),
        registrationDeadline: new Date(formData.registrationDeadline).toISOString()
      };

      await tournamentService.update(id, submitData);
      toast.success('Tournament updated successfully');
      navigate('/admin/tournaments');
    } catch (err) {
      console.error('Error updating tournament:', err);
      toast.error(err.response?.data?.message || 'Failed to update tournament');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="edit-tournament"><div className="loading">Loading tournament details...</div></div>;
  }

  if (error) {
    return (
      <div className="edit-tournament">
        <div className="error">
          {error}
          <button onClick={fetchTournament} className="text-emerald-600 hover:text-emerald-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-tournament">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2>Edit Tournament</h2>
          <button onClick={() => navigate('/admin/tournaments')} className="text-gray-600 hover:text-gray-800">
            Back to List
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="section">
            <h3>Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Tournament Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label>League *</label>
                <select
                  name="league"
                  value={formData.league}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select League</option>
                  <option value="business">Business League</option>
                  <option value="amateur">Amateur League</option>
                  <option value="junior">Junior League</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Registration Deadline *</label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="section">
            <h3>Location Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label>Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Course Address</label>
                <input
                  type="text"
                  name="courseAddress"
                  value={formData.courseAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tournament Details */}
          <div className="section">
            <h3>Tournament Details</h3>
            <div className="grid gap-6">
              <div>
                <label>Format *</label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Format</option>
                  <option value="Stroke Play">Stroke Play</option>
                  <option value="Match Play">Match Play</option>
                  <option value="Scramble">Scramble</option>
                  <option value="Best Ball">Best Ball</option>
                </select>
              </div>

              <div>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>

              <div>
                <label>Handicap Requirements</label>
                <textarea
                  name="handicapRequirements"
                  value={formData.handicapRequirements}
                  onChange={handleChange}
                  rows="2"
                />
              </div>

              <div>
                <label>Rules</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Registration & Prizes */}
          <div className="section">
            <h3>Registration & Prizes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Entry Fee * ($)</label>
                <input
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label>Maximum Players *</label>
                <input
                  type="number"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="md:col-span-2">
                <label>Prize Distribution</label>
                <textarea
                  name="prizeDistribution"
                  value={formData.prizeDistribution}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="section">
            <h3>Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="actions flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Tournament
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                className="cancel"
                onClick={() => navigate('/admin/tournaments')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          tournamentName={formData.name}
        />
      </div>
    </div>
  );
};

export default EditTournament;