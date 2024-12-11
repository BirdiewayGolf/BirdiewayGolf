import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { apiService } from '../../services/api';

const Contact = () => {
  const location = useLocation();
  const tournamentInfo = location.state?.tournamentInfo;

  const ContactForm = () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      message: tournamentInfo ? `I'm interested in registering for the tournament: ${tournamentInfo.name}` : '',
      subject: tournamentInfo ? 'Tournament Registration Interest' : '',
    });
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        // Prepare base submission data
        const submitData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        };

        // Handle phone number (optional with validation)
        if (formData.phone) {
          const cleanedPhone = formData.phone.trim().replace(/\D/g, '');
          if (cleanedPhone.length >= 7) {
            submitData.phone = formData.phone.trim();
          }
        }

        // Handle tournament info if present
        if (tournamentInfo) {
          if (tournamentInfo.id) submitData.tournamentId = tournamentInfo.id;
          if (tournamentInfo.name) submitData.tournamentName = tournamentInfo.name;
        }

        const response = await apiService.contact.submit(submitData);
        
        if (response.status === 200 || response.status === 201) {
          toast.success('Thank you for your message! We will contact you soon.');
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            subject: '',
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Extract error message from response
        const errorMessage = 
          error.response?.data?.message || 
          error.response?.data?.error || 
          'Failed to send message. Please try again.';
        toast.error(errorMessage);
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

    // Phone number validation helper
    const validatePhoneInput = (value) => {
      const cleanedPhone = value.replace(/\D/g, '');
      return cleanedPhone.length >= 7 || value === '';
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
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-gray-500">(Optional - Minimum 7 digits)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              if (validatePhoneInput(e.target.value)) {
                handleChange(e);
              }
            }}
            placeholder="(Optional) Enter at least 7 digits"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject*
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={5000}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-emerald-700'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        <p className="text-sm text-gray-500 text-center mt-2">
          * Required fields
        </p>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-center text-emerald-600 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-700 text-center text-sm sm:text-base mb-6">
              Have questions about golf tournaments or need help organizing a fundraiser golf event? We're here to assist! Whether you're looking to host a tournament, collaborate on a charity event, or simply have general inquiries, our team is ready to help make your experience a success.
            </p>
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