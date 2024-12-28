import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export function RegistrationCancel() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Cancelled</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your registration was not completed. No payment has been processed.
          </p>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              If you experienced any issues or have questions, please don't hesitate to contact us.
            </p>
            
            <div className="space-x-4">
              <Link
                to="/"
                className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Return Home
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}