import { Carousel } from "@/components/ui/carousel";
import React, { useState } from "react";

const SuitcaseLock = () => {
  const [combination, setCombination] = useState([0, 0, 0]);
  const correctCombination = [3, 7, 2]; // Example combination for testing

  const handleSlideChange = (index, value) => {
    const newCombination = [...combination];
    newCombination[index] = value;
    setCombination(newCombination);
  };

  const isUnlocked = combination.every(
    (val, index) => val === correctCombination[index]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Suitcase Lock - Correct Combination: {correctCombination.join("")}
      </h1>
      <div className="flex space-x-4">
        {[0, 1, 2].map((index) => (
          <Carousel
            key={index}
            className="w-24 h-48"
            orientation="vertical"
            slidesToShow={3}
            initialSlide={0}
            wrapAround={true}
            onSlideChange={(value) => handleSlideChange(index, value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((num) => (
              <div
                key={num}
                className="flex items-center justify-center h-full"
              >
                <div
                  className={`text-4xl font-bold ${
                    num === combination[index]
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {num}
                </div>
              </div>
            ))}
          </Carousel>
        ))}
      </div>
      <div className="mt-8">
        {isUnlocked ? (
          <p className="text-green-500 text-lg font-semibold">Unlocked!</p>
        ) : (
          <p className="text-red-500 text-lg font-semibold">Locked</p>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <SuitcaseLock />;
}
