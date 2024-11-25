import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

function Grid({ grid, onCellClick, onCellRightClick, dronePositions }) {
  return (
    <div className="grid grid-cols-20 gap-0">
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`w-5 h-5 border border-gray-200 ${
              cell ? "bg-blue-500" : "bg-white"
            }`}
            onClick={() => onCellClick(x, y)}
            onContextMenu={(e) => {
              e.preventDefault();
              onCellRightClick(x, y);
            }}
          >
            {dronePositions.some(([dx, dy]) => dx === x && dy === y) && (
              <div className="w-3 h-3 bg-red-500 rounded-full m-auto" />
            )}
          </div>
        ))
      )}
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy to Clipboard"}
    </Button>
  );
}

export default function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(false))
  );
  const [droneCount, setDroneCount] = useState(2);
  const [dronePositions, setDronePositions] = useState([]);
  const [jsonInput, setJsonInput] = useState("");

  const calculateDronePositions = () => {
    const filledCells = [];
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) filledCells.push([x, y]);
      });
    });

    if (filledCells.length === 0) return [];

    const positions = [];
    for (let i = 0; i < droneCount; i++) {
      const index = Math.floor((i / droneCount) * filledCells.length);
      positions.push(filledCells[index]);
    }

    return positions;
  };

  const handleCellClick = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = !newGrid[y][x];
    setGrid(newGrid);
  };

  const handleCellRightClick = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = false;
    setGrid(newGrid);
  };

  const handleSubmit = () => {
    const positions = calculateDronePositions();
    setDronePositions(positions);
  };

  const handleJsonSubmit = () => {
    try {
      const positions = JSON.parse(jsonInput);
      if (Array.isArray(positions) && positions.every(Array.isArray)) {
        setDronePositions(positions);
        const newGrid = Array(GRID_SIZE)
          .fill()
          .map(() => Array(GRID_SIZE).fill(false));
        positions.forEach(([x, y]) => {
          if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
            newGrid[y][x] = true;
          }
        });
        setGrid(newGrid);
      } else {
        alert("Invalid JSON format. Expected array of arrays.");
      }
    } catch (error) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Drone Formation Controller</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Draw Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid
              grid={grid}
              onCellClick={handleCellClick}
              onCellRightClick={handleCellRightClick}
              dronePositions={dronePositions}
            />
            <div className="mt-4">
              <Input
                type="number"
                value={droneCount}
                onChange={(e) => setDroneCount(parseInt(e.target.value) || 0)}
                placeholder="Number of drones"
                className="mb-2"
              />
              <Button onClick={handleSubmit}>Calculate Drone Positions</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Drone Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(dronePositions, null, 2)}
            </pre>
            <CopyButton text={JSON.stringify(dronePositions)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Enter JSON formation data"
              className="mb-2"
            />
            <Button onClick={handleJsonSubmit}>Draw Formation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
