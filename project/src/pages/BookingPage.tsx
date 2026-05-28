import { useState, useEffect, MouseEvent } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Gift,
  Car,
  RotateCcw,
  Eye, // ✅ Import Eye icon
  X,     // ✅ Import X icon for modal close
} from "lucide-react";

// Using relative paths
import SeatSelection from "../components/Booking/SeatSelection";
import SpinWheel from "../components/Booking/SpinWheel";
import RideBooking from "../components/Booking/RideBooking";
import BookingSummary from "../components/Booking/BookingSummary";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";

const steps = [
  { id: 1, name: "Select Seats", icon: Users },
  { id: 2, name: "Spin & Win", icon: Gift },
  { id: 3, name: "Book Ride", icon: Car },
  { id: 4, name: "Payment", icon: Calendar },
];

interface Seat {
  id: string;
  [key: string]: any;
}

interface MovieData {
  id: number;
  title: string;
  poster: string;
  duration: string;
  rating: string;
}

interface ShowData {
  id: number;
  theatre: string;
  date: string;
  time: string;
  price: number;
}

const movieData: Record<number, MovieData> = {
  1: {
    id: 1,
    title: "Guardians of the Galaxy Vol. 3",
    poster:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=2",
    duration: "2h 30m",
    rating: "8.2",
  },
  101: {
    id: 101,
    title: "Leo",
    poster:
      "https://tse2.mm.bing.net/th/id/OIP.ICRA3sUB82O-EFXTmIyDWgHaEK?pid=Api&h=220&P=0",
    duration: "2h 44m",
    rating: "8.1",
  },
  401: {
    id: 401,
    title: "RRR",
    poster:
      "https://tse2.mm.bing.net/th/id/OIP.XVR_QjxIEn5T-QlxinJZdwHaJQ?pid=Api&h=220&P=0",
    duration: "3h 7m",
    rating: "8.8",
  },
  501: {
    id: 501,
    title: "Pathaan",
    poster:
      "https://tse3.mm.bing.net/th/id/OIP.3dErbj2pyzbYY-7_GA91PwHaJ4?pid=Api&h=220&P=0",
    duration: "2h 26m",
    rating: "7.8",
  },
};

const showData: Record<number, ShowData> = {
  1: {
    id: 1,
    theatre: "PVR Cinemas - Mall Road",
    date: "Today, Jan 15",
    time: "6:00 PM",
    price: 200,
  },
};

