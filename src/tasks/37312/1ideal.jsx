import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

const FallingObject = ({ type, x, y }) => {
  const color =
    type === "normal" ? "black" : type === "green" ? "green" : "red";
  return (
    <div
      className={`absolute w-6 h-6 rounded-full bg-${color}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    ></div>
  );
};

const Missile = ({ x, y }) => (
  <div
    className="absolute w-4 h-10 bg-red-600"
    style={{ left: `${x}px`, top: `${y}px` }}
  ></div>
);

const App = () => {
  const [score, setScore] = useState(0);
  const [basket, setBasket] = useState({ x: 400, width: 80 });
  const [objects, setObjects] = useState([]);
  const [missiles, setMissiles] = useState([]);
  const [slowMotion, setSlowMotion] = useState(false);
  const [lastHit, setLastHit] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const gameArea = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setBasket((basket) => ({ ...basket, x: e.clientX - basket.width / 2 }));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const createObject = () => {
      const types = ["normal", "green", "red"];
      const type = types[Math.floor(Math.random() * types.length)];
      setObjects((objects) => [
        ...objects,
        { type, x: Math.random() * 780, y: 0 },
      ]);
    };
    const objectInterval = setInterval(createObject, 1000);
    return () => clearInterval(objectInterval);
  }, []);

  useEffect(() => {
    const createMissile = () => {
      setMissiles((missiles) => [
        ...missiles,
        { x: Math.random() * 800, y: 0, angle: Math.PI / 2 },
      ]);
    };
    const missileInterval = setInterval(createMissile, 10000);
    return () => clearInterval(missileInterval);
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      setObjects((objects) =>
        objects
          .map((object) => ({ ...object, y: object.y + (slowMotion ? 1 : 2) }))
          .filter((object) => {
            if (
              object.x < basket.x + basket.width &&
              object.x + 6 > basket.x &&
              object.y < 500 + 10 &&
              object.y + 6 > 500
            ) {
              if (object.type === "green") {
                setBasket((basket) => ({
                  ...basket,
                  width: basket.width + 20,
                }));
                setSlowMotion(true);
                setTimeout(() => setSlowMotion(false), 3000);
              } else if (object.type === "red") {
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

      setMissiles((missiles) =>
        missiles
          .map((missile) => {
            const targetX = basket.x + basket.width / 2;
            const targetAngle = Math.atan2(
              510 - missile.y,
              targetX - missile.x
            );
            const angleDiff = targetAngle - missile.angle;
            const turnRate = Math.PI / 4 / 60;
            if (angleDiff > turnRate) {
              missile.angle += turnRate;
            } else if (angleDiff < -turnRate) {
              missile.angle -= turnRate;
            } else {
              missile.angle = targetAngle;
            }
            return {
              ...missile,
              x: missile.x + Math.cos(missile.angle) * 5,
              y: missile.y + Math.sin(missile.angle) * 5,
            };
          })
          .filter((missile) => {
            if (
              missile.x < basket.x + basket.width &&
              missile.x + 4 > basket.x &&
              missile.y < 500 + 10 &&
              missile.y + 10 > 500
            ) {
              if (Date.now() - lastHit < 10000 && score === lastScore) {
                alert("Game Over");
                window.location.reload();
              } else {
                setBasket((basket) => ({
                  ...basket,
                  width: Math.max(basket.width / 2, 40),
                }));
                setLastHit(Date.now());
                setLastScore(score);
              }
              return false;
            }
            return missile.y < 600;
          })
      );
    };
    const gameInterval = setInterval(gameLoop, 16);
    return () => clearInterval(gameInterval);
  }, [basket, slowMotion, lastHit, lastScore, score]);

  return (
    <div className="App">
      <Card>
        <CardHeader>
          <CardTitle>Catch the Falling Objects Game</CardTitle>
          <CardDescription>Score: {score}</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={gameArea} className="relative w-full h-full bg-gray-100">
            {objects.map((object, index) => (
              <FallingObject
                key={index}
                type={object.type}
                x={object.x}
                y={object.y}
              />
            ))}
            {missiles.map((missile, index) => (
              <Missile key={index} x={missile.x} y={missile.y} />
            ))}
            <div
              className="absolute bottom-0 bg-blue-500 h-2"
              style={{ left: `${basket.x}px`, width: `${basket.width}px` }}
            ></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm">Control the basket with your mouse!</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
