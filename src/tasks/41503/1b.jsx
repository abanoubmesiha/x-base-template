import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outline"
      className="w-full h-24 sm:h-32"
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {squares.map((square, i) => (
        <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
      ))}
      <div className="col-span-3 mt-4 text-center">
        <Card>
          <CardContent>
            <CardTitle>{status}</CardTitle>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="flex flex-col items-center p-4">
      <Card className="mb-4 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Tic-Tac-Toe</CardTitle>
        </CardHeader>
        <CardContent>
          <Board />
        </CardContent>
      </Card>
      <ResetButton />
    </div>
  );
}

function ResetButton() {
  const resetGame = () => {
    window.location.reload();
  };

  return (
    <Button onClick={resetGame} className="mt-4">
      Reset Game
    </Button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-2">
      <Game />
    </div>
  );
}
