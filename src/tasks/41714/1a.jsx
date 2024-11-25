import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import React, { useState } from "react";

const GRID_SIZE = 20;

function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(false))
  );
  const [numDrones, setNumDrones] = useState(4);
  const [formationJson, setFormationJson] = useState("");
  const [isDrawing, setIsDrawing] = useState(true);

  const handleMouseDown = (e, x, y) => {
    e.preventDefault();
    const newGrid = [...grid];
    newGrid[x][y] = e.button === 0; // Left click to draw, right click to erase
    setGrid(newGrid);
  };

  const handleMouseEnter = (x, y) => {
    if (isDrawing) {
      const newGrid = [...grid];
      newGrid[x][y] = true;
      setGrid(newGrid);
    }
  };

  const calculateFormation = () => {
    const points = grid
      .flatMap((row, x) => row.map((cell, y) => (cell ? [x, y] : null)))
      .filter(Boolean);

    const dronePositions = points.slice(0, numDrones).map((point) => point);
    const json = JSON.stringify(dronePositions, null, 2);
    setFormationJson(json);
  };

  const drawFormationFromJson = (json) => {
    try {
      const positions = JSON.parse(json);
      let newGrid = Array(GRID_SIZE)
        .fill()
        .map(() => Array(GRID_SIZE).fill(false));
      positions.forEach(([x, y]) => {
        if (x < GRID_SIZE && y < GRID_SIZE) newGrid[x][y] = true;
      });
      setGrid(newGrid);
    } catch (e) {
      console.error("Invalid JSON", e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formationJson);
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Drone Formation Designer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                type="number"
                value={numDrones}
                onChange={(e) => setNumDrones(Number(e.target.value))}
                placeholder="Number of Drones"
              />
              <div className="border border-gray-300 grid grid-cols-20 grid-rows-20 h-96 w-full">
                {grid.map((row, x) =>
                  row.map((cell, y) => (
                    <div
                      key={`${x}-${y}`}
                      onMouseDown={(e) => handleMouseDown(e, x, y)}
                      onMouseEnter={() => handleMouseEnter(x, y)}
                      onContextMenu={(e) => e.preventDefault()}
                      className={`border border-gray-400 h-full w-full ${
                        cell ? "bg-blue-500" : "bg-white"
                      }`}
                    ></div>
                  ))
                )}
              </div>
              <Button onClick={calculateFormation}>Generate Formation</Button>
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter JSON to draw formation"
                onChange={(e) => drawFormationFromJson(e.target.value)}
                className="h-48"
              />
              {formationJson && (
                <div className="relative">
                  <pre className="bg-gray-100 p-2 rounded border border-gray-300 overflow-x-auto">
                    <code>{formationJson}</code>
                  </pre>
                  <Button
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
