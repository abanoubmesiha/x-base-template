import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

const ClockFace = ({ time, isFlipped }) => {
  const hourDegrees = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const secondDegrees = time.getSeconds() * 6;

  return (
    <div
      className={`relative w-64 h-64 rounded-full ${
        isFlipped ? "hidden" : "block"
      }`}
    >
      <div className="absolute inset-0 bg-gray-200 rounded-full shadow-inner"></div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 bg-gray-600"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${i * 30}deg) translateY(-31px)`,
          }}
        ></div>
      ))}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-16 bg-black origin-bottom"
        style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-0.5 h-24 bg-black origin-bottom"
        style={{ transform: `translateX(-50%) rotate(${minuteDegrees}deg)` }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-red-500 origin-bottom"
        style={{ transform: `translateX(-50%) rotate(${secondDegrees}deg)` }}
      ></div>
    </div>
  );
};

const ClockBack = ({ isFlipped, onAdjust }) => {
  return (
    <div
      className={`relative w-64 h-64 rounded-full ${
        isFlipped ? "block" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-300 rounded-full shadow-inner"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          className="w-24 h-24 rounded-full bg-gray-400 hover:bg-gray-500 focus:outline-none"
          onClick={onAdjust}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAdjust = () => {
    const newTime = new Date(time.getTime() + 60000); // Add 1 minute
    setTime(newTime);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="relative w-64 h-64 cursor-pointer" onClick={handleFlip}>
          <ClockFace time={time} isFlipped={isFlipped} />
          <ClockBack isFlipped={isFlipped} onAdjust={handleAdjust} />
        </div>
      </Card>
    </div>
  );
}
