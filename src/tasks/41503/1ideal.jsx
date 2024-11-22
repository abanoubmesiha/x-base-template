import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ value, onClick }) => (
  <Button
    className="w-20 h-20 text-4xl font-bold w-full"
    variant="outline"
    onClick={onClick}
  >
    {value}
  </Button>
);

const Restart = ({ onClick }) => (
  <Button className="font-bold" onClick={onClick}>
    Restart
  </Button>
);

const Board = ({ squares, onClick }) => (
  <div className="grid grid-cols-3 gap-2">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

const GameStatus = ({ winner, xIsNext, isDraw, handleRestart }) => {
  let status;
  let showRestartButton = false;
  if (winner) {
    status = `Winner: ${winner}`;
    showRestartButton = true;
  } else if (isDraw) {
    status = "It's a draw!";
    showRestartButton = true;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div className="flex items-center justify-start gap-2 mb-4">
      <div className="text-xl font-semibold">{status}</div>
      {showRestartButton && <Restart onClick={handleRestart} />}
    </div>
  );
};

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const handleClick = (i) => {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  };

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpTo(move)}
          className={move === currentMove ? "font-bold" : ""}
        >
          {description}
        </Button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Tic Tac Toe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <GameStatus
                winner={winner}
                xIsNext={xIsNext}
                isDraw={isDraw}
                handleRestart={() => setCurrentMove(0)}
              />
              <Board squares={currentSquares} onClick={handleClick} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateWinner(squares) {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
