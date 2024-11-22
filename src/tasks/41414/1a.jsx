import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

function parseJSON(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return { error: "Invalid JSON format" };
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const GameCard = ({ term, definition, isMatched, onMatch }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{term}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{selected ? definition : "Click to reveal"}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setSelected(!selected);
            onMatch(term, definition, !selected);
          }}
        >
          {selected ? "Hide" : "Reveal"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function App() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        React: "A JavaScript library for building user interfaces",
        Tailwind: "A utility-first CSS framework",
        JSX: "A syntax extension for JavaScript",
      },
      null,
      2
    )
  );
  const [gameData, setGameData] = useState(null);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const result = parseJSON(jsonInput);
    if (!result.error) {
      setGameData(
        shuffleArray(
          Object.entries(result).map(([term, definition]) => ({
            term,
            definition,
          }))
        )
      );
    }
  }, [jsonInput]);

  const handleMatch = (term, definition, isMatch) => {
    if (isMatch) {
      setMatched((prev) => [...prev, term]);
    } else {
      setMatched((prev) => prev.filter((t) => t !== term));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {!gameData ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Enter Terms and Definitions
            </h1>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 mb-4"
            />
            <Button onClick={() => parseJSON(jsonInput)}>Start Game</Button>
            {parseJSON(jsonInput).error && (
              <p className="text-red-500">{parseJSON(jsonInput).error}</p>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Match the Terms</h1>
            {gameData.map((item) => (
              <GameCard
                key={item.term}
                term={item.term}
                definition={item.definition}
                isMatched={matched.includes(item.term)}
                onMatch={handleMatch}
              />
            ))}
            {matched.length === gameData.length && (
              <p className="text-green-500 text-xl mt-4">
                You've matched all terms!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
