import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import React, { useCallback, useEffect, useState } from "react";

const CELL_SIZE = 50;

const FurniturePiece = ({ piece, isActive, onClick }) => {
  const style = {
    width: piece.width * CELL_SIZE,
    height: piece.height * CELL_SIZE,
    transform: `rotate(${piece.rotation}deg)`,
    backgroundColor: isActive ? "bg-blue-500" : "bg-gray-300",
    position: "absolute",
    left: piece.x * CELL_SIZE,
    top: piece.y * CELL_SIZE,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  return (
    <Tooltip content={piece.label}>
      <div
        className={`${style.backgroundColor} hover:bg-blue-300`}
        style={style}
        onClick={onClick}
      />
    </Tooltip>
  );
};

const Grid = ({ width, height, furniture, activePiece, setActivePiece }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${width}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${height}, ${CELL_SIZE}px)`,
    gap: "1px",
    backgroundColor: "bg-gray-200",
    position: "relative",
  };

  return (
    <div
      className="overflow-auto p-4"
      style={{ maxWidth: "100vw", maxHeight: "70vh" }}
    >
      <div style={gridStyle}>
        {Array.from({ length: width * height }).map((_, index) => (
          <div
            key={index}
            className="bg-white"
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          />
        ))}
        {furniture.map((piece, index) => (
          <FurniturePiece
            key={index}
            piece={piece}
            isActive={activePiece === index}
            onClick={() => setActivePiece(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [roomWidth, setRoomWidth] = useState(10);
  const [roomHeight, setRoomHeight] = useState(10);
  const [furniture, setFurniture] = useState([]);
  const [activePiece, setActivePiece] = useState(null);
  const [newPieceLabel, setNewPieceLabel] = useState("");
  const [newPieceWidth, setNewPieceWidth] = useState(1);
  const [newPieceHeight, setNewPieceHeight] = useState(1);

  const addFurniture = () => {
    if (newPieceLabel && newPieceWidth > 0 && newPieceHeight > 0) {
      setFurniture([
        ...furniture,
        {
          label: newPieceLabel,
          width: Number(newPieceWidth),
          height: Number(newPieceHeight),
          x: 0,
          y: 0,
          rotation: 0,
        },
      ]);
      setNewPieceLabel("");
      setNewPieceWidth(1);
      setNewPieceHeight(1);
    }
  };

  const moveFurniture = useCallback(
    (dx, dy) => {
      if (activePiece !== null) {
        setFurniture(
          furniture.map((piece, index) =>
            index === activePiece
              ? {
                  ...piece,
                  x: Math.max(
                    0,
                    Math.min(roomWidth - piece.width, piece.x + dx)
                  ),
                  y: Math.max(
                    0,
                    Math.min(roomHeight - piece.height, piece.y + dy)
                  ),
                }
              : piece
          )
        );
      }
    },
    [activePiece, furniture, roomWidth, roomHeight]
  );

  const rotateFurniture = useCallback(() => {
    if (activePiece !== null) {
      setFurniture(
        furniture.map((piece, index) =>
          index === activePiece
            ? {
                ...piece,
                rotation: (piece.rotation + 90) % 360,
                width: piece.height,
                height: piece.width,
              }
            : piece
        )
      );
    }
  }, [activePiece, furniture]);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
          moveFurniture(-1, 0);
          break;
        case "ArrowRight":
          moveFurniture(1, 0);
          break;
        case "ArrowUp":
          moveFurniture(0, -1);
          break;
        case "ArrowDown":
          moveFurniture(0, 1);
          break;
        case "r":
          rotateFurniture();
          break;
        default:
          break;
      }
    },
    [moveFurniture, rotateFurniture]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Room Dimensions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            type="number"
            value={roomWidth}
            onChange={(e) => setRoomWidth(Number(e.target.value))}
            placeholder="Width"
          />
          <Input
            type="number"
            value={roomHeight}
            onChange={(e) => setRoomHeight(Number(e.target.value))}
            placeholder="Height"
          />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add Furniture</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Input
            value={newPieceLabel}
            onChange={(e) => setNewPieceLabel(e.target.value)}
            placeholder="Label"
          />
          <Input
            type="number"
            value={newPieceWidth}
            onChange={(e) => setNewPieceWidth(Number(e.target.value))}
            placeholder="Width"
          />
          <Input
            type="number"
            value={newPieceHeight}
            onChange={(e) => setNewPieceHeight(Number(e.target.value))}
            placeholder="Height"
          />
          <Button onClick={addFurniture}>Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Room Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid
            width={roomWidth}
            height={roomHeight}
            furniture={furniture}
            activePiece={activePiece}
            setActivePiece={setActivePiece}
          />
          <p className="mt-4 text-sm text-gray-600">
            Hint: Click on a furniture piece to select it. Use arrow keys to
            move and 'r' to rotate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
