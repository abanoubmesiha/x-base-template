// Importing necessary components from libraries
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Lock, Unlock } from "lucide-react";
import React, { useState } from "react";

// Define the correct combination for unlocking
const CORRECT_COMBINATION = [4, 2, 7];

// Component for the number carousel to change the digit value
const NumberCarousel = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange((value + 1) % 10)}
        className="p-1"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <div className="flex flex-col items-center justify-center h-24 text-2xl font-bold">
        <span className="opacity-50">{(value - 1 + 10) % 10}</span>
        <span className="text-3xl">{value}</span>
        <span className="opacity-50">{(value + 1) % 10}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange((value - 1 + 10) % 10)}
        className="p-1"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Main component to handle the suitcase lock logic
export default function App() {
  const [combination, setCombination] = useState([0, 0, 0]); // State to store the current combination
  const [isUnlocked, setIsUnlocked] = useState(false); // State to track if the lock is unlocked

  // Function to check if the entered combination is correct
  const handleTryOpen = () => {
    if (JSON.stringify(combination) === JSON.stringify(CORRECT_COMBINATION)) {
      setIsUnlocked(true);
    } else {
      alert("Incorrect combination. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Suitcase Lock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4 text-sm text-gray-500">
            Correct combination: {CORRECT_COMBINATION.join("-")}
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            {combination.map((value, index) => (
              <NumberCarousel
                key={index}
                value={value}
                onChange={(newValue) => {
                  const newCombination = [...combination];
                  newCombination[index] = newValue;
                  setCombination(newCombination);
                  setIsUnlocked(false);
                }}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button onClick={handleTryOpen} className="w-full sm:w-auto">
              Try to open
            </Button>
          </div>
          <div className="mt-6 flex justify-center">
            {isUnlocked ? (
              <Unlock className="h-12 w-12 text-green-500" />
            ) : (
              <Lock className="h-12 w-12 text-red-500" />
            )}
          </div>
          {isUnlocked && (
            <p className="text-center mt-4 text-green-500 font-bold">
              Lock opened successfully!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
