import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [roomWidth, setRoomWidth] = useState(10);
  const [roomHeight, setRoomHeight] = useState(10);
  const [furniture, setFurniture] = useState([]);
  const [activePiece, setActivePiece] = useState(null);
  const gridRef = useRef(null);

  const handleKeyDown = (event) => {
    if (!activePiece) return;

    let newX = furniture[activePiece].x;
    let newY = furniture[activePiece].y;
    let newRotation = furniture[activePiece].rotation;

    switch (event.key) {
      case "ArrowUp":
        newY--;
        break;
      case "ArrowDown":
        newY++;
        break;
      case "ArrowLeft":
        newX--;
        break;
      case "ArrowRight":
        newX++;
        break;
      case "r":
        newRotation = (newRotation + 90) % 360;
        break;
      default:
        return;
    }

    const piece = furniture[activePiece];
    if (canMove(newX, newY, piece.width, piece.height, newRotation)) {
      setFurniture((prev) =>
        prev.map((item, index) =>
          index === activePiece
            ? { ...item, x: newX, y: newY, rotation: newRotation }
            : item
        )
      );
    }
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePiece, furniture]);

  const canMove = (x, y, width, height, rotation) => {
    const gridWidth = roomWidth;
    const gridHeight = roomHeight;

    // Check if the piece fits within the grid after rotation
    const effectiveWidth = rotation % 180 === 0 ? width : height;
    const effectiveHeight = rotation % 180 === 0 ? height : width;

    if (
      x < 0 ||
      y < 0 ||
      x + effectiveWidth > gridWidth ||
      y + effectiveHeight > gridHeight
    ) {
      return false;
    }

    // Check for overlaps with other pieces
    return !furniture.some(
      (item, idx) =>
        idx !== activePiece &&
        doItemsOverlap(
          x,
          y,
          effectiveWidth,
          effectiveHeight,
          item.x,
          item.y,
          item.width,
          item.height
        )
    );
  };

  const doItemsOverlap = (x1, y1, w1, h1, x2, y2, w2, h2) => {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  };

  const addFurniture = (width, height, name) => {
    setFurniture((prev) => [
      ...prev,
      { x: 0, y: 0, width, height, name, rotation: 0 },
    ]);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Room Dimensions</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-2">
          <Input
            type="number"
            placeholder="Width"
            value={roomWidth}
            onChange={(e) => setRoomWidth(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Height"
            value={roomHeight}
            onChange={(e) => setRoomHeight(Number(e.target.value))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Furniture</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-2">
          <Input type="number" placeholder="Width" id="furnitureWidth" />
          <Input type="number" placeholder="Height" id="furnitureHeight" />
          <Input placeholder="Name" id="furnitureName" />
          <Button
            onClick={() => {
              const width = document.getElementById("furnitureWidth").value;
              const height = document.getElementById("furnitureHeight").value;
              const name = document.getElementById("furnitureName").value;
              if (width && height && name)
                addFurniture(Number(width), Number(height), name);
            }}
          >
            Add
          </Button>
        </CardContent>
      </Card>

      <div
        ref={gridRef}
        className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1 bg-slate-100"
        style={{
          width: `${roomWidth * 20}px`,
          height: `${roomHeight * 20}px`,
        }}
      >
        {furniture.map((item, index) => (
          <div
            key={index}
            className={`border ${
              activePiece === index ? "border-blue-500" : "border-gray-300"
            } relative cursor-pointer`}
            style={{
              width: `${
                item.rotation % 180 === 0 ? item.width : item.height
              } * 20px`,
              height: `${
                item.rotation % 180 === 0 ? item.height : item.width
              } * 20px`,
              transform: `translate(${item.x * 20}px, ${
                item.y * 20
              }px) rotate(${item.rotation}deg)`,
              transition: "all 0.1s",
            }}
            onClick={() => setActivePiece(index === activePiece ? null : index)}
          >
            <div className="absolute opacity-0 hover:opacity-100 bg-white p-1 rounded">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Use arrow keys to move, 'R' to rotate. Click to select/deselect.
      </p>
    </div>
  );
}

export default App;
