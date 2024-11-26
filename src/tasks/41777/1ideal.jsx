import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

const ClockHand = ({ angle, length, width, color }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${length}px`,
        backgroundColor: color,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
        transformOrigin: "50% 100%",
        borderRadius: "5px",
      }}
    />
  );
};

const ClockFace = ({ hours, minutes, seconds, isFlipped, onAdjust }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  const adjustTime = (unit, amount) => {
    const newTime = new Date(currentTime);
    if (unit === "hours") newTime.setHours(newTime.getHours() + amount);
    else if (unit === "minutes")
      newTime.setMinutes(newTime.getMinutes() + amount);
    setCurrentTime(newTime);
    onAdjust(newTime);
  };

  const hour =
    ((currentTime.getHours() % 12) + currentTime.getMinutes() / 60) * 30;
  const minute = currentTime.getMinutes() * 6;
  const second = currentTime.getSeconds() * 6;

  return (
    <div
      className={`relative w-full h-full transition-transform ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 sm:w-64 sm:h-64 border-4 border-black rounded-full relative bg-white shadow-lg">
          <ClockHand angle={hour} length={60} width={6} color="black" />
          <ClockHand angle={minute} length={80} width={4} color="black" />
          <ClockHand angle={second} length={90} width={2} color="red" />
          <div className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      {isFlipped && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-y-180">
          <div className="mb-4">
            <Button onClick={() => adjustTime("hours", 1)}>Adjust Hour</Button>
            <Button onClick={() => adjustTime("minutes", 1)}>
              Adjust Minute
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [adjustedTime, setAdjustedTime] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle>Analog Clock</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer"
          >
            <ClockFace
              hours={adjustedTime?.getHours() || new Date().getHours()}
              minutes={adjustedTime?.getMinutes() || new Date().getMinutes()}
              seconds={adjustedTime?.getSeconds() || new Date().getSeconds()}
              isFlipped={isFlipped}
              onAdjust={setAdjustedTime}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
