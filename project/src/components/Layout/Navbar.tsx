import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white">
            <Film className="h-8 w-8 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CineEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/movies"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/movies') 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Movies
              </Link>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin') 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Movies
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}