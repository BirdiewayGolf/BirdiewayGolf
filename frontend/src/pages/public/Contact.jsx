import React from 'react';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { sendContactMessage } from '../../services/api';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log('Form Data:', formData); // Debugging form data

    try {
      await sendContactMessage(formData); // Sends the data to the backend
      e.target.reset(); // Clears the form after successful submission
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
            <p className="text-xl text-emerald-50">
              Have questions about our tournaments? Get in touch with our team and we'll be happy to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:birdieway@gmail.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                      birdieway@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:8011111111" className="text-gray-600 hover:text-emerald-600 transition-colors">
                      (801) 111-1111
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Instagram className="w-6 h-6 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <a
                      href="https://instagram.com/birdieway"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      @birdieway
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600">Salt Lake City, Utah</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