export default function BookingPage() {
  const { movieId, showId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user: _user } = useAuth();
  const { selectedSeats, clearSelection } = useBooking() as {
    selectedSeats: Seat[];
    clearSelection: () => void;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [movie, setMovie] = useState<any>(null);
  const [show, setShow] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [discount, setDiscount] = useState(0);
  const [rideDetails, setRideDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- START: 360° MODAL & DRAG STATE ---
  const [is360ModalOpen, setIs360ModalOpen] = useState(false); // ✅ Controls modal visibility
  const [isDragging, setIsDragging] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [startX, setStartX] = useState(0);
  // --- END: 360° MODAL & DRAG STATE ---

  useEffect(() => {
    const movieData1 = movieData[parseInt(movieId || "1")] || movieData[1];
    const showData1 = showData[parseInt(showId || "1")] || showData[1];
    const time = searchParams.get("time") || "6:00 PM";

    setMovie(movieData1);
    setShow(showData1);
    setSelectedTime(time);
    setIsLoading(false);
  }, [movieId, showId, searchParams]);

  const handleSpinComplete = (discountAmount: number) => {
    setDiscount(discountAmount);
    setTimeout(() => setCurrentStep(3), 1500);
  };

  const handleRideBooked = (ride: any) => {
    setRideDetails(ride);
    setCurrentStep(4);
  };

  const handleBookingComplete = () => {
    alert("Booking confirmed! Check your email for tickets.");
    navigate("/profile");
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedSeats.length > 0;
      case 2:
        return discount >= 0;
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  // --- START: IMAGE SWITCHING LOGIC ---
  // This logic now determines the image for the MODAL
  const seatImages: Record<string, string> = {
    front: "/seat.jpeg",
    back: "/seat.jpeg",
    default: "/seat.jpeg",
  };

  const lastSelectedSeatId =
    selectedSeats.length > 0
      ? selectedSeats[selectedSeats.length - 1].id
      : "default";

  const seatRow = lastSelectedSeatId.charAt(0).toUpperCase();
  let imgSrc = seatImages.default;

  if (["A", "B", "C", "D"].includes(seatRow)) {
    imgSrc = seatImages.front;
  } else if (["E", "F", "G", "H", "I", "J"].includes(seatRow)) {
    imgSrc = seatImages.back;
  }

  const finalImageSrc = encodeURI(imgSrc);
  // --- END: IMAGE SWITCHING LOGIC ---

  // --- START: 360° DRAG HANDLERS ---
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX - positionX);
    (e.currentTarget as HTMLDivElement).style.cursor = "grabbing";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const newX = e.clientX - startX;
    setPositionX(newX);
  };

  const handleMouseUpOrLeave = (e: MouseEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLDivElement).style.cursor = "grab";
  };

  // Reset image position when modal opens OR image src changes
  useEffect(() => {
    if (is360ModalOpen) {
      setPositionX(0);
    }
  }, [finalImageSrc, is360ModalOpen]);
  // --- END: 360° DRAG HANDLERS ---


  if (isLoading || !movie || !show) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span>{show.theatre}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-yellow-400" />
                  <span>{show.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <span>{selectedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Navigation */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                          isActive
                            ? "bg-yellow-400 border-yellow-400 text-gray-900"
                            : isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="ml-3 hidden md:block">
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-yellow-400"
                              : isCompleted
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {step.name}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-px mx-4 ${
                            isCompleted ? "bg-green-500" : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-gray-800 rounded-lg p-6">
              {currentStep === 1 && (
                <div>
                  {/* --- ✅ HEADER WITH 360° VIEW BUTTON --- */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Select Your Seats
                    </h2>
                    <button
                      onClick={() => setIs360ModalOpen(true)} // Opens the modal
                      className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>360° View</span>
                    </button>
                  </div>
                  {/* --- END HEADER --- */}

                  {/* --- ✅ SEAT SELECTION (now full width) --- */}
                  <div>
                    <SeatSelection showId={showId} />
                  </div>
                  {/* --- END SEAT SELECTION --- */}
                  
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Spin the Wheel for Discounts!
                  </h2>
                  <SpinWheel onSpinComplete={handleSpinComplete} />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Book Your Ride (Optional)
                  </h2>
                  <RideBooking
                    destination={show.theatre}
                    movieTime={selectedTime}
                    onRideBooked={handleRideBooked}
                    onSkip={() => setCurrentStep(4)}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Payment & Confirmation
                  </h2>
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Payment Options
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          className="text-yellow-400"
                          defaultChecked
                        />
                        <span className="ml-2 text-gray-300">
                          Credit/Debit Card
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          className="text-yellow-400"
                        />
                        <span className="ml-2 text-gray-300">UPI</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          className="text-yellow-400"
                        />
                        <span className="ml-2 text-gray-300">Net Banking</span>
                      </label>
                    </div>
                    <button
                      onClick={handleBookingComplete}
                      className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg mt-6 hover:bg-yellow-500 transition-colors"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                  } else {
                    clearSelection();
                    navigate(`/movie/${movieId}`);
                  }
                }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{currentStep > 1 ? "Previous" : "Back to Movie"}</span>
              </button>

              {currentStep < 4 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNext()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    canProceedToNext()
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {currentStep === 3 ? "Skip & Continue" : "Next"}
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              movie={movie}
              show={show}
              selectedTime={selectedTime}
              selectedSeats={selectedSeats}
              discount={discount}
              rideDetails={rideDetails}
            />
          </div>
        </div>
      </div>

      {/* --- ✅ START 360° VIEW MODAL (POP-UP) --- */}
      {is360ModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIs360ModalOpen(false)} // Close modal on overlay click
        >
          <div 
            className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                360° Seat View
              </h3>
              <button 
                onClick={() => setIs360ModalOpen(false)} // Close button
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body (The 360° Viewer) */}
            <div
              key={finalImageSrc}
              className="w-full h-[60vh]" // Set a good height for the modal
              style={{
                backgroundImage: `url(${finalImageSrc})`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "auto 100%", // Fit image height
                backgroundPositionX: `${positionX}px`,
                cursor: "grab",
                userSelect: "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            />
          </div>
        </div>
      )}
      {/* --- END 360° VIEW MODAL --- */}
    </div>
  );
}