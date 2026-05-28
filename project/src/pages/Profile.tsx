import React, { useState } from 'react';
import { User, Star, Gift, Clock, Ticket, Bot, MessageCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const coupons = [
  { id: 1, title: '20% OFF Weekend Shows', code: 'WEEKEND20', expires: '2024-01-31', type: 'discount' },
  { id: 2, title: 'Free Large Popcorn', code: 'POPCORN', expires: '2024-01-25', type: 'freebie' },
  { id: 3, title: '₹50 OFF on Next Booking', code: 'SAVE50', expires: '2024-02-15', type: 'discount' },
  { id: 4, title: 'Complimentary Drink', code: 'DRINK', expires: '2024-01-20', type: 'freebie' }
];

const bookingHistory = [
  {
    id: 1,
    movie: 'Guardians of the Galaxy Vol. 3',
    date: '2024-01-10',
    time: '6:00 PM',
    seats: ['H5', 'H6'],
    amount: 400,
    status: 'completed',
    canCancel: false
  },
  {
    id: 2,
    movie: 'Spider-Man: Across the Spider-Verse',
    date: '2024-01-08',
    time: '9:30 PM',
    seats: ['F3'],
    amount: 200,
    status: 'completed',
    canCancel: false
  },
  {
    id: 3,
    movie: 'The Flash',
    date: '2024-01-20',
    time: '7:00 PM',
    seats: ['D4', 'D5'],
    amount: 360,
    status: 'upcoming',
    canCancel: true
  }
];

const recommendations = [
  { id: 1, title: 'Oppenheimer', reason: 'Based on your interest in Drama', confidence: 92 },
  { id: 2, title: 'John Wick: Chapter 4', reason: 'You loved action movies', confidence: 88 },
  { id: 3, title: 'Mission: Impossible', reason: 'Similar to your recent bookings', confidence: 85 }
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hi! I\'m your CineEase assistant. How can I help you today?' }
  ]);

  const calculateRefund = (booking) => {
    const showDate = new Date(booking.date);
    const today = new Date();
    const daysUntilShow = Math.ceil((showDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilShow >= 7) return booking.amount * 0.9; // 90% refund
    if (daysUntilShow >= 3) return booking.amount * 0.7; // 70% refund
    if (daysUntilShow >= 1) return booking.amount * 0.5; // 50% refund
    return 0; // No refund same day
  };

  const handleCancelBooking = (bookingId) => {
    const booking = bookingHistory.find(b => b.id === bookingId);
    const refund = calculateRefund(booking);
    const confirmed = window.confirm(
      `Cancel this booking? You'll receive a refund of ₹${refund} (processing fee may apply).`
    );
    if (confirmed) {
      alert('Booking cancelled successfully! Refund will be processed in 3-5 business days.');
    }
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = { type: 'user', message: chatMessage };
    setChatHistory([...chatHistory, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(chatMessage);
      setChatHistory(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
    
    setChatMessage('');
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return 'You can cancel upcoming bookings from your profile. Refunds are processed based on cancellation timing: 90% if 7+ days before, 70% if 3-7 days, 50% if 1-3 days.';
    }
    if (lowerMessage.includes('seat') || lowerMessage.includes('booking')) {
      return 'For seat-related queries, you can view our interactive seat map during booking. Need help with a specific booking? Please share your booking ID.';
    }
    if (lowerMessage.includes('movie') || lowerMessage.includes('recommend')) {
      return 'Based on your viewing history, I recommend checking out our Action and Sci-Fi sections. Would you like personalized recommendations?';
    }
    return 'Thanks for your question! For specific assistance, please contact our support team or visit our help center.';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Ticket },
    { id: 'coupons', label: 'Coupons & Offers', icon: Gift },
    { id: 'recommendations', label: 'For You', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-gray-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
              <p className="text-blue-100">{user?.email}</p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user?.loyaltyPoints}</p>
                  <p className="text-blue-200 text-sm">Loyalty Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{bookingHistory.length}</p>
                  <p className="text-blue-200 text-sm">Total Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{coupons.length}</p>
                  <p className="text-blue-200 text-sm">Active Coupons</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">This Month</p>
                      <p className="text-2xl font-bold text-white">3 Movies</p>
                    </div>
                    <Ticket className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Total Spent</p>
                      <p className="text-2xl font-bold text-white">₹2,150</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Member Since</p>
                      <p className="text-2xl font-bold text-white">Dec 2023</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Booked tickets for The Flash - Jan 20, 7:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Earned 40 loyalty points from last booking</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>New coupon added: FREE POPCORN</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">My Bookings</h2>
              
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{booking.movie}</h3>
                        <div className="flex items-center space-x-4 text-gray-300 mt-2">
                          <span>{booking.date}</span>
                          <span>{booking.time}</span>
                          <span>Seats: {booking.seats.join(', ')}</span>
                        </div>
                        <p className="text-yellow-400 font-semibold mt-2">₹{booking.amount}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'completed' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {booking.status}
                        </span>
                        
                        {booking.canCancel && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Cancel
                            <div className="text-xs mt-1">
                              Refund: ₹{calculateRefund(booking)}
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Coupons & Offers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg text-gray-900 relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-2">{coupon.title}</h3>
                      <div className="bg-white/20 rounded px-3 py-1 inline-block mb-2">
                        <span className="font-mono font-bold">{coupon.code}</span>
                      </div>
                      <p className="text-sm opacity-80">Expires: {coupon.expires}</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">How to Earn More Coupons</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book 3 movies in a month to get a 15% off coupon</li>
                  <li>• Refer friends and get free snack coupons</li>
                  <li>• Rate movies after watching to earn loyalty points</li>
                  <li>• Join our loyalty program for exclusive offers</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">AI Recommendations For You</h2>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Bot className="h-5 w-5" />
                  <span className="text-sm">Powered by RoBERTa AI</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                        <p className="text-gray-300 mt-1">{rec.reason}</p>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-gray-600 rounded-full h-2 mr-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" 
                              style={{ width: `${rec.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-400">{rec.confidence}% match</span>
                        </div>
                      </div>
                      <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors ml-4">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-900/30 border border-purple-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">How Our AI Works</h3>
                <p className="text-gray-300 text-sm">
                  Our recommendation system uses advanced machine learning to analyze your viewing patterns, 
                  preferences, and similar user behaviors to suggest movies you'll love. The more you watch, 
                  the smarter our recommendations become!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chatbot */}
        {showChatbot && (
          <div className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-purple-400" />
                <span className="font-semibold text-white">CineEase Assistant</span>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-sm ${
                    chat.type === 'user' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-400 focus:outline-none"
                />
                <button
                  onClick={sendChatMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chatbot Button */}
        <button
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-4 right-4 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all transform hover:scale-110 ${
            showChatbot ? 'hidden' : 'flex'
          } items-center justify-center z-50`}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}