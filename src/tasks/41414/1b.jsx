import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const defaultTerms = [
  {
    term: "React",
    definition: "A JavaScript library for building user interfaces",
  },
  { term: "Tailwind", definition: "A utility-first CSS framework" },
  {
    term: "Shadcn",
    definition:
      "A collection of re-usable components built with Radix UI and Tailwind CSS",
  },
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TermInput({ onSubmit }) {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(defaultTerms, null, 2)
  );

  const handleSubmit = () => {
    try {
      const terms = JSON.parse(jsonInput);
      onSubmit(terms);
    } catch (error) {
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Enter Terms and Definitions</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="h-64 mb-4"
          placeholder="Enter JSON here..."
        />
        <Button onClick={handleSubmit}>Start Game</Button>
      </CardContent>
    </Card>
  );
}

function MatchingGame({ terms }) {
  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledTerms(shuffleArray(terms.map((item) => item.term)));
    setShuffledDefinitions(shuffleArray(terms.map((item) => item.definition)));
  }, [terms]);

  const handleTermClick = (term) => {
    setSelectedTerm(term);
    if (selectedDefinition) {
      checkMatch(term, selectedDefinition);
    }
  };

  const handleDefinitionClick = (definition) => {
    setSelectedDefinition(definition);
    if (selectedTerm) {
      checkMatch(selectedTerm, definition);
    }
  };

  const checkMatch = (term, definition) => {
    const matchingPair = terms.find(
      (item) => item.term === term && item.definition === definition
    );
    if (matchingPair) {
      setMatchedPairs([...matchedPairs, matchingPair]);
      setScore(score + 1);
    }
    setSelectedTerm(null);
    setSelectedDefinition(null);
  };

  const isGameComplete = matchedPairs.length === terms.length;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Match the Terms and Definitions
      </h2>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="w-full sm:w-1/2 pr-2">
          <h3 className="text-xl font-semibold mb-2">Terms</h3>
          {shuffledTerms.map((term) => (
            <Button
              key={term}
              onClick={() => handleTermClick(term)}
              className={`mb-2 w-full ${
                matchedPairs.some((pair) => pair.term === term)
                  ? "bg-green-500"
                  : selectedTerm === term
                  ? "bg-blue-500"
                  : ""
              }`}
              disabled={matchedPairs.some((pair) => pair.term === term)}
            >
              {term}
            </Button>
          ))}
        </div>
        <div className="w-full sm:w-1/2 pl-2">
          <h3 className="text-xl font-semibold mb-2">Definitions</h3>
          {shuffledDefinitions.map((definition) => (
            <Button
              key={definition}
              onClick={() => handleDefinitionClick(definition)}
              className={`mb-2 w-full ${
                matchedPairs.some((pair) => pair.definition === definition)
                  ? "bg-green-500"
                  : selectedDefinition === definition
                  ? "bg-blue-500"
                  : ""
              }`}
              disabled={matchedPairs.some(
                (pair) => pair.definition === definition
              )}
            >
              {definition}
            </Button>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">Score: {score}</p>
        {isGameComplete && (
          <p className="text-2xl font-bold text-green-600 mt-4">
            Congratulations! You've completed the game!
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [terms, setTerms] = useState([]);

  const handleTermSubmit = (submittedTerms) => {
    setTerms(submittedTerms);
    setGameStarted(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Matching Terms and Definitions Game
      </h1>
      {!gameStarted ? (
        <TermInput onSubmit={handleTermSubmit} />
      ) : (
        <MatchingGame terms={terms} />
      )}
    </div>
  );
}
