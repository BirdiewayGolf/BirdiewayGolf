import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiService } from '../../../services/api';

const JuniorRegistrationForm = ({ tournament, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    playerName: '',
    playerAge: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    golfExperience: '',
    handicap: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.registrationService.submitJuniorRegistration(
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
      {/* Player Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Player Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Player Name</label>
            <input
              type="text"
              name="playerName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.playerName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="playerAge"
              required
              min="5"
              max="18"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.playerAge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Golf Experience</label>
            <select
              name="golfExperience"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.golfExperience}
              onChange={handleChange}
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner (0-1 year)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="advanced">Advanced (3+ years)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Handicap (if any)</label>
            <input
              type="text"
              name="handicap"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.handicap}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Name</label>
            <input
              type="text"
              name="parentName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.parentName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Email</label>
            <input
              type="email"
              name="parentEmail"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.parentEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
            <input
              type="tel"
              name="parentPhone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.parentPhone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="emergencyContact.name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.emergencyContact.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="emergencyContact.phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <input
              type="text"
              name="emergencyContact.relationship"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={formData.emergencyContact.relationship}
              onChange={handleChange}
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

export default JuniorRegistrationForm;