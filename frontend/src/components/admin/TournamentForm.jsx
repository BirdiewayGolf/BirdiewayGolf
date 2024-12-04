// src/components/admin/TournamentForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Trophy, Clock, ClipboardList } from "lucide-react";
import { toast } from 'react-toastify';
import { useTournament } from '../../hooks/useTournament';
import './TournamentForm.css';

const TournamentForm = () => {
  const navigate = useNavigate();
  const { createTournament, loading, error: hookError } = useTournament();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    league: '',  // Changed from type to league
    date: '',
    startTime: '',
    location: '', 
    format: '',
    description: '',
    entryFee: '',
    maxPlayers: '',
    registrationDeadline: '',
    // Optional fields
    prizeDistribution: '',
    rules: '',
    handicapRequirements: '',
    courseName: '',
    courseAddress: '',
    contactEmail: '',
    contactPhone: '',
    includedInEntry: '',
    cancellationPolicy: '',
    weatherPolicy: '',
    scoringMethod: '',
    schedule: '',
    equipmentRules: '',
    dresscode: '',
    foodAndBeverage: '',
    practiceRounds: '',
    specialNotes: '',
    sponsorshipDetails: '',
    status: 'upcoming'
  });

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      toast.error('Please login to create a tournament');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        toast.error('Please login to create a tournament');
        return;
      }

      // Convert numeric fields and dates
      const processedData = {
        ...formData,
        entryFee: parseFloat(formData.entryFee),
        maxPlayers: parseInt(formData.maxPlayers),
        date: new Date(formData.date),
        registrationDeadline: new Date(formData.registrationDeadline)
      };

      console.log('Submitting data:', processedData);

      await createTournament(processedData);
      toast.success('Tournament created successfully!');
      navigate('/admin/tournaments');
    } catch (err) {
      console.error('Detailed error response:', err.response?.data);
      const errorMessage = err.response?.data?.errors 
        ? Object.entries(err.response.data.errors).map(([key, value]) => `${key}: ${value}`).join(', ')
        : err.response?.data?.message || 'Error creating tournament';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Tournament</h2>

          {(error || hookError) && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {typeof (error || hookError) === 'object' 
                ? JSON.stringify(error || hookError) 
                : (error || hookError)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    League
                  </label>
                  <select
                    name="league"
                    value={formData.league}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select League</option>
                    <option value="business">Business League</option>
                    <option value="amateur">Amateur League</option>
                    <option value="junior">Junior League</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Tournament Location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Address
                  </label>
                  <input
                    type="text"
                    name="courseAddress"
                    value={formData.courseAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

{/* Tournament Format & Rules */}
<div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Format & Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select Format</option>
                    <option value="Stroke Play">Stroke Play</option>
                    <option value="Scramble">Scramble</option>
                    <option value="Best Ball">Best Ball</option>
                    <option value="Match Play">Match Play</option>
                    <option value="Modified Stableford">Modified Stableford</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scoring Method
                  </label>
                  <input
                    type="text"
                    name="scoringMethod"
                    value={formData.scoringMethod}
                    onChange={handleChange}
                    placeholder="e.g., Gross Score, Net Score, Points"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Handicap Requirements
                  </label>
                  <input
                    type="text"
                    name="handicapRequirements"
                    value={formData.handicapRequirements}
                    onChange={handleChange}
                    placeholder="e.g., Maximum handicap 24"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Rules
                  </label>
                  <input
                    type="text"
                    name="equipmentRules"
                    value={formData.equipmentRules}
                    onChange={handleChange}
                    placeholder="Any specific equipment requirements"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Registration & Fees */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Registration & Fees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entry Fee ($)
                  </label>
                  <input
                    type="number"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Players
                  </label>
                  <input
                    type="number"
                    name="maxPlayers"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Included in Entry Fee
                  </label>
                  <input
                    type="text"
                    name="includedInEntry"
                    value={formData.includedInEntry}
                    onChange={handleChange}
                    placeholder="e.g., Cart, Range Balls, Lunch"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

{/* Prize Information */}
<div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Prize Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prize Distribution
                </label>
                <textarea
                  name="prizeDistribution"
                  value={formData.prizeDistribution}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Detail the prizes and their distribution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Schedule
                  </label>
                  <textarea
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detailed schedule of tournament day"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rules & Regulations
                  </label>
                  <textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cancellation Policy
                  </label>
                  <textarea
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detail the cancellation and refund policy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weather Policy
                  </label>
                  <textarea
                    name="weatherPolicy"
                    value={formData.weatherPolicy}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Weather conditions and rescheduling policy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>


{/* Contact Information */}
<div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/tournaments')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Tournament'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TournamentForm;