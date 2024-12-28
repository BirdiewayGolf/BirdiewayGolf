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
          
          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold mb-2">Registration Details:</h2>
              <ul className="space-y-2 text-gray-600">
                <li>Amount Paid: ${paymentDetails.amount / 100}</li>
                <li>League: {paymentDetails.league}</li>
                <li>Email: {paymentDetails.email}</li>
              </ul>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            You will receive a confirmation email shortly with additional details about the league.
          </p>

          <div className="space-x-4">
            <Link
              to="/"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}