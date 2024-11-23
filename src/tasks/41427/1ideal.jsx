import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";

// Define game area dimensions
const GAME_WIDTH = window.outerWidth / 2;
const GAME_HEIGHT = window.outerHeight - 250;

// Fighter component representing a fighter jet
const Fighter = ({ x, y, rotation, color }) => (
  <div
    className="absolute w-10 h-10"
    style={{
      left: x,
      top: y,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div
      className={`w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-r-[20px] border-r-transparent ${color}`}
    />
  </div>
);

// Bullet component representing a bullet
const Bullet = ({ x, y }) => (
  <div
    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
    style={{ left: x, top: y }}
  />
);

// GameOverlay component displaying score and health
const GameOverlay = ({ score, health }) => (
  <div className="absolute top-0 left-0 p-4 text-black">
    <div>Score: {score}</div>
    <div>Health: {health}</div>
  </div>
);

export default function App() {
  // State variables
  const [playerPos, setPlayerPos] = useState({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - 50,
  });
  const [playerRotation, setPlayerRotation] = useState(0);
  const [enemyPos, setEnemyPos] = useState({ x: GAME_WIDTH / 2, y: 50 });
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  // Handle player movement and shooting
  const movePlayer = useCallback(
    (e) => {
      const speed = 5;
      switch (e.key) {
        case "ArrowLeft":
          setPlayerPos((prev) => ({ ...prev, x: Math.max(0, prev.x - speed) }));
          setPlayerRotation(-15);
          break;
        case "ArrowRight":
          setPlayerPos((prev) => ({
            ...prev,
            x: Math.min(GAME_WIDTH - 40, prev.x + speed),
          }));
          setPlayerRotation(15);
          break;
        case "ArrowUp":
          setPlayerPos((prev) => ({ ...prev, y: Math.max(0, prev.y - speed) }));
          break;
        case "ArrowDown":
          setPlayerPos((prev) => ({
            ...prev,
            y: Math.min(GAME_HEIGHT - 40, prev.y + speed),
          }));
          break;
        case " ":
          setBullets((prev) => [
            ...prev,
            { x: playerPos.x + 20, y: playerPos.y },
          ]);
          break;
      }
    },
    [playerPos]
  );

  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener("keydown", movePlayer);
    return () => window.removeEventListener("keydown", movePlayer);
  }, [movePlayer]);

  // Main game loop
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      // Move bullets upwards
      setBullets((prev) =>
        prev
          .filter((bullet) => bullet.y > 0)
          .map((bullet) => ({ ...bullet, y: bullet.y - 5 }))
      );
      // Move enemy bullets downwards
      setEnemyBullets((prev) =>
        prev
          .filter((bullet) => bullet.y < GAME_HEIGHT)
          .map((bullet) => ({ ...bullet, y: bullet.y + 5 }))
      );

      // Move enemy jet
      setEnemyPos((prev) => ({
        x: prev.x + Math.sin(Date.now() / 1000) * 2,
        y: prev.y + Math.cos(Date.now() / 1000),
      }));

      // Enemy shooting logic
      if (Math.random() < 0.02) {
        setEnemyBullets((prev) => [
          ...prev,
          { x: enemyPos.x + 20, y: enemyPos.y + 40 },
        ]);
      }

      // Bullet collision detection with enemy
      bullets.forEach((bullet) => {
        if (
          bullet.x > enemyPos.x &&
          bullet.x < enemyPos.x + 40 &&
          bullet.y > enemyPos.y &&
          bullet.y < enemyPos.y + 40
        ) {
          setScore((prev) => prev + 10);
          setBullets((prev) => prev.filter((b) => b !== bullet));
        }
      });

      // Bullet collision detection with player
      enemyBullets.forEach((bullet) => {
        if (
          bullet.x > playerPos.x &&
          bullet.x < playerPos.x + 40 &&
          bullet.y > playerPos.y &&
          bullet.y < playerPos.y + 40
        ) {
          setHealth((prev) => prev - 10);
          setEnemyBullets((prev) => prev.filter((b) => b !== bullet));
        }
      });

      // Check if health is zero
      if (health <= 0) {
        setGameOver(true);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [bullets, enemyBullets, enemyPos, health, playerPos, gameOver]);

  // Restart game function
  const restartGame = () => {
    setPlayerPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 });
    setEnemyPos({ x: GAME_WIDTH / 2, y: 50 });
    setBullets([]);
    setEnemyBullets([]);
    setScore(0);
    setHealth(100);
    setGameOver(false);
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-900">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Air Fighters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="relative w-full"
            style={{
              height: GAME_HEIGHT,
              maxWidth: GAME_WIDTH,
              margin: "0 auto",
            }}
          >
            {gameOver ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white">
                <h2 className="text-4xl font-bold mb-4">Game Over</h2>
                <p className="text-xl mb-4">Final Score: {score}</p>
                <Button onClick={restartGame}>Play Again</Button>
              </div>
            ) : (
              <>
                <Fighter
                  x={playerPos.x}
                  y={playerPos.y}
                  rotation={playerRotation}
                  color="border-b-blue-500"
                />
                <Fighter
                  x={enemyPos.x}
                  y={enemyPos.y}
                  rotation={180}
                  color="border-b-red-500"
                />
                {bullets.map((bullet, index) => (
                  <Bullet key={`bullet-${index}`} x={bullet.x} y={bullet.y} />
                ))}
                {enemyBullets.map((bullet, index) => (
                  <Bullet
                    key={`enemy-bullet-${index}`}
                    x={bullet.x}
                    y={bullet.y}
                  />
                ))}
                <GameOverlay score={score} health={health} />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
