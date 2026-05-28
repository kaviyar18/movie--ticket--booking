import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, MapPin, Sparkles } from 'lucide-react';

const featuredMovies = [
  {
    id: 101,
    title: "Leo",
    rating: 8.1,
    genre: "Action, Thriller",
    duration: "2h 44m",
    poster: "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
    backdrop: "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
    language: "Tamil"
  },
  {
    id: 401,
    title: "RRR",
    rating: 8.8,
    genre: "Action, Drama",
    duration: "3h 7m",
    poster: "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
    backdrop: "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
    language: "Telugu"
  },
  {
    id: 501,
    title: "Pathaan",
    rating: 7.8,
    genre: "Action, Thriller",
    duration: "2h 26m",
    poster: "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
    backdrop: "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
    language: "Hindi"
  }
];

const nowPlaying = [
  {
    id: 301,
    title: "KGF Chapter 2",
    rating: 8.4,
    poster: "https://tse3.mm.bing.net/th/id/OIP.SNlMa5icTqeqdprKNg3oGQHaJ4?pid=Api&h=220&P=0",
    language: "Kannada"
  },
  {
    id: 201,
    title: "2018",
    rating: 8.7,
    poster: "https://tse1.mm.bing.net/th/id/OIP.2y0YuBl0fAW9nb0g2xYgqgHaEK?pid=Api&h=220&P=0",
    language: "Malayalam"
  },
  {
    id: 102,
    title: "Jailer",
    rating: 7.8,
    poster: "https://tse3.mm.bing.net/th/id/OIP.cuUtoSmLU7_EwTMABPoejgHaLm?pid=Api&h=220&P=0",
    language: "Tamil"
  },
  {
    id: 502,
    title: "Jawan",
    rating: 7.2,
    poster: "https://tse1.mm.bing.net/th/id/OIP.OUgVw4DqsTFaG0G714LJKQHaJ4?pid=Api&h=220&P=0",
    language: "Hindi"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${featuredMovies[0].backdrop})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">Now Playing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {featuredMovies[0].title}
            </h1>
            
            <div className="flex items-center space-x-6 mb-6 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{featuredMovies[0].rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{featuredMovies[0].duration}</span>
              </div>
              <span>{featuredMovies[0].genre}</span>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience the ultimate cinematic adventure with stunning visuals, 
              immersive sound, and unforgettable storytelling that will keep you 
              on the edge of your seat.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to={`/movie/${featuredMovies[0].id}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Book Now
              </Link>
              <Link
                to="/movies"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                View All Movies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Movies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
            <Link 
              to="/movies" 
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <Link to={`/movie/${movie.id}`}>
                  <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform group-hover:scale-105">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{movie.rating}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{movie.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Now Playing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Now Playing</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {nowPlaying.map((movie) => (
              <Link 
                key={movie.id} 
                to={`/movie/${movie.id}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform group-hover:scale-105">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{movie.rating}</span>
                      <span className="text-yellow-400 text-xs ml-2">• {movie.language}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose CineEase?</h2>
            <p className="text-gray-300 text-lg">Experience movies like never before</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Prime Locations</h3>
              <p className="text-gray-300">Premium theaters in the heart of the city with easy accessibility</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Experience</h3>
              <p className="text-gray-300">State-of-the-art sound systems and crystal-clear projection</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Booking</h3>
              <p className="text-gray-300">Quick and hassle-free ticket booking with instant confirmation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}