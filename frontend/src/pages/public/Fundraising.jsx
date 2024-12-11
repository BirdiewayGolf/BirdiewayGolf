import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
// Import image directly
import fundraisingImage from '../../assets/f.jpg';

const Fundraising = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={fundraisingImage}
          alt="Fundraising"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl text-white font-bold">
              Host Your Golf Fundraiser
            </h1>
          </div>
        </div>
      </div>

      {/* Fundraising Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Let Us Handle Everything</h2>
          <p className="text-gray-600 mb-8">
            At Birdieway Golf, we specialize in hosting successful golf fundraisers. 
            From booking courses to securing sponsors and managing payments, we ensure 
            every detail is taken care of. Whether it's a corporate event or a charity 
            drive, our experienced team will make your event seamless and memorable.
          </p>

          <ul className="text-left space-y-4 mx-auto mb-8">
            <li className="flex items-center">
              <span className="text-emerald-600 mr-2">✓</span>
              Course booking and event logistics
            </li>
            <li className="flex items-center">
              <span className="text-emerald-600 mr-2">✓</span>
              Sponsorship acquisition and management
            </li>
            <li className="flex items-center">
              <span className="text-emerald-600 mr-2">✓</span>
              Payment processing and sign-up management
            </li>
            <li className="flex items-center">
              <span className="text-emerald-600 mr-2">✓</span>
              Marketing and promotional support
            </li>
          </ul>

          <Link
            to="/contact"
            className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors gap-2"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Fundraising;