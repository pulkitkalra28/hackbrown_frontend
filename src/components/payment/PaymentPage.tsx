import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

type PaymentState = {
  eventId: string;
  eventName: string;
  ticketCount: number;
  totalPrice: number;
};

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName, ticketCount, totalPrice } = location.state as PaymentState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    // For now, just redirect to bookings page
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-24">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
            <Lock className="w-6 h-6 text-gray-400" />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Event</span>
                <span className="text-gray-900">{eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets</span>
                <span className="text-gray-900">{ticketCount}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Pay ${totalPrice}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}