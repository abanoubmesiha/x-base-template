import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 40;
const OBJECT_SIZE = 30;
const FALL_SPEED = 2;
const SPAWN_INTERVAL = 1000;
const SLOW_MOTION_DURATION = 5000;
const PENALTY_DURATION = 3000;

const randomColor = () => {
  const colors = ["blue", "green", "red"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const FallingObject = ({ x, y, color }) => (
  <div
    className={`absolute rounded-full ${
      color === "blue"
        ? "bg-blue-500"
        : color === "green"
        ? "bg-green-500"
        : "bg-red-500"
    }`}
    style={{
      left: x,
      top: y,
      width: OBJECT_SIZE,
      height: OBJECT_SIZE,
    }}
  />
);

const Basket = ({ x, width }) => (
  <div
    className="absolute bg-yellow-500 rounded-t-lg"
    style={{
      left: x,
      bottom: 0,
      width: width,
      height: BASKET_HEIGHT,
    }}
  />
);

export default function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [objects, setObjects] = useState([]);
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [basketWidth, setBasketWidth] = useState(BASKET_WIDTH);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - basketWidth / 2;
      setBasketX(Math.max(0, Math.min(x, GAME_WIDTH - basketWidth)));
    };

    const handleTouchMove = (e) => {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - basketWidth / 2;
      setBasketX(Math.max(0, Math.min(x, GAME_WIDTH - basketWidth)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [basketWidth]);

  useEffect(() => {
    if (gameOver) return;

    const spawnObject = () => {
      const newObject = {
        x: Math.random() * (GAME_WIDTH - OBJECT_SIZE),
        y: -OBJECT_SIZE,
        color: randomColor(),
      };
      setObjects((prevObjects) => [...prevObjects, newObject]);
    };

    const spawnInterval = setInterval(spawnObject, SPAWN_INTERVAL);

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = () => {
      setObjects((prevObjects) => {
        const updatedObjects = prevObjects.map((obj) => ({
          ...obj,
          y: obj.y + (isSlowMotion ? FALL_SPEED / 2 : FALL_SPEED),
        }));

        const collidedObjects = updatedObjects.filter(
          (obj) =>
            obj.y + OBJECT_SIZE >= GAME_HEIGHT - BASKET_HEIGHT &&
            obj.x + OBJECT_SIZE >= basketX &&
            obj.x <= basketX + basketWidth
        );

        collidedObjects.forEach((obj) => {
          setScore((prevScore) => prevScore + 1);
          if (obj.color === "green") {
            setIsSlowMotion(true);
            setTimeout(() => setIsSlowMotion(false), SLOW_MOTION_DURATION);
          } else if (obj.color === "red") {
            setBasketWidth((prevWidth) => Math.max(prevWidth * 0.8, 40));
            setTimeout(() => setBasketWidth(BASKET_WIDTH), PENALTY_DURATION);
          }
        });

        return updatedObjects.filter(
          (obj) => obj.y < GAME_HEIGHT && !collidedObjects.includes(obj)
        );
      });
    };

    const gameInterval = setInterval(gameLoop, 16);

    return () => clearInterval(gameInterval);
  }, [gameOver, basketX, basketWidth, isSlowMotion]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setObjects([]);
    setBasketX(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
    setBasketWidth(BASKET_WIDTH);
    setIsSlowMotion(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Catch the Falling Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={gameAreaRef}
            className="relative bg-white border-2 border-gray-300 mx-auto"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          >
            {objects.map((obj, index) => (
              <FallingObject key={index} {...obj} />
            ))}
            <Basket x={basketX} width={basketWidth} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">Score: {score}</p>
            {gameOver && (
              <Button onClick={restartGame} className="mt-2">
                Restart Game
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
