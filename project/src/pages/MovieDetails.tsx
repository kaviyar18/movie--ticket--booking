import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  MapPin,
  Play,
  Share,
  Heart,
} from "lucide-react";

const movieData = {
  1: {
    id: 1,
    title: "Guardians of the Galaxy Vol. 3",
    rating: 8.2,
    genre: "Action, Adventure, Comedy",
    duration: "2h 30m",
    language: "English",
    releaseDate: "May 5, 2023",
    poster:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=2",
    backdrop:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2",
    description:
      "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Karen Gillan"],
    trailer: "https://www.youtube.com/watch?v=u3V5KDHRQvk",
  },
  101: {
    id: 101,
    title: "Leo",
    rating: 8.1,
    genre: "Action, Thriller",
    duration: "2h 44m",
    language: "Tamil",
    releaseDate: "Jan 20, 2024",
    poster:
      "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
    backdrop:
      "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
    description:
      "A thrilling action-packed movie that follows the journey of Leo, a man caught in a web of violence and betrayal. With stunning cinematography and powerful performances, this Tamil blockbuster delivers edge-of-your-seat entertainment.",
    director: "Lokesh Kanagaraj",
    cast: ["Vijay", "Trisha", "Sanjay Dutt", "Arjun Sarja"],
    trailer: "https://www.youtube.com/watch?v=Po3jStA673E",
  },
  401: {
    id: 401,
    title: "RRR",
    rating: 8.8,
    genre: "Action, Drama",
    duration: "3h 7m",
    language: "Telugu",
    releaseDate: "Mar 25, 2022",
    poster:
      "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
    backdrop:
      "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
    description:
      "A fictional story about two legendary revolutionaries away from home before they began fighting for their country in the 1920s. An epic tale of friendship, sacrifice, and the fight for freedom.",
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
    trailer: "https://www.youtube.com/watch?v=f_vbAtFSEc0",
  },
  501: {
    id: 501,
    title: "Pathaan",
    rating: 7.8,
    genre: "Action, Thriller",
    duration: "2h 26m",
    language: "Hindi",
    releaseDate: "Jan 25, 2023",
    poster:
      "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
    backdrop:
      "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
    description:
      "An exiled RAW agent partners with his former colleague to stop a rogue agent from acquiring a deadly weapon. High-octane action sequences and international espionage make this a thrilling watch.",
    director: "Siddharth Anand",
    cast: [
      "Shah Rukh Khan",
      "Deepika Padukone",
      "John Abraham",
      "Dimple Kapadia",
    ],
    trailer: "https://www.youtube.com/watch?v=vqu4z34wENw",
  },
};

const shows = [
  {
    id: 1,
    date: "Today",
    times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:30 PM"],
    theatre: "PVR Cinemas - Mall Road",
    price: "₹200",
  },
  {
    id: 2,
    date: "Tomorrow",
    times: ["11:00 AM", "2:30 PM", "7:00 PM", "10:30 PM"],
    theatre: "PVR Cinemas - Mall Road",
    price: "₹200",
  },
  {
    id: 3,
    date: "Jan 17",
    times: ["12:00 PM", "3:30 PM", "8:00 PM"],
    theatre: "INOX - City Center",
    price: "₹250",
  },
];

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // In a real app, fetch movie data from API
    const movieId = parseInt(id);
    setMovie(movieData[movieId] || movieData[1]);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Movie Poster */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-80 h-auto rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button className="bg-yellow-400 text-gray-900 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>

                <div className="flex items-center space-x-6 mb-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <span className="text-xl font-semibold">
                      {movie.rating}/10
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{movie.releaseDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.genre}
                  </span>
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    {movie.language}
                  </span>
                </div>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {movie.description}
                </p>

                <div className="flex items-center space-x-4 mb-8">
                  <button className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      isLiked
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>

                  <button className="p-3 rounded-lg border-2 border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                    <Share className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Director:</span>
                    <p className="text-white font-semibold">{movie.director}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Cast:</span>
                    <p className="text-white font-semibold">
                      {movie.cast.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Times */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Show Times</h2>

          <div className="space-y-6">
            {shows.map((show) => (
              <div key={show.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {show.theatre}
                    </h3>
                    <div className="flex items-center text-gray-400 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Mall Road, Sector 21</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-semibold">
                      {show.price}
                    </p>
                    <p className="text-gray-400 text-sm">Per ticket</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-gray-400 text-sm">{show.date}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {show.times.map((time, index) => (
                    <Link
                      key={index}
                      to={`/booking/${movie.id}/${
                        show.id
                      }?time=${encodeURIComponent(time)}`}
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors font-medium"
                    >
                      {time}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
