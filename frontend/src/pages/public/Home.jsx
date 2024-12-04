// src/pages/public/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../../components/layout/HeroSlider';
import { Trophy, Users, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const leagueInfo = [
    {
      title: "Business League",
      description: "Build professional connections while competing in dynamic golf tournaments. Ideal for corporate teams and building business relationships.",
      icon: <Trophy className="w-12 h-12 text-emerald-600" />,
      path: "/tournaments/business"
    },
    {
      title: "Birdieway Series",
      description: "Compete in our exciting Long Day Challenge or showcase your skills in the Collegiate Tournament, open to past, present, and future college golfers.",
      icon: <Users className="w-12 h-12 text-emerald-600" />,
      path: "/tournaments/amateur"
    },
    {
      title: "Junior League",
      description: "Develop skills and gain tournament experience in a supportive environment. Designed for young golfers aged 7-18.",
      icon: <Star className="w-12 h-12 text-emerald-600" />,
      path: "/tournaments/junior"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* About/How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              How BirdieWay Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our professional tournament platform designed for golfers of all levels.
              Experience organized competitions, track your progress, and be part of a
              growing golf community.
            </p>
          </div>

          {/* League Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {leagueInfo.map((league, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6">{league.icon}</div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">
                  {league.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {league.description}
                </p>
                <Link 
                  to={league.path}
                  className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
                >
                  Learn More 
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="text-center">
            <Link 
              to="/about"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg
                hover:bg-emerald-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Learn More About BirdieWay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;