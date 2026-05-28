import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  isLocked: boolean;
  price: number;
  category: 'regular' | 'premium' | 'vip';
}

interface Show {
  id: string;
  movieId: string;
  time: string;
  date: string;
  theatre: string;
  seats: Seat[];
}

interface BookingContextType {
  selectedSeats: Seat[];
  selectSeat: (seat: Seat) => void;
  deselectSeat: (seatId: string) => void;
  clearSelection: () => void;
  lockSeats: (seatIds: string[]) => void;
  unlockSeats: (seatIds: string[]) => void;
  getShow: (showId: string) => Show | undefined;
  updateSeatAvailability: (showId: string, seatIds: string[], available: boolean) => void;
  shows: Show[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

interface BookingProviderProps {
  children: ReactNode;
}

// Generate mock seat data
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  rows.forEach((row, rowIndex) => {
    const seatsPerRow = rowIndex < 3 ? 8 : rowIndex < 7 ? 10 : 12;
    const category = rowIndex < 3 ? 'vip' : rowIndex < 7 ? 'premium' : 'regular';
    const basePrice = category === 'vip' ? 300 : category === 'premium' ? 200 : 150;
    
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        isAvailable: Math.random() > 0.3, // 70% availability
        isSelected: false,
        isLocked: false,
        price: basePrice,
        category
      });
    }
  });
  
  return seats;
};

export function BookingProvider({ children }: BookingProviderProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    // Initialize with mock shows
    const mockShows: Show[] = [
      {
        id: '1',
        movieId: '1',
        time: '10:00 AM',
        date: '2024-01-15',
        theatre: 'PVR Cinemas - Mall Road',
        seats: generateSeats()
      },
      {
        id: '2',
        movieId: '1',
        time: '1:30 PM',
        date: '2024-01-15',
        theatre: 'PVR Cinemas - Mall Road',
        seats: generateSeats()
      },
      {
        id: '3',
        movieId: '1',
        time: '6:00 PM',
        date: '2024-01-15',
        theatre: 'PVR Cinemas - Mall Road',
        seats: generateSeats()
      }
    ];
    setShows(mockShows);
  }, []);

  const selectSeat = (seat: Seat) => {
    if (!seat.isAvailable || seat.isLocked) return;
    
    setSelectedSeats(prev => [...prev, { ...seat, isSelected: true }]);
    
    // Update the seat in shows
    setShows(prev => prev.map(show => ({
      ...show,
      seats: show.seats.map(s => 
        s.id === seat.id ? { ...s, isSelected: true, isLocked: true } : s
      )
    })));
  };

  const deselectSeat = (seatId: string) => {
    setSelectedSeats(prev => prev.filter(seat => seat.id !== seatId));
    
    // Update the seat in shows
    setShows(prev => prev.map(show => ({
      ...show,
      seats: show.seats.map(s => 
        s.id === seatId ? { ...s, isSelected: false, isLocked: false } : s
      )
    })));
  };

  const clearSelection = () => {
    const seatIds = selectedSeats.map(seat => seat.id);
    setSelectedSeats([]);
    unlockSeats(seatIds);
  };

  const lockSeats = (seatIds: string[]) => {
    setShows(prev => prev.map(show => ({
      ...show,
      seats: show.seats.map(s => 
        seatIds.includes(s.id) ? { ...s, isLocked: true } : s
      )
    })));
  };

  const unlockSeats = (seatIds: string[]) => {
    setShows(prev => prev.map(show => ({
      ...show,
      seats: show.seats.map(s => 
        seatIds.includes(s.id) ? { ...s, isLocked: false, isSelected: false } : s
      )
    })));
  };

  const getShow = (showId: string) => {
    return shows.find(show => show.id === showId);
  };

  const updateSeatAvailability = (showId: string, seatIds: string[], available: boolean) => {
    setShows(prev => prev.map(show => 
      show.id === showId ? {
        ...show,
        seats: show.seats.map(s => 
          seatIds.includes(s.id) ? { ...s, isAvailable: available } : s
        )
      } : show
    ));
  };

  const value: BookingContextType = {
    selectedSeats,
    selectSeat,
    deselectSeat,
    clearSelection,
    lockSeats,
    unlockSeats,
    getShow,
    updateSeatAvailability,
    shows
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}