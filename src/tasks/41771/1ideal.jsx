import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import React, { useCallback, useEffect, useRef, useState } from "react";

const CELL_SIZE = 50; // Size of each grid cell

const FurniturePiece = ({ piece, isActive, onClick, onOutsideClick }) => {
  const ref = useRef(); // Reference to the furniture piece element
  const style = {
    width: piece.width * CELL_SIZE, // Calculate width in pixels
    height: piece.height * CELL_SIZE, // Calculate height in pixels
    transform: `rotate(${piece.rotation}deg)`, // Apply rotation
    backgroundColor: isActive ? "bg-blue-500" : "bg-slate-300", // Conditional background color
    position: "absolute",
    left: piece.x * CELL_SIZE,
    top: piece.y * CELL_SIZE,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  useEffect(() => {
    // Handle clicks outside the furniture piece
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick && onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            ref={ref}
            className={`${style.backgroundColor} hover:bg-blue-300`}
            style={style}
            onClick={onClick}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{piece.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Grid = ({ width, height, furniture, activePiece, setActivePiece }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${width}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${height}, ${CELL_SIZE}px)`,
    gap: "0px",
    position: "relative",
  };

  return (
    <div
      id="grid"
      className="overflow-auto p-4"
      style={{ maxWidth: "100vw", maxHeight: "70vh" }}
    >
      <div style={gridStyle}>
        {Array.from({ length: width * height }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200"
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          />
        ))}
        {furniture.map((piece, index) => (
          <FurniturePiece
            key={index}
            piece={piece}
            isActive={activePiece === index}
            onClick={() => setActivePiece(index)}
            onOutsideClick={() => setActivePiece(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [roomWidth, setRoomWidth] = useState(10); // Room width state
  const [roomHeight, setRoomHeight] = useState(10); // Room height state
  const [furniture, setFurniture] = useState([]); // Furniture pieces state
  const [activePiece, setActivePiece] = useState(null); // Active furniture piece state
  const [newPieceLabel, setNewPieceLabel] = useState(""); // New furniture piece label state
  const [newPieceWidth, setNewPieceWidth] = useState(1); // New furniture piece width state
  const [newPieceHeight, setNewPieceHeight] = useState(1); // New furniture piece height state
  const { toast } = useToast(); // Hook for displaying toast notifications

  const addFurniture = () => {
    // Add new furniture piece
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
    } else {
      toast({
        title: "Add Furniture",
        description:
          "Please make sure to add dimensions and a label for the furniture piece.",
      });
    }
  };

  const moveFurniture = useCallback(
    (dx, dy) => {
      if (activePiece !== null) {
        // Function to check if two rectangles overlap
        function doRectanglesOverlap(rect1, rect2) {
          return !(
            (
              rect1.x + rect1.width <= rect2.x || // rect1 is to the left of rect2
              rect1.x >= rect2.x + rect2.width || // rect1 is to the right of rect2
              rect1.y + rect1.height <= rect2.y || // rect1 is above rect2
              rect1.y >= rect2.y + rect2.height
            ) // rect1 is below rect2
          );
        }

        // Function to check if there is any overlap in an array of furniture pieces
        function hasOverlap(furniturePieces) {
          for (let i = 0; i < furniturePieces.length; i++) {
            for (let j = i + 1; j < furniturePieces.length; j++) {
              if (doRectanglesOverlap(furniturePieces[i], furniturePieces[j])) {
                return true; // There is an overlap
              }
            }
          }
          return false; // No overlap found
        }

        // Move the active piece
        const newPositionFurniture = furniture.map((piece, index) =>
          index === activePiece
            ? {
                ...piece,
                x: Math.max(0, Math.min(roomWidth - piece.width, piece.x + dx)),
                y: Math.max(
                  0,
                  Math.min(roomHeight - piece.height, piece.y + dy)
                ),
              }
            : piece
        );

        // Check for overlaps
        const isOverlapping = hasOverlap(newPositionFurniture);
        if (!isOverlapping) {
          setFurniture(newPositionFurniture);
        }
      }
    },
    [activePiece, furniture, roomWidth, roomHeight]
  );

  const rotateFurniture = useCallback(() => {
    // Rotate the active piece
    if (activePiece !== null) {
      setFurniture(
        furniture.map((piece, index) =>
          index === activePiece
            ? {
                ...piece,
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
      // Handle key presses for moving and rotating furniture
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
    // Add event listener for key presses
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Remove event listener on cleanup
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    // Scroll to the grid and disable scrolling when a piece is active
    if (activePiece !== null) {
      document.body.style.overflow = "hidden";
      const gridElement = document.getElementById("grid");
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activePiece]);

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
      <Toaster /> {/* Toast notifications */}
    </div>
  );
}
