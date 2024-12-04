import React from 'react';
import { Trophy, Users, Star, Flag, Calendar, Award, Shield, Target } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-emerald-600" />,
      title: "Professional Tournaments",
      description: "Experience organized golf competitions across tailored leagues designed to match your goals and skill level."
    },
    {
      icon: <Calendar className="w-8 h-8 text-emerald-600" />,
      title: "Flexible Scheduling",
      description: "Participate in regular tournaments throughout the season, scheduled with convenience in mind."
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Fair Competition",
      description: "Enjoy a level playing field with structured divisions and a transparent handicap system."
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: "Performance Tracking",
      description: "Track your progress with detailed statistics and standings updated throughout the season."
    }
  ];

  const leagues = [
    {
      icon: <Users className="w-12 h-12 text-emerald-600" />,
      title: "Business League",
      description: "Where business meets the fairway. Network with professionals while competing in exclusive tournaments designed for corporate teams and relationship building.",
      details: [
        "Corporate team building",
        "Networking events",
        "Convenient scheduling",
        "Professional atmosphere"
      ]
    },
    {
      icon: <Flag className="w-12 h-12 text-emerald-600" />,
      title: "Birdieway Series",
      description: "Whether you're a weekend golfer or a seasoned enthusiast, the Birdieway Series offers exciting challenges like the Long Day Challenge and Collegiate Showcase.",
      details: [
        "Skill-based divisions",
        "Exciting tournament formats",
        "Seasonal leaderboards",
        "Championship events"
      ]
    },
    {
      icon: <Star className="w-12 h-12 text-emerald-600" />,
      title: "Junior League",
      description: "Empowering young golfers aged 8-18 through skill development, sportsmanship, and competition in a supportive and fun environment.",
      details: [
        "Age-appropriate divisions",
        "Skill-building programs",
        "Professional instruction",
        "Safe, inclusive atmosphere"
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              About BirdieWay
            </h1>
            <p className="text-xl text-emerald-50">
            BirdieWay brings the excitement of golf to life with fun, competitive, and professionally organized tournaments. Our inclusive programming and premier events create an unforgettable experience for golfers of all skill levels, creating both community and passion for the game.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-3 bg-emerald-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* League Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-16">Our Leagues</h2>
          <div className="space-y-16">
            {leagues.map((league, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8"
              >
                <div className="md:w-2/3">
                  <div className="mb-4">{league.icon}</div>
                  <h3 className="text-2xl font-serif mb-4">{league.title}</h3>
                  <p className="text-gray-600 mb-6">{league.description}</p>
                  <ul className="grid grid-cols-2 gap-4">
                    {league.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Shield className="w-4 h-4 text-emerald-600 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600">
            To deliver an exceptional golf tournament experience, promoting competition, camaraderie, and personal growth for golfers of all ages and skill levels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
