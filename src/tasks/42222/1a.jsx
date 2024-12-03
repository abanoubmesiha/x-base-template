import { Carousel } from "@/components/ui/carousel";
import React, { useState } from "react";

const NumberCarousel = ({ onSelect }) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Carousel className="w-1/3 sm:w-full">
      {numbers.map((num) => (
        <div
          key={num}
          onClick={() => onSelect(num)}
          className="flex items-center justify-center h-20 cursor-pointer"
        >
          <div className="text-4xl font-bold">{num}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default function App() {
  const [code, setCode] = useState(["", "", ""]);
  const [isLocked, setIsLocked] = useState(true);

  const handleNumberSelect = (index, number) => {
    const newCode = [...code];
    newCode[index] = number;
    setCode(newCode);
  };

  const checkCode = () => {
    if (code.join("") === "123") {
      // Example code, can be changed
      setIsLocked(false);
    } else {
      alert("Incorrect code. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-2xl mb-6 font-semibold">
        {isLocked ? "Enter the Code to Unlock" : "Unlocked!"}
      </div>
      <div className="flex space-x-4 mb-6 sm:flex-col sm:space-x-0 sm:space-y-4">
        {code.map((num, index) => (
          <NumberCarousel
            key={index}
            onSelect={(number) => handleNumberSelect(index, number)}
          />
        ))}
      </div>
      <div className="text-center text-4xl font-bold mb-6">
        {code.map((num, idx) => (
          <span key={idx} className="mx-2">
            {num === "" ? "?" : num}
          </span>
        ))}
      </div>
      <button
        onClick={checkCode}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        disabled={code.includes("") || !isLocked}
      >
        {isLocked ? "Unlock" : "Lock Again"}
      </button>
    </div>
  );
}
