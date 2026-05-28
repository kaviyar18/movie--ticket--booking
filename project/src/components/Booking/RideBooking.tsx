import React, { useState } from 'react';
import { Car, MapPin, Clock, Navigation, Zap } from 'lucide-react';

const rideProviders = [
  {
    id: 'ola',
    name: 'Ola',
    logo: '🚗',
    options: [
      { type: 'Mini', price: 120, eta: '5 min', color: 'bg-green-600' },
      { type: 'Prime', price: 180, eta: '7 min', color: 'bg-blue-600' },
      { type: 'Auto', price: 80, eta: '3 min', color: 'bg-yellow-600' }
    ]
  },
  {
    id: 'uber',
    name: 'Uber',
    logo: '🚙',
    options: [
      { type: 'UberGo', price: 130, eta: '6 min', color: 'bg-black' },
      { type: 'UberX', price: 200, eta: '8 min', color: 'bg-gray-700' },
      { type: 'Auto', price: 85, eta: '4 min', color: 'bg-green-700' }
    ]
  },
  {
    id: 'rapido',
    name: 'Rapido',
    logo: '🏍️',
    options: [
      { type: 'Bike', price: 60, eta: '3 min', color: 'bg-red-600' },
      { type: 'Auto', price: 75, eta: '4 min', color: 'bg-orange-600' }
    ]
  }
];

export default function RideBooking({ destination, movieTime, onRideBooked, onSkip }) {
  const [selectedProvider, setSelectedProvider] = useState('ola');
  const [selectedRide, setSelectedRide] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('Current Location');
  const [isBooking, setIsBooking] = useState(false);
  const [showAIPredictor, setShowAIPredictor] = useState(false);

  const provider = rideProviders.find(p => p.id === selectedProvider);

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
  };

  const bookRide = async () => {
    if (!selectedRide) return;
    
    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const rideDetails = {
      provider: provider.name,
      type: selectedRide.type,
      price: selectedRide.price,
      eta: selectedRide.eta,
      pickupLocation,
      destination,
      bookingId: `${provider.id.toUpperCase()}${Date.now()}`
    };
    
    setIsBooking(false);
    onRideBooked(rideDetails);
  };

  const calculateOptimalTime = () => {
    // Mock AI prediction
    const travelTime = selectedRide ? parseInt(selectedRide.eta) + 25 : 30; // Add buffer time
    const movieDateTime = new Date();
    movieDateTime.setHours(parseInt(movieTime.split(':')[0]));
    movieDateTime.setMinutes(parseInt(movieTime.split(':')[1].split(' ')[0]));
    
    const leaveTime = new Date(movieDateTime.getTime() - (travelTime * 60000));
    
    return {
      leaveAt: leaveTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      travelTime: `${travelTime} min`,
      arrivalBuffer: '10 min early'
    };
  };

  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-400" />
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="flex-1 bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Destination */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-gray-300">
          <MapPin className="h-5 w-5 text-red-400" />
          <span className="font-medium">Destination: {destination}</span>
        </div>
      </div>

      {/* AI Time Predictor */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-white" />
            <span className="font-semibold text-white">AI Travel Predictor</span>
          </div>
          <button
            onClick={() => setShowAIPredictor(!showAIPredictor)}
            className="text-white hover:text-yellow-300 text-sm"
          >
            {showAIPredictor ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        {showAIPredictor && (
          <div className="space-y-2 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-200">Leave at:</span>
                <p className="font-semibold">{calculateOptimalTime().leaveAt}</p>
              </div>
              <div>
                <span className="text-gray-200">Travel time:</span>
                <p className="font-semibold">{calculateOptimalTime().travelTime}</p>
              </div>
              <div>
                <span className="text-gray-200">Buffer:</span>
                <p className="font-semibold">{calculateOptimalTime().arrivalBuffer}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Provider Selection */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {rideProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => {
              setSelectedProvider(provider.id);
              setSelectedRide(null);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedProvider === provider.id
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="text-lg">{provider.logo}</span>
            <span className="font-medium">{provider.name}</span>
          </button>
        ))}
      </div>

      {/* Ride Options */}
      <div className="space-y-3">
        {provider.options.map((ride, index) => (
          <div
            key={index}
            onClick={() => handleRideSelect(ride)}
            className={`bg-gray-700 p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-600 ${
              selectedRide === ride ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${ride.color}`}></div>
                <div>
                  <h3 className="text-white font-semibold">{ride.type}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{ride.eta}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">₹{ride.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={bookRide}
          disabled={!selectedRide || isBooking}
          className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
            selectedRide && !isBooking
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isBooking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-gray-900"></div>
              <span>Booking Ride...</span>
            </div>
          ) : (
            `Book ${selectedRide ? selectedRide.type : 'Ride'}`
          )}
        </button>
        
        <button
          onClick={onSkip}
          className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}