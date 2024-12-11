import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Helper function for safe date formatting
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

const TournamentForm = ({ initialData, onSubmit, isEditing }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    league: 'business',
    date: '',
    location: '',
    price: '',
    description: '',
    schedule: {
      startTime: '',
      checkInTime: '',
      format: ''
    },
    sponsorInfo: {
      name: '',
      website: ''
    },
    additionalDetails: {
      food: {
        included: false,
        details: ''
      },
      cancelationPolicy: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      try {
        setFormData({
          ...initialData,
          date: formatDateForInput(initialData.date),
          schedule: {
            startTime: initialData.schedule?.startTime || '',
            checkInTime: initialData.schedule?.checkInTime || '',
            format: initialData.schedule?.format || ''
          },
          sponsorInfo: {
            name: initialData.sponsorInfo?.name || '',
            website: initialData.sponsorInfo?.website || ''
          },
          additionalDetails: {
            food: {
              included: initialData.additionalDetails?.food?.included || false,
              details: initialData.additionalDetails?.food?.details || ''
            },
            cancelationPolicy: initialData.additionalDetails?.cancelationPolicy || ''
          }
        });
      } catch (error) {
        console.error('Error setting form data:', error);
        toast.error('Error loading tournament data');
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formattedData = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : undefined,
        price: formData.price ? parseFloat(formData.price) : undefined
      };

      setLoading(true);
      await onSubmit(formattedData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.response?.data?.message || 'Error saving tournament');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg shadow-md p-6">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tournament Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">League</label>
            <select
              name="league"
              value={formData.league}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            >
              <option value="business">Business League</option>
              <option value="junior">Junior League</option>
              <option value="fundraiser">Fundraiser</option>
              <option value="longday">Long Day Tournament</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tournament Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Entry Fee ($)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Schedule Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={formData.schedule.startTime}
              onChange={(e) => handleNestedChange('schedule', 'startTime', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in Time</label>
            <input
              type="time"
              value={formData.schedule.checkInTime}
              onChange={(e) => handleNestedChange('schedule', 'checkInTime', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tournament Format</label>
            <input
              type="text"
              value={formData.schedule.format}
              onChange={(e) => handleNestedChange('schedule', 'format', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Scramble, Best Ball, etc."
            />
          </div>
        </div>
      </div>

      {/* Sponsor Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Sponsor Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sponsor Name</label>
            <input
              type="text"
              value={formData.sponsorInfo.name}
              onChange={(e) => handleNestedChange('sponsorInfo', 'name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sponsor Website</label>
            <input
              type="url"
              value={formData.sponsorInfo.website}
              onChange={(e) => handleNestedChange('sponsorInfo', 'website', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Additional Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
            <textarea
              value={formData.additionalDetails.cancelationPolicy}
              onChange={(e) => handleNestedChange('additionalDetails', 'cancelationPolicy', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
              rows="3"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="foodIncluded"
                checked={formData.additionalDetails.food.included}
                onChange={(e) => handleNestedChange('additionalDetails', 'food', {
                  ...formData.additionalDetails.food,
                  included: e.target.checked
                })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="foodIncluded" className="text-sm font-medium text-gray-700">
                Food/Beverages Included
              </label>
            </div>
            {formData.additionalDetails.food.included && (
              <textarea
                value={formData.additionalDetails.food.details}
                onChange={(e) => handleNestedChange('additionalDetails', 'food', {
                  ...formData.additionalDetails.food,
                  details: e.target.value
                })}
                placeholder="Describe food and beverages provided..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500"
                rows="2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => navigate('/admin/tournaments')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? (
            <span>Saving...</span>
          ) : (
            <span>{isEditing ? 'Update Tournament' : 'Create Tournament'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default TournamentForm;