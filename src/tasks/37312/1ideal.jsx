import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const FallingObject = ({ type, x, y }) => {
  const color =
    type === "normal"
      ? "black"
      : type === "powerUp"
      ? "green"
      : "penalty"
      ? "red"
      : "black";
  return (
    <div
      className="absolute w-6 h-6 rounded-full"
      style={{ backgroundColor: color, left: `${x}px`, top: `${y}px` }}
    ></div>
  );
};

const App = () => {
  const [score, setScore] = useState(0);
  const [basket, setBasket] = useState({
    x: window.outerWidth / 2 - 40,
    y: 580,
    width: 80,
  });
  const [objects, setObjects] = useState([]);
  const [slowMotion, setSlowMotion] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setBasket((prev) => ({ ...prev, dx: -5 }));
      } else if (e.key === "ArrowRight") {
        setBasket((prev) => ({ ...prev, dx: 5 }));
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setBasket((prev) => ({ ...prev, dx: 0 }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const createObject = () => {
      const types = ["normal", "powerUp", "penalty"];
      const type = types[Math.floor(Math.random() * types.length)];
      setObjects((objects) => [
        ...objects,
        { type, x: Math.random() * (window.outerWidth - 30), y: 0 },
      ]);
    };
    const objectInterval = setInterval(createObject, 1000);
    return () => clearInterval(objectInterval);
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      setBasket((basket) => ({
        ...basket,
        x: Math.max(
          0,
          Math.min(
            window.outerWidth - basket.width,
            basket.x + (basket.dx || 0)
          )
        ),
      }));
      setObjects((objects) =>
        objects
          .map((object) => ({ ...object, y: object.y + (slowMotion ? 1 : 2) }))
          .filter((object) => {
            if (
              object.x < basket.x + basket.width &&
              object.x + 24 > basket.x &&
              object.y < basket.y + 24 &&
              object.y + 24 > basket.y
            ) {
              if (object.type === "powerUp") {
                setBasket((basket) => ({
                  ...basket,
                  width: basket.width + 20,
                }));
                setSlowMotion(true);
                setTimeout(() => setSlowMotion(false), 3000);
              } else if (object.type === "penalty") {
                setBasket((basket) => ({
                  ...basket,
                  width: Math.max(basket.width - 20, 40),
                }));
              } else {
                setScore((score) => score + 1);
              }
              return false;
            }
            return object.y < 600;
          })
      );
    };
    const gameInterval = setInterval(gameLoop, 16);
    return () => clearInterval(gameInterval);
  }, [basket, slowMotion, score]);

  return (
    <div className="App flex justify-center items-center h-screen bg-blue-300">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Catch the Falling Objects Game</CardTitle>
          <CardDescription>Score: {score}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="relative w-full h-full bg-white border-2 border-black"
            style={{ height: "600px" }}
          >
            {objects.map((object, index) => (
              <FallingObject
                key={index}
                type={object.type}
                x={object.x}
                y={object.y}
              />
            ))}
            <div
              className="absolute bottom-0 bg-black h-4"
              style={{ left: `${basket.x}px`, width: `${basket.width}px` }}
            ></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm">Use arrow keys to move the basket.</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
