import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function RegistrationSuccess() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch('/.netlify/functions/verify-payment', {
          method: 'POST',
          body: JSON.stringify({ sessionId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying registration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for registering with BirdieWay Golf. We're excited to have you join us!
          </p>
          
          {paymentDetails?.success && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-green-800 mb-4 border-b border-green-200 pb-3">
                  Payment Confirmation
                </h2>
                <div className="grid grid-cols-2 gap-4 text-green-700">
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <p className="text-sm font-medium text-green-600 mb-1">Amount Paid</p>
                    <p className="text-xl font-bold">${(paymentDetails.amount / 100).toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <p className="text-sm font-medium text-green-600 mb-1">League Type</p>
                    <p className="text-xl font-bold capitalize">{paymentDetails.league}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-inner col-span-2">
                    <p className="text-sm font-medium text-green-600 mb-1">Email</p>
                    <p className="text-lg">{paymentDetails.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Additional Information
                </h3>
                <p className="text-gray-600">
                  You will receive a confirmation email shortly with additional details about the league.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold shadow-md"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
