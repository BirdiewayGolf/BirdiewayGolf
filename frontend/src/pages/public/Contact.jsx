import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { apiService } from '../../services/api';

const Contact = () => {
  const location = useLocation();
  const tournamentInfo = location.state?.tournamentInfo;

  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: tournamentInfo ? `I'm interested in registering for the tournament: ${tournamentInfo.name}` : '',
      subject: tournamentInfo ? 'Tournament Registration Interest' : '',
      tournamentId: tournamentInfo?.id || '',
      tournamentName: tournamentInfo?.name || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await apiService.contact.submit(formData);
        
        if (response.data.success) {
          toast.success('Thank you for your message! We will contact you soon.');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            subject: '',
            tournamentId: '',
            tournamentName: ''
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {tournamentInfo && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 mb-6">
            <p className="text-emerald-800">
              Inquiring about: <span className="font-medium">{tournamentInfo.name}</span>
            </p>
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-emerald-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Contact Section */}
      <div className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-emerald-600 mb-4">
              Contact Us
            </h1>
            {/* Paragraph */}
            <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
            Interested in joining our golf league or need help organizing a fundraiser golf event? We’re here to assist! Whether you’re looking to host a tournament, collaborate on a charity event, or have general inquiries, our team is ready to make your experience smooth, enjoyable, and successful.
            </p>
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;