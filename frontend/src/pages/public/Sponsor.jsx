import React from 'react';
import { Link } from 'react-router-dom';

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-emerald-700 mb-6">Sponsorship Opportunities</h1>
          <p className="text-lg text-gray-700 mb-8">
            Become a sponsor of BirdieWay Golf and showcase your brand at our prestigious tournaments.
            Supporting our events gives you a unique opportunity to connect with golfers, families, and
            communities across all three leagues.
          </p>

          <div className="space-y-6">
            {/* Title Sponsor */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-emerald-600">Title Sponsor </h2>
              <ul className="mt-4 text-gray-600 space-y-2 list-disc pl-6">
                <li>Your name as part of BirdieWay branding (e.g., "BirdieWay by [Sponsor Name]")</li>
                <li>Tournament naming rights for all three leagues</li>
                <li>Prominent signage/banner placement at all tournaments</li>
                <li>Featured social media post across BirdieWay platforms</li>
              </ul>
            </div>

            {/* Gold Sponsor */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-emerald-600">Gold Sponsor</h2>
              <ul className="mt-4 text-gray-600 space-y-2 list-disc pl-6">
                <li>Tournament naming rights for one league</li>
                <li>Signage/banner placement at all tournaments across three leagues</li>
                <li>Opportunity to set up a booth at any tournament</li>
                <li>Featured social media post across BirdieWay platforms</li>
              </ul>
            </div>

            {/* Silver Sponsor */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-emerald-600">Silver Sponsor </h2>
              <ul className="mt-4 text-gray-600 space-y-2 list-disc pl-6">
                <li>Signage/banner placement at every tournament across all three leagues</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 bg-emerald-50 p-6 rounded-lg shadow-inner text-center">
            <h3 className="text-xl font-semibold text-emerald-700 mb-4">Interested in Sponsoring?</h3>
            <p className="text-gray-600 mb-6">
              For inquiries or to become a sponsor, please send us a message using our contact form. We
              look forward to partnering with you!
            </p>
            <Link
              to="/contact"
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg 
                hover:bg-emerald-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
