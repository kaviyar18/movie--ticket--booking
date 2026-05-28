import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import BookingPage from "./pages/BookingPage";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Chatbot from "./components/Chatbot";
import SeatView360 from "./pages/SeatView360"; // ✅ Import new 360 page

function AppContent() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/booking/:movieId/:showId"
          element={user ? <BookingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />

        {/* ✅ New 360° Seat View Route */}
        <Route
          path="/seatview/:seat"
          element={user ? <SeatView360 /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* ✅ Floating chatbot */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <AppContent />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
