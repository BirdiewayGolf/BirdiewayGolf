import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiService } from '../../../services/api';

const BusinessRegistrationForm = ({ tournament, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    players: [{ name: '', email: '', phone: '' }],
    companyName: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...formData.players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setFormData({ ...formData, players: newPlayers });
  };

  const addPlayer = () => {
    if (formData.players.length < 4) {
      setFormData({
        ...formData,
        players: [...formData.players, { name: '', email: '', phone: '' }]
      });
    }
  };

  const removePlayer = (index) => {
    const newPlayers = formData.players.filter((_, i) => i !== index);
    setFormData({ ...formData, players: newPlayers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.registrationService.submitBusinessRegistration(
        tournament._id,
        formData
      );
      toast.success('Registration submitted successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Team Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>
      </div>

      {/* Players */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Players</h3>
          {formData.players.length < 4 && (
            <button
              type="button"
              onClick={addPlayer}
              className="text-emerald-600 hover:text-emerald-700"
            >
              + Add Player
            </button>
          )}
        </div>

        {formData.players.map((player, index) => (
          <div key={index} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Player {index + 1}</h4>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={player.name}
                  onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={player.email}
                  onChange={(e) => handlePlayerChange(index, 'email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={player.phone}
                  onChange={(e) => handlePlayerChange(index, 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </form>
  );
};

export default BusinessRegistrationForm;