import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Search, Globe } from 'lucide-react';

// Language-wise movie data with latest releases
const moviesByLanguage = {
  tamil: [
    {
      id: 101,
      title: "Leo",
      rating: 8.1,
      genre: "Action",
      duration: "2h 44m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
      language: "Tamil",
      releaseDate: "2024-01-20"
    },
    {
      id: 102,
      title: "Jailer",
      rating: 7.8,
      genre: "Action",
      duration: "2h 48m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.cuUtoSmLU7_EwTMABPoejgHaLm?pid=Api&h=220&P=0",
      language: "Tamil",
      releaseDate: "2024-01-18"
    },
    {
      id: 103,
      title: "Vikram",
      rating: 8.4,
      genre: "Action",
      duration: "2h 54m",
      poster: "https://tse1.mm.bing.net/th/id/OIP.P7vaIPtEqf5Lujiiw75SigHaLH?pid=Api&h=220&P=0",
      language: "Tamil",
      releaseDate: "2024-01-15"
    },
    {
      id: 104,
      title: "Beast",
      rating: 6.9,
      genre: "Action",
      duration: "2h 35m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.xchimidZy_sp633O4JmtXwHaLQ?pid=Api&h=220&P=0",
      language: "Tamil",
      releaseDate: "2024-01-12"
    },
    {
      id: 105,
      title: "Varisu",
      rating: 7.2,
      genre: "Drama",
      duration: "2h 49m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.C9h4gTmY97lxVq3m0pHQCQHaJ4?pid=Api&h=220&P=0",
      language: "Tamil",
      releaseDate: "2024-01-10"
    }
  ],
  malayalam: [
    {
      id: 201,
      title: "2018",
      rating: 8.7,
      genre: "Drama",
      duration: "2h 20m",
      poster: "https://tse1.mm.bing.net/th/id/OIP.2y0YuBl0fAW9nb0g2xYgqgHaEK?pid=Api&h=220&P=0",
      language: "Malayalam",
      releaseDate: "2024-01-19"
    },
    {
      id: 202,
      title: "Minnal Murali",
      rating: 7.8,
      genre: "Action",
      duration: "2h 38m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.U4EKcZmwLaI5FtyTi-sbVQHaJv?pid=Api&h=220&P=0",
      language: "Malayalam",
      releaseDate: "2024-01-17"
    },
    {
      id: 203,
      title: "Drishyam 2",
      rating: 8.3,
      genre: "Thriller",
      duration: "2h 32m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.QcdujfhKcyKLsjz-Id38zwHaLF?pid=Api&h=220&P=0",
      language: "Malayalam",
      releaseDate: "2024-01-14"
    },
    {
      id: 204,
      title: "Kumbakonam Gopals",
      rating: 7.5,
      genre: "Comedy",
      duration: "2h 15m",
      poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=2",
      language: "Malayalam",
      releaseDate: "2024-01-11"
    },
    {
      id: 205,
      title: "Bheeshma Parvam",
      rating: 7.9,
      genre: "Action",
      duration: "2h 24m",
      poster: "https://tse4.mm.bing.net/th/id/OIP.FRjZA8jXykoR3xM81_Xh_wHaEK?pid=Api&h=220&P=0",
      language: "Malayalam",
      releaseDate: "2024-01-08"
    }
  ],
  kannada: [
    {
      id: 301,
      title: "KGF Chapter 2",
      rating: 8.4,
      genre: "Action",
      duration: "2h 48m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.SNlMa5icTqeqdprKNg3oGQHaJ4?pid=Api&h=220&P=0",
      language: "Kannada",
      releaseDate: "2024-01-21"
    },
    {
      id: 302,
      title: "777 Charlie",
      rating: 8.7,
      genre: "Drama",
      duration: "2h 44m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.QUqMVahYpjfeh4Z-VVU-egHaD4?pid=Api&h=220&P=0",
      language: "Kannada",
      releaseDate: "2024-01-16"
    },
    {
      id: 303,
      title: "Kantara",
      rating: 8.2,
      genre: "Thriller",
      duration: "2h 28m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.wQiQQMUzwTo1DXZ0l_SGIgAAAA?pid=Api&h=220&P=0",
      language: "Kannada",
      releaseDate: "2024-01-13"
    },
    {
      id: 304,
      title: "Vikrant Rona",
      rating: 7.1,
      genre: "Mystery",
      duration: "2h 27m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.os22Uyb5rpPIx-BgYaTNLgHaLH?pid=Api&h=220&P=0",
      language: "Kannada",
      releaseDate: "2024-01-09"
    },
    {
      id: 305,
      title: "Garuda Gamana Vrishabha Vahana",
      rating: 8.1,
      genre: "Crime",
      duration: "2h 30m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.7oqoSzjMoTiUZqTFWIOY_wHaDn?pid=Api&h=220&P=0",
      language: "Kannada",
      releaseDate: "2024-01-06"
    }
  ],
  telugu: [
    {
      id: 401,
      title: "RRR",
      rating: 8.8,
      genre: "Action",
      duration: "3h 7m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
      language: "Telugu",
      releaseDate: "2024-01-22"
    },
    {
      id: 402,
      title: "Pushpa: The Rise",
      rating: 7.6,
      genre: "Action",
      duration: "2h 59m",
      poster: "https://tse4.mm.bing.net/th/id/OIP.zr9j3MVNm4TFFWBG7RpS3QHaFj?pid=Api&h=220&P=0",
      language: "Telugu",
      releaseDate: "2024-01-18"
    },
    {
      id: 403,
      title: "Ala Vaikunthapurramuloo",
      rating: 7.3,
      genre: "Drama",
      duration: "2h 45m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.bYdw4jgVFR8gJJFC2vf09wHaKd?pid=Api&h=220&P=0",
      language: "Telugu",
      releaseDate: "2024-01-15"
    },
    {
      id: 404,
      title: "Arjun Reddy",
      rating: 8.1,
      genre: "Romance",
      duration: "3h 2m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.4WiP8Xg-lCuuAr10yJGAEQHaIi?pid=Api&h=220&P=0",
      language: "Telugu",
      releaseDate: "2024-01-12"
    },
    {
      id: 405,
      title: "Baahubali 2",
      rating: 8.2,
      genre: "Action",
      duration: "2h 47m",
      poster: "https://tse1.mm.bing.net/th/id/OIP.fmuVdKJZTJQ4tjkXCVjb2AHaE-?pid=Api&h=220&P=0",
      language: "Telugu",
      releaseDate: "2024-01-07"
    }
  ],
  hindi: [
    {
      id: 501,
      title: "Pathaan",
      rating: 7.8,
      genre: "Action",
      duration: "2h 26m",
      poster: "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
      language: "Hindi",
      releaseDate: "2024-01-23"
    },
    {
      id: 502,
      title: "Jawan",
      rating: 7.2,
      genre: "Action",
      duration: "2h 49m",
      poster: "https://tse1.mm.bing.net/th/id/OIP.OUgVw4DqsTFaG0G714LJKQHaJ4?pid=Api&h=220&P=0",
      language: "Hindi",
      releaseDate: "2024-01-20"
    },
    {
      id: 503,
      title: "Gadar 2",
      rating: 7.0,
      genre: "Action",
      duration: "2h 50m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.DV5Zo8PINUaW23wBim6A9AHaJQ?pid=Api&h=220&P=0",
      language: "Hindi",
      releaseDate: "2024-01-17"
    },
    {
      id: 504,
      title: "Animal",
      rating: 6.8,
      genre: "Drama",
      duration: "3h 21m",
      poster: "https://tse4.mm.bing.net/th/id/OIP.NVvJErZHeVBrFA_Xg8BZNAHaLH?pid=Api&h=220&P=0",
      language: "Hindi",
      releaseDate: "2024-01-14"
    },
    {
      id: 505,
      title: "Tiger 3",
      rating: 7.4,
      genre: "Action",
      duration: "2h 35m",
      poster: "https://tse2.mm.bing.net/th/id/OIP.l715YH_h6sZXyytc6evAjQHaJ4?pid=Api&h=220&P=0",
      language: "Hindi",
      releaseDate: "2024-01-11"
    }
  ]
};

