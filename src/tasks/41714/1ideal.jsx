import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const GRID_SIZE = 20; // Grid size constant
const CELL_SIZE = 20; // Cell size constant

// Grid component to render the grid and handle cell interactions
function Grid({ grid, onCellClick, onCellRightClick, dronePositions }) {
  return (
    <div className="grid gap-0">
      {grid.map((row, y) => (
        <div className="grid grid-flow-col gap-0 justify-start">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-4 h-4 md:w-5 md:h-5 border border-gray-200 ${
                cell ? "bg-blue-500" : "bg-white"
              }`}
              onClick={() => onCellClick(x, y)} // Left-click to toggle cell
              onContextMenu={(e) => {
                e.preventDefault();
                onCellRightClick(x, y); // Right-click to clear cell
              }}
            >
              {dronePositions.some(([dx, dy]) => dx === x && dy === y) && (
                <div className="w-3 h-3 bg-red-500 rounded-full m-auto" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// CopyButton component to copy text to the clipboard
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy to Clipboard"}
    </Button>
  );
}

// Main App component to handle the drone formation logic and UI
export default function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(false)) // Initialize grid state
  );
  const [droneCount, setDroneCount] = useState(2); // State for number of drones
  const [dronePositions, setDronePositions] = useState([]); // State for drone positions
  const [jsonInput, setJsonInput] = useState(""); // State for JSON input

  // Calculate drone positions based on filled cells
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

  // Handle cell click to toggle cell state
  const handleCellClick = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = !newGrid[y][x];
    setGrid(newGrid);
  };

  // Handle cell right-click to clear cell state
  const handleCellRightClick = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = false;
    setGrid(newGrid);
  };

  // Handle submit button click to calculate and set drone positions
  const handleSubmit = () => {
    const positions = calculateDronePositions();
    setDronePositions(positions);
  };

  // Handle JSON input submission to set grid and drone positions
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
        setDroneCount(positions.length);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
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
                <Button onClick={handleSubmit}>
                  Calculate Drone Positions
                </Button>
              </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Drone Positions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(dronePositions, null, 2)}
            </pre>
            <CopyButton text={JSON.stringify(dronePositions)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
