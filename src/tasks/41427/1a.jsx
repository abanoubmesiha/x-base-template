import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Game />
    </div>
  );
}

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 150, y: 250 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 150, y: 50 });
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      context.fillStyle = "blue";
      context.fillRect(playerPosition.x, playerPosition.y, 20, 20);

      // Draw enemy
      context.fillStyle = "red";
      context.fillRect(enemyPosition.x, enemyPosition.y, 20, 20);

      // Draw bullets
      context.fillStyle = "black";
      bullets.forEach((bullet) => {
        context.fillRect(bullet.x, bullet.y, 5, 5);
      });
    };

    if (gameStarted) {
      const interval = setInterval(() => {
        setEnemyPosition((prev) => ({
          x: prev.x + (Math.random() - 0.5) * 2,
          y: prev.y + 1,
        }));

        setBullets((prevBullets) =>
          prevBullets.map((b) => ({ ...b, y: b.y - 5 }.filter((b) => b.y > 0)))
        );

        // Check collision
        if (
          enemyPosition.y > 380 &&
          Math.abs(enemyPosition.x - playerPosition.x) < 20
        ) {
          alert(`Game Over! Your score: ${score}`);
          clearInterval(interval);
          setGameStarted(false);
        }

        // Check if bullet hits enemy
        setBullets((prev) =>
          prev.filter((b) => {
            if (
              Math.abs(b.x - enemyPosition.x) < 10 &&
              b.y < enemyPosition.y + 10
            ) {
              setScore((s) => s + 1);
              return false;
            }
            return true;
          })
        );

        draw();
      }, 50);
      return () => clearInterval(interval);
    } else {
      draw(); // Draw initial state
    }
  }, [gameStarted, playerPosition, enemyPosition, bullets, score]);

  const handleKeyDown = (e) => {
    if (!gameStarted) return;

    const speed = 5;
    switch (e.key) {
      case "ArrowLeft":
        setPlayerPosition((p) => ({ ...p, x: Math.max(0, p.x - speed) }));
        break;
      case "ArrowRight":
        setPlayerPosition((p) => ({ ...p, x: Math.min(280, p.x + speed) }));
        break;
      case " ":
        setBullets((b) => [
          ...b,
          { x: playerPosition.x + 7.5, y: playerPosition.y },
        ]);
        break;
    }
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md">
      <CardHeader>
        <CardTitle>Air Fighters Dog-Fight</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <canvas
          ref={canvasRef}
          width="300"
          height="400"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          className="border border-black bg-white"
        />
      </CardContent>
      <div className="p-4 flex justify-between items-center">
        <p>Score: {score}</p>
        <Button onClick={() => setGameStarted(!gameStarted)}>
          {gameStarted ? "Pause" : "Start"}
        </Button>
      </div>
    </Card>
  );
}

export default App;
