import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";

const NumberCarousel = ({ numbers, currentNumber, onChange }) => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-16 h-48"
      onSelect={(index) => onChange(numbers[index])}
    >
      <CarouselContent>
        {numbers.map((number) => (
          <CarouselItem
            key={number}
            className="flex items-center justify-center"
          >
            <div
              className={`text-4xl font-bold ${
                number === currentNumber ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {number}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Lock = ({ correctCombination }) => {
  const [combination, setCombination] = useState([0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    if (JSON.stringify(combination) === JSON.stringify(correctCombination)) {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, [combination, correctCombination]);

  const handleNumberChange = (index, number) => {
    const newCombination = [...combination];
    newCombination[index] = number;
    setCombination(newCombination);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Suitcase Lock</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          {combination.map((number, index) => (
            <NumberCarousel
              key={index}
              numbers={numbers}
              currentNumber={number}
              onChange={(newNumber) => handleNumberChange(index, newNumber)}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          {isUnlocked ? (
            <div className="text-green-500 font-bold text-xl">Unlocked!</div>
          ) : (
            <div className="text-red-500 font-bold text-xl">Locked</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const correctCombination = [4, 2, 7];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Correct Combination: {correctCombination.join("-")}
      </h1>
      <Lock correctCombination={correctCombination} />
    </div>
  );
}