const genres = ["All", "Action", "Drama", "Comedy", "Thriller", "Romance", "Mystery", "Crime"];
const languages = ["All", "Tamil", "Malayalam", "Kannada", "Telugu", "Hindi"];

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("all"); // "all" or "language"

  // Flatten all movies for "all" view
  const allMovies = Object.values(moviesByLanguage).flat();

  const getFilteredMovies = () => {
    let movies = viewMode === "all" ? allMovies : moviesByLanguage[selectedLanguage.toLowerCase()] || [];
    
    return movies
      .filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "All" || movie.genre === selectedGenre) &&
        (selectedLanguage === "All" || movie.language === selectedLanguage)
      )
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "release") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        return 0;
      });
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Movies</h1>
          <p className="text-gray-300">Discover the latest blockbusters across multiple languages</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "all"
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Movies
          </button>
          <button
            onClick={() => setViewMode("language")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "language"
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Globe className="h-4 w-4 inline mr-2" />
            By Language
          </button>
        </div>

        {/* Language-wise View */}
        {viewMode === "language" && (
          <div className="space-y-12 mb-8">
            {Object.entries(moviesByLanguage).map(([language, movies]) => (
              <div key={language}>
                <h2 className="text-2xl font-bold text-white mb-6 capitalize flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-yellow-400" />
                  {language} Movies
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <Link 
                      key={movie.id} 
                      to={`/movie/${movie.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-80 object-cover"
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-white text-xs font-medium">{movie.rating}</span>
                          </div>
                        </div>
                        
                        {/* Language Badge */}
                        <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                          {movie.language}
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                        
                        {/* Movie Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                            {movie.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-300">
                            <span>{movie.genre}</span>
                            <span>{movie.duration}</span>
                          </div>
                        </div>

                        {/* Hover Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-yellow-400 text-gray-900 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Movies View with Filters */}
        {viewMode === "all" && (
          <>
            {/* Filters */}
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="rating">Rating</option>
                    <option value="title">Title</option>
                    <option value="release">Release Date</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-medium">{movie.rating}</span>
                      </div>
                    </div>
                    
                    {/* Language Badge */}
                    <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                      {movie.language}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Movie Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span>{movie.genre}</span>
                        <span>{movie.duration}</span>
                      </div>
                    </div>

                    {/* Hover Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-yellow-400 text-gray-900 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredMovies.length === 0 && (
              <div className="text-center py-16">
                <Filter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                <p className="text-gray-400">Try adjusting your search filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}