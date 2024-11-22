import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";

function FallingObject({ type, onCatch, onMiss }) {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: -10 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev.y > 100) {
          clearInterval(interval);
          onMiss(type);
          return { x: Math.random() * 100, y: -10 };
        }
        return { ...prev, y: prev.y + 1 };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [type, onMiss]);

  return (
    <div
      className={`absolute bg-${type}-500 w-6 h-6 rounded-full`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onTouchStart={() => onCatch(type)}
      onClick={() => onCatch(type)}
    />
  );
}

export default function App() {
  const [score, setScore] = useState(0);
  const [basketSize, setBasketSize] = useState(20);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleCatch = useCallback((type) => {
    setScore((prevScore) => prevScore + 1);
    if (type === "green") {
      setIsSlowMotion(true);
      setTimeout(() => setIsSlowMotion(false), 3000);
    } else if (type === "red") {
      setBasketSize((prev) => (prev > 10 ? prev - 5 : prev));
    }
  }, []);

  const handleMiss = useCallback((type) => {
    if (type === "red") {
      setGameOver(true);
    }
  }, []);

  const resetGame = () => {
    setScore(0);
    setBasketSize(20);
    setIsSlowMotion(false);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 sm:px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Catch the Falling Objects</CardTitle>
        </CardHeader>
        <CardContent className="relative h-96">
          {gameOver ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <Button onClick={resetGame}>Restart</Button>
            </div>
          ) : (
            <>
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500"
                style={{ width: `${basketSize}%`, height: "10px" }}
              ></div>
              <FallingObject
                type="green"
                onCatch={handleCatch}
                onMiss={handleMiss}
              />
              <FallingObject
                type="red"
                onCatch={handleCatch}
                onMiss={handleMiss}
              />
              <FallingObject
                type="blue"
                onCatch={handleCatch}
                onMiss={handleMiss}
              />
            </>
          )}
        </CardContent>
        <div className="p-4">
          <p>Score: {score}</p>
          <p>Basket Size: {basketSize}%</p>
          <p>Slow Motion: {isSlowMotion ? "Active" : "Inactive"}</p>
        </div>
      </Card>
    </div>
  );
}
