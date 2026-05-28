import React, { useState, useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";

/**
 * NOTE:
 * - We intentionally avoid naming our local types `Seat`/`Show` to prevent conflicts
 *   with similarly-named types elsewhere in your codebase.
 * - When interacting with the booking context we don't assume its internal types;
 *   we cast to `any` at the callsite so TypeScript stops complaining about the
 *   "two Seat types" problem you hit.
 */

type SeatCategory = "regular" | "premium" | "vip";

/* local types (unique names to avoid collisions) */
interface LocalSeat {
  id: string;
  // make number tolerant: other parts of your app may use number | string
  number: string | number;
  row: string;
  category: SeatCategory;
  price: number;
  isAvailable: boolean;
  isLocked?: boolean;
  isSelected?: boolean;
}

interface LocalShow {
  id: string;
  name?: string;
  seats: LocalSeat[];
}

const seatTypes: Record<
  SeatCategory,
  { color: string; price: number; label: string }
> = {
  regular: { color: "bg-gray-600", price: 150, label: "Regular" },
  premium: { color: "bg-blue-600", price: 200, label: "Premium" },
  vip: { color: "bg-purple-600", price: 300, label: "VIP" },
};

interface SeatSelectionProps {
  showId: string;
}

export default function SeatSelection({ showId }: SeatSelectionProps) {
  // keep using the booking context as-is — but treat selectedSeats etc. as unknown/any
  const { selectedSeats, selectSeat, deselectSeat, getShow } = useBooking();

  const [show, setShow] = useState<LocalShow | null>(null);

  useEffect(() => {
    // getShow may return a differently-typed object in your app; cast safely
    const showData = getShow(showId) as LocalShow | undefined;
    if (showData) setShow(showData);
  }, [showId, getShow]);

  const handleSeatClick = (seat: LocalSeat) => {
    if (!seat.isAvailable || seat.isLocked) return;

    if (seat.isSelected) {
      // deselectSeat may expect a different Seat type; cast to any
      (deselectSeat as any)(seat.id);
    } else {
      // selectedSeats could be typed elsewhere; treat as any[] here
      const selected = (selectedSeats as any[]) || [];
      if (selected.length < 10) {
        (selectSeat as any)(seat);
      }
    }
  };

  if (!show) return <div>Loading seats...</div>;

  // Group seats by row
  const rows: Record<string, LocalSeat[]> = {};
  show.seats.forEach((seat) => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  // treat selectedSeats as any[] for safe consumption here
  const selected = (selectedSeats as any[]) || [];

  return (
    <div className="space-y-6">
      {/* Selected Seat Count */}
      <div className="flex items-center justify-end mb-4">
        <div className="text-sm text-gray-400">
          Selected: {selected.length}/10
        </div>
      </div>

      {/* Screen */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 px-20 py-2 rounded-t-3xl">
          <span className="text-white font-semibold">SCREEN</span>
        </div>
      </div>

      {/* Seat Map */}
      <div className="space-y-3">
        {Object.entries(rows).map(([rowLetter, rowSeats]) => (
          <div
            key={rowLetter}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-gray-400 font-semibold w-4 text-center">
              {rowLetter}
            </span>

            <div className="flex space-x-1">
              {rowSeats.map((seat: LocalSeat) => {
                const isSelected = selected.some((s: any) => s.id === seat.id);
                const seatType = seatTypes[seat.category];

                return (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.isAvailable || seat.isLocked}
                    className={`
                      w-8 h-8 rounded-lg border-2 text-xs font-semibold transition-all duration-200 transform
                      ${
                        !seat.isAvailable
                          ? "bg-red-600 border-red-600 cursor-not-allowed"
                          : seat.isLocked
                          ? "bg-orange-500 border-orange-500 cursor-not-allowed"
                          : isSelected
                          ? "bg-yellow-400 border-yellow-400 text-gray-900 scale-110 shadow-lg"
                          : `${seatType.color} border-transparent hover:border-yellow-400 hover:scale-105 cursor-pointer`
                      }
                    `}
                    title={`${seat.id} - ₹${seat.price} ${
                      !seat.isAvailable
                        ? "(Occupied)"
                        : seat.isLocked
                        ? "(Locked)"
                        : `(${seatType.label})`
                    }`}
                  >
                    {/* render number robustly */}
                    {String(seat.number)}
                  </button>
                );
              })}
            </div>

            <span className="text-gray-400 font-semibold w-4 text-center">
              {rowLetter}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 p-4 bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded border-2"></div>
          <span className="text-gray-300 text-sm">Regular (₹150)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded border-2"></div>
          <span className="text-gray-300 text-sm">Premium (₹200)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600 rounded border-2"></div>
          <span className="text-gray-300 text-sm">VIP (₹300)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded border-2"></div>
          <span className="text-gray-300 text-sm">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded border-2"></div>
          <span className="text-gray-300 text-sm">Occupied</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selected.length > 0 && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Selected Seats:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map((seat: any) => (
              <span
                key={seat.id}
                className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-sm font-medium"
              >
                {seat.id} (₹{seat.price})
              </span>
            ))}
          </div>
          <p className="text-yellow-400 font-semibold mt-2">
            Total: ₹
            {selected.reduce(
              (total: number, seat: any) => total + Number(seat.price || 0),
              0
            )}
          </p>
        </div>
      )}
    </div>
  );
}
