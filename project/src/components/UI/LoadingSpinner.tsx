import React from 'react';
import { Film } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Film className="h-16 w-16 text-yellow-400 mx-auto animate-bounce" />
          <div className="absolute inset-0 h-16 w-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="mt-4 text-lg text-gray-300">Loading CineMax...</p>
      </div>
    </div>
  );
}