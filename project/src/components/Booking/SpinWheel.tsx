import { useState } from "react";
import { Gift, Sparkles } from "lucide-react";

// Define a type for a single wheel segment
interface Segment {
  color: string;
  text: string;
  value: number;
}

// Define the type for the component's props
interface SpinWheelProps {
  onSpinComplete: (discountAmount: number) => void;
}

const wheelSegments: Segment[] = [
  // Added Segment[] type
  { color: "#FF6B6B", text: "10% OFF", value: 10 },
  { color: "#4ECDC4", text: "Free Popcorn", value: 0 },
  { color: "#45B7D1", text: "15% OFF", value: 15 },
  { color: "#96CEB4", text: "Free Drink", value: 0 },
  { color: "#FECA57", text: "20% OFF", value: 20 },
  { color: "#FF9FF3", text: "No Discount", value: 0 },
  { color: "#54A0FF", text: "25% OFF", value: 25 },
  { color: "#5F27CD", text: "Combo Offer", value: 5 },
];

// Add the props type here
export default function SpinWheel({ onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  // Give the 'result' state the correct type
  const [result, setResult] = useState<Segment | null>(null);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * wheelSegments.length);
    const segmentAngle = 360 / wheelSegments.length;
    // Added a small variance to the stop angle
    const randomAngleVariance = (Math.random() - 0.5) * (segmentAngle * 0.8);
    const randomRotation =
      1440 +
      randomIndex * segmentAngle +
      segmentAngle / 2 +
      randomAngleVariance;

    setRotation(randomRotation);

    setTimeout(() => {
      // The segment is determined by the final resting angle
      const actualIndex = Math.floor(randomIndex);
      const selectedSegment = wheelSegments[actualIndex];

      setResult(selectedSegment);
      setIsSpinning(false);
      setHasSpun(true);

      setTimeout(() => {
        // ✅ FIX: Check if onSpinComplete is a function before calling
        if (typeof onSpinComplete === "function") {
          onSpinComplete(selectedSegment.value);
        }
      }, 1500);
    }, 3000); // Corresponds to the transition duration
  };

  return (
    <div className="text-center space-y-6">
      <div className="relative mx-auto w-80 h-80">
        {/* Wheel */}
        <div
          className={`relative w-full h-full rounded-full border-8 border-yellow-400 transition-transform duration-[3000ms] ease-out-circ ${
            // Updated duration and ease
            isSpinning ? "animate-pulse" : ""
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${wheelSegments
              .map(
                (segment, index) =>
                  `${segment.color} ${
                    (index / wheelSegments.length) * 360
                  }deg ${((index + 1) / wheelSegments.length) * 360}deg`
              )
              .join(", ")})`,
          }}
        >
          {/* Segments Text */}
          {wheelSegments.map((segment, index) => (
            <div
              key={index}
              className="absolute text-white font-bold text-sm w-24 text-center"
              style={{
                // Center the text on the midpoint of the segment
                transform: `rotate(${
                  (index * 360) / wheelSegments.length +
                  360 / wheelSegments.length / 2
                }deg) translate(0, -100px) rotate(-90deg)`,
                transformOrigin: "center center",
                left: "50%",
                top: "50%",
                marginLeft: "-48px", // Half of the w-24
                marginTop: "-10px", // Half of text height (approx)
              }}
            >
              {segment.text}
            </div>
          ))}
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          {/* Simple triangle pointer */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "15px solid #fde047", // yellow-400
            }}
          ></div>
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-900 rounded-full border-4 border-yellow-400 flex items-center justify-center">
          <Gift className="h-6 w-6 text-yellow-400" />
        </div>
      </div>

      {/* Spin Button */}
      {!hasSpun && (
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform ${
            isSpinning
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:scale-105 active:scale-95"
          }`}
        >
          {isSpinning ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-white"></div>
              <span>Spinning...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Spin to Win!</span>
            </div>
          )}
        </button>
      )}

      {/* Result */}
      {result && ( // The type 'Segment | null' fixes the errors below
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 p-6 rounded-lg animate-bounce">
          <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
          <p className="text-lg font-semibold">You won: {result.text}</p>
          {result.value > 0 && (
            // This calculation is just a guess, update if needed
            <p className="text-sm mt-1">
              A {result.value}% discount will be applied!
            </p>
          )}
        </div>
      )}

      {!hasSpun && (
        <p className="text-gray-400 text-sm">
          Every user gets one free spin! Win discounts, free snacks, and more!
        </p>
      )}
    </div>
  );
}
