import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Trophy, Users, Target, Calendar } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="/src/assets/contact.jpg"
          alt="About Birdieway Golf"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold">About Birdieway Golf</h1>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-8">
              At Birdieway Golf, we aim to provide exceptional golf experiences tailored for businesses,
              junior golfers, and enthusiasts. We are committed to fostering community, inspiring talent,
              and creating opportunities to connect through the love of golf.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Fundraising Tournaments',
                description: 'We specialize in organizing impactful fundraising golf tournaments, making it easy to handle payments, book golf courses, and secure sponsorships, bringing communities together to support meaningful causes.',
              },
              {
                icon: Users,
                title: 'Junior Leagues',
                description: 'Our junior golf league provide a relaxed and enjoyable team environment where young players can compete, improve their skills, and grow their appreciation for the game.',
              },
              {
                icon: Calendar,
                title: 'Business Leagues',
                description: 'Our business leagues create the perfect platform for professionals to network, collaborate, and compete in a fun and relaxed environment.',
              },
              {
                icon: Target,
                title: 'Long-Day Tournament',
                description: 'From sunrise to sunset, our long-day tournament is designed for dedicated golf enthusiasts seeking an unforgettable challenge.',
              },
            ].map((activity, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <activity.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us</h2>
          <p className="text-gray-600 text-lg mb-8">
            Whether you're a business professional, a junior golfer, or a passionate player, Birdieway Golf
            has something special for you. Explore our leagues, participate in tournaments, and experience
            the best of golf with us.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
