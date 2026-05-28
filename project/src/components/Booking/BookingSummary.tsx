import React from 'react';
import { Ticket, MapPin, Clock, Users, Gift, Car } from 'lucide-react';

export default function BookingSummary({ 
  movie, 
  show, 
  selectedTime, 
  selectedSeats, 
  discount, 
  rideDetails 
}) {
  const subtotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const discountAmount = Math.round((subtotal * discount) / 100);
  const rideTotal = rideDetails ? rideDetails.price : 0;
  const convenienceFee = Math.round(subtotal * 0.05); // 5% convenience fee
  const total = subtotal - discountAmount + rideTotal + convenienceFee;

  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Ticket className="h-6 w-6 mr-2 text-yellow-400" />
        Booking Summary
      </h3>
      
      {/* Movie Details */}
      <div className="space-y-3 mb-6">
        <div>
          <h4 className="font-semibold text-white">{movie.title}</h4>
          <p className="text-gray-400 text-sm">{movie.duration} | {movie.rating}/10</p>
        </div>
        
        <div className="flex items-center text-gray-300 text-sm">
          <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
          <span>{show.theatre}</span>
        </div>
        
        <div className="flex items-center text-gray-300 text-sm">
          <Clock className="h-4 w-4 mr-2 text-yellow-400" />
          <span>{show.date} | {selectedTime}</span>
        </div>
      </div>
      
      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 mr-2 text-yellow-400" />
            <span className="font-semibold text-white">Selected Seats</span>
          </div>
          <div className="space-y-2">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-300">{seat.id} ({seat.category})</span>
                <span className="text-white font-medium">₹{seat.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Ride Details */}
      {rideDetails && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Car className="h-5 w-5 mr-2 text-yellow-400" />
            <span className="font-semibold text-white">Ride Booking</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">{rideDetails.provider} {rideDetails.type}</span>
              <span className="text-white font-medium">₹{rideDetails.price}</span>
            </div>
            <p className="text-gray-400 text-xs">
              ETA: {rideDetails.eta} | ID: {rideDetails.bookingId}
            </p>
          </div>
        </div>
      )}
      
      {/* Pricing Breakdown */}
      <div className="border-t border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal ({selectedSeats.length} seats)</span>
          <span>₹{subtotal}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <div className="flex items-center">
              <Gift className="h-4 w-4 mr-1" />
              <span>Discount ({discount}%)</span>
            </div>
            <span>-₹{discountAmount}</span>
          </div>
        )}
        
        {rideDetails && (
          <div className="flex justify-between text-gray-300">
            <span>Ride Fare</span>
            <span>₹{rideTotal}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-300">
          <span>Convenience Fee</span>
          <span>₹{convenienceFee}</span>
        </div>
        
        <div className="border-t border-gray-600 pt-2 flex justify-between text-lg font-bold text-white">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      
      {/* Loyalty Points */}
      <div className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg text-center">
        <p className="text-white text-sm">
          🎉 Earn {Math.round(total / 10)} loyalty points with this booking!
        </p>
      </div>
      
      {/* Terms */}
      <div className="mt-4 text-xs text-gray-400">
        <p>• Tickets are non-transferable</p>
        <p>• Cancellation charges may apply</p>
        <p>• Please arrive 15 minutes before show time</p>
      </div>
    </div>
  );
}