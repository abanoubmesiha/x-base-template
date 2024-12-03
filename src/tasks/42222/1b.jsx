import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";

const NumberCarousel = ({ onChange }) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-16 mx-auto"
      onSelect={(index) => onChange(numbers[index])}
    >
      <CarouselContent>
        {numbers.map((number) => (
          <CarouselItem key={number} className="pt-1 md:pt-4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{number}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const LockDisplay = ({ code }) => (
  <div className="flex justify-center space-x-4 my-4">
    {code.map((digit, index) => (
      <Card key={index} className="w-12 h-12 flex items-center justify-center">
        <span className="text-2xl font-bold">{digit}</span>
      </Card>
    ))}
  </div>
);

export default function App() {
  const [code, setCode] = useState([0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const correctCode = [4, 2, 0]; // Example correct code

  useEffect(() => {
    setIsUnlocked(JSON.stringify(code) === JSON.stringify(correctCode));
  }, [code]);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Suitcase Lock</CardTitle>
        </CardHeader>
        <CardContent>
          <LockDisplay code={code} />
          <div className="flex justify-center space-x-4">
            {[0, 1, 2].map((index) => (
              <NumberCarousel
                key={index}
                onChange={(value) => handleCodeChange(index, value)}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            {isUnlocked ? (
              <div className="text-green-600 font-bold text-xl">Unlocked!</div>
            ) : (
              <div className="text-red-600 font-bold text-xl">Locked</div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={() => setCode([0, 0, 0])}
              variant="outline"
              className="mx-auto"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
