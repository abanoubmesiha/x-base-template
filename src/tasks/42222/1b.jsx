import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

const NUMBER_RANGE = Array.from({ length: 10 }, (_, i) => i);

const Carousel = ({ value, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = NUMBER_RANGE.length - 1;
    else if (newIndex >= NUMBER_RANGE.length) newIndex = 0;
    setCurrentIndex(newIndex);
    onChange(NUMBER_RANGE[newIndex]);
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => handleChange(1)} className="mb-2">
        ↑
      </button>
      {NUMBER_RANGE.slice(currentIndex, currentIndex + 3).map((num, idx) => (
        <div
          key={num}
          className={`text-center ${idx === 1 ? "text-2xl font-bold" : ""}`}
        >
          {num}
        </div>
      ))}
      <button onClick={() => handleChange(-1)} className="mt-2">
        ↓
      </button>
    </div>
  );
};

const SuitcaseLock = () => {
  const [combination, setCombination] = useState([0, 0, 0]);
  const correctCombination = [3, 7, 5]; // Example combination

  const updateCombination = (index, value) => {
    setCombination((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const checkCombination = () => {
    if (JSON.stringify(combination) === JSON.stringify(correctCombination)) {
      alert("Lock opened!");
    } else {
      alert("Wrong combination. Try again.");
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 p-4 sm:p-6">
      <CardHeader>
        <CardTitle>Combination Lock</CardTitle>
        <p className="text-sm text-muted-foreground">
          Correct Combo: {correctCombination.join("")}
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          {combination.map((_, index) => (
            <Carousel
              key={index}
              value={combination[index]}
              onChange={(value) => updateCombination(index, value)}
            />
          ))}
        </div>
        <Button onClick={checkCombination}>Try to Open</Button>
      </CardContent>
    </Card>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <SuitcaseLock />
    </div>
  );
}
