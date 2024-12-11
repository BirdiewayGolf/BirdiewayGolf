import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Shield, Target, Users, Megaphone } from 'lucide-react';

const Sponsor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="/src/assets/sponsor.jpg"
          alt="Become a Sponsor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
              Become a Sponsor
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Partner with Birdieway Golf to showcase your brand and support the growth of golf in our community.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sponsor With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Brand Visibility',
                description: 'Feature your brand with banners at all tournaments and events.'
              },
              {
                icon: Target,
                title: 'Community Engagement',
                description: 'Help support junior golf leagues and business tournaments.'
              },
              {
                icon: Users,
                title: 'Networking Opportunities',
                description: 'Connect with businesses, community leaders, and golf enthusiasts.'
              },
              {
                icon: Megaphone,
                title: 'Exclusive Opportunities',
                description: 'Gain enhanced visibility through premium sponsorship levels.'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <benefit.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Levels Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Sponsorship Opportunities</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Join us as a sponsor and make a meaningful impact. Whether it’s banners at every event or naming rights for tournaments, we have opportunities to showcase your brand.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Platinum Sponsor',
                description: `
                  Receive exclusive naming rights for a tournament in both the Junior and Business leagues. Your brand will also be prominently displayed with banners at every tournament.
                `
              },
              {
                title: 'Gold Sponsor',
                description: `
                  Your brand will be showcased with banners at every tournament and league event. A great way to build recognition and engage with the community.
                `
              }
            ].map((level, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-center mb-4">{level.title}</h3>
                <p className="text-gray-600 text-center">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Sponsoring?</h2>
          <p className="text-gray-600 mb-8">
            Contact us to explore tailored sponsorship opportunities that align with your goals. We’re excited to partner with you!
          </p>
          <a
            href="mailto:birdiewaygolf@gmail.com"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsor;
