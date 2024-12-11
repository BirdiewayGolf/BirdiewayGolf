import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import HeroSlider from '../../components/layout/HeroSlider';
import Footer from '../../components/layout/Footer';

const Home = () => {
  const tournamentCategories = [
    {
      title: 'Business League',
      image: '/src/assets/b.jpeg',
      description: 'Network and compete with other professionals',
      link: '/tournaments/business',
    },
    {
      title: 'Junior League',
      image: '/src/assets/jun.jpg',
      description: 'Develop skills and make friends',
      link: '/tournaments/junior',
    },
    {
      title: 'Long Day Tournament',
      image: '/src/assets/long.jpg',
      description: 'Challenge yourself with extended play',
      link: '/tournaments/longday',
    },
    {
      title: 'Fundraiser Golf Tournaments',
      image: '/src/assets/fund.jpeg',
      description: 'Let us make your fundraisers easier',
      link: '/tournaments/fundraisers',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSlider />

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Welcome to Birdieway Golf</h2>
            <div className="prose prose-lg mx-auto mb-8">
              <p className="text-gray-600">
                At Birdieway Golf, we're passionate about bringing the golf community together
                through premier tournaments and leagues. Whether you're a business professional
                looking to network, a junior golfer developing your skills, or someone who loves
                the challenge of a full day of golf, we have something for everyone.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Tournament Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tournamentCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-lg transition-all"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    to={category.link}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    View Tournaments →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
