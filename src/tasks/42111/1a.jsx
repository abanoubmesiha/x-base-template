import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

const superheroes = [
  { name: "Superman", powers: ["Super Strength", "Flight", "X-ray Vision"] },
  {
    name: "Spider-Man",
    powers: ["Spider Sense", "Wall-Crawling", "Super Agility"],
  },
  // ... other superheroes as provided in the task
];

const situations = [
  {
    situation:
      "Alien Invasion: An alien force invades Earth with advanced technology and overwhelming numbers.",
    requiredSuperheroes: ["Superman", "Iron Man", "Thor"],
    notRequiredSuperheroes: {
      Batman:
        "Lacks the superpowers required to combat an alien invasion effectively.",
      // ... other not required superheroes
    },
  },
  // ... other situations as provided in the task
];

function SuperheroCheckbox({ hero, onCheck, disabled, checked, reason }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={hero.name}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheck}
      />
      <label htmlFor={hero.name} className="text-sm">
        {hero.name}
      </label>
      {reason && <p className="text-red-500 text-xs">{reason}</p>}
    </div>
  );
}

function SituationCard({ situation }) {
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [showReasons, setShowReasons] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = (hero) => {
    if (selectedHeroes.includes(hero)) {
      setSelectedHeroes(selectedHeroes.filter((h) => h !== hero));
    } else if (selectedHeroes.length < 3) {
      const newSelection = [...selectedHeroes, hero];
      setSelectedHeroes(newSelection);
      if (!situation.requiredSuperheroes.includes(hero)) {
        setError(situation.notRequiredSuperheroes[hero]);
      } else {
        setError(null);
      }
    }
  };

  const checkSolution = () => {
    const correct = situation.requiredSuperheroes.every((hero) =>
      selectedHeroes.includes(hero)
    );
    setShowReasons(correct);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{situation.situation}</CardTitle>
      </CardHeader>
      <CardContent>
        {superheroes.map((hero) => (
          <SuperheroCheckbox
            key={hero.name}
            hero={hero}
            onCheck={() => handleCheck(hero.name)}
            disabled={
              error && !situation.requiredSuperheroes.includes(hero.name)
            }
            checked={selectedHeroes.includes(hero.name)}
            reason={
              error && hero.name === selectedHeroes[selectedHeroes.length - 1]
            }
          />
        ))}
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkSolution} disabled={selectedHeroes.length !== 3}>
          Check Solution
        </Button>
        {showReasons && (
          <p className="text-green-500 mt-2">Correct! Here's why:</p>
        )}
        {showReasons &&
          situation.requiredSuperheroes.map((hero) => (
            <p
              key={hero}
              className="text-sm"
            >{`${hero} - ${situation.correctSolution
              .split(". ")
              .find((s) => s.startsWith(hero))}`}</p>
          ))}
      </CardFooter>
    </Card>
  );
}

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Superhero Puzzle</h1>
      {situations.map((situation, index) => (
        <SituationCard key={index} situation={situation} />
      ))}
    </div>
  );
}
