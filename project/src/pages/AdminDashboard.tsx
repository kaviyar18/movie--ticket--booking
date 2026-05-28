import React, { useState } from 'react';
import { BarChart, Users, Film, TrendingUp, Plus, Edit, Trash, DollarSign } from 'lucide-react';

const mockStats = {
  totalRevenue: 125000,
  totalBookings: 1250,
  totalUsers: 3200,
  activeMovies: 12,
  todayBookings: 45,
  todayRevenue: 8500
};

const mockMovies = [
  {
    id: 1,
    title: "Guardians of the Galaxy Vol. 3",
    genre: "Action",
    duration: "2h 30m",
    rating: 8.2,
    revenue: 45000,
    bookings: 450,
    status: "active"
  },
  {
    id: 2,
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation",
    duration: "2h 20m",
    rating: 8.8,
    revenue: 52000,
    bookings: 520,
    status: "active"
  }
];

const mockShows = [
  {
    id: 1,
    movieId: 1,
    movieTitle: "Guardians of the Galaxy Vol. 3",
    time: "6:00 PM",
    date: "2024-01-15",
    theatre: "PVR Mall Road",
    occupancy: 85,
    revenue: 1200
  },
  {
    id: 2,
    movieId: 2,
    movieTitle: "Spider-Man: Across the Spider-Verse",
    time: "9:30 PM",
    date: "2024-01-15",
    theatre: "PVR Mall Road",
    occupancy: 92,
    revenue: 1450
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    rating: '',
    poster: ''
  });

  const handleAddMovie = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log('Adding movie:', newMovie);
    setShowAddMovie(false);
    setNewMovie({
      title: '',
      genre: '',
      duration: '',
      rating: '',
      poster: ''
    });
    alert('Movie added successfully!');
  };

  const handleDeleteMovie = (movieId) => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      // In a real app, this would call backend API
      alert('Movie deleted successfully!');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your cinema operations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">₹{mockStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalBookings}</p>
              </div>
              <Film className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Active Movies</p>
                <p className="text-2xl font-bold text-white">{mockStats.activeMovies}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-200" />
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
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Today's Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Today's Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Bookings</span>
                        <span className="text-white font-semibold">{mockStats.todayBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Revenue</span>
                        <span className="text-white font-semibold">₹{mockStats.todayRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Avg. Occupancy</span>
                        <span className="text-white font-semibold">78%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Performing Shows</h3>
                    <div className="space-y-3">
                      {mockShows.slice(0, 3).map((show) => (
                        <div key={show.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium text-sm">{show.movieTitle}</p>
                            <p className="text-gray-400 text-xs">{show.time} | {show.theatre}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-yellow-400 font-semibold">{show.occupancy}%</p>
                            <p className="text-gray-400 text-xs">₹{show.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>New user registration: john.doe@email.com</span>
                    <span className="text-gray-500 text-sm">2 mins ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Booking confirmed: The Flash - 7:00 PM</span>
                    <span className="text-gray-500 text-sm">5 mins ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Show added: Oppenheimer - 10:30 PM</span>
                    <span className="text-gray-500 text-sm">15 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Movie Management</h2>
                <button
                  onClick={() => setShowAddMovie(true)}
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Movie</span>
                </button>
              </div>

              <div className="space-y-4">
                {mockMovies.map((movie) => (
                  <div key={movie.id} className="bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-300 mt-2">
                          <span>{movie.genre}</span>
                          <span>{movie.duration}</span>
                          <span>Rating: {movie.rating}/10</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            movie.status === 'active' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-red-900 text-red-300'
                          }`}>
                            {movie.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 mt-3">
                          <div>
                            <span className="text-gray-400 text-sm">Revenue: </span>
                            <span className="text-yellow-400 font-semibold">₹{movie.revenue.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Bookings: </span>
                            <span className="text-white font-semibold">{movie.bookings}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Movie Modal */}
              {showAddMovie && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                    <h3 className="text-xl font-bold text-white mb-4">Add New Movie</h3>
                    <form onSubmit={handleAddMovie} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Movie Title"
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Genre"
                        value={newMovie.genre}
                        onChange={(e) => setNewMovie({...newMovie, genre: e.target.value})}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2h 30m)"
                        value={newMovie.duration}
                        onChange={(e) => setNewMovie({...newMovie, duration: e.target.value})}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                        required
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Rating (1-10)"
                        value={newMovie.rating}
                        onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                        required
                        min="1"
                        max="10"
                      />
                      <input
                        type="url"
                        placeholder="Poster URL"
                        value={newMovie.poster}
                        onChange={(e) => setNewMovie({...newMovie, poster: e.target.value})}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                        required
                      />
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="flex-1 bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors"
                        >
                          Add Movie
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddMovie(false)}
                          className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">{mockStats.totalUsers}</p>
                  <p className="text-gray-400">Total Users</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-400">245</p>
                  <p className="text-gray-400">Active This Week</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-400">89</p>
                  <p className="text-gray-400">New This Month</p>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">john.doe@email.com</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm">Active</p>
                      <p className="text-gray-400 text-xs">Last booking: 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-white font-medium">Sarah Smith</p>
                      <p className="text-gray-400 text-sm">sarah.smith@email.com</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 text-sm">VIP Member</p>
                      <p className="text-gray-400 text-xs">12 bookings this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Revenue Trends</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[65, 80, 92, 88, 95, 78, 85].map((height, index) => (
                      <div key={index} className="flex-1 bg-yellow-400 rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Popular Genres</h3>
                  <div className="space-y-3">
                    {[
                      { genre: 'Action', percentage: 35 },
                      { genre: 'Drama', percentage: 25 },
                      { genre: 'Comedy', percentage: 20 },
                      { genre: 'Animation', percentage: 15 },
                      { genre: 'Thriller', percentage: 5 }
                    ].map((item) => (
                      <div key={item.genre}>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>{item.genre}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}