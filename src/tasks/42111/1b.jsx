import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

const superheroes = [
  {
    name: "Superman",
    powers: ["Super Strength", "Flight", "X-ray Vision"],
    description:
      "Superman uses his immense strength to handle heavy combat, protect civilians, and soar through the skies.",
  },
  {
    name: "Spider-Man",
    powers: ["Spider Sense", "Wall-Crawling", "Super Agility"],
    description:
      "Spider-Man's agility and spider sense allow him to navigate hazardous zones and rescue the infected.",
  },
  {
    name: "Wonder Woman",
    powers: ["Super Strength", "Lasso of Truth", "Flight"],
    description:
      "Wonder Woman fights and restrains villains using her combat skills and lasso while flying to uncover truths.",
  },
  {
    name: "The Flash",
    powers: ["Super Speed", "Time Travel", "Phasing"],
    description:
      "The Flash moves through time and space at incredible speeds, solving crimes across different eras.",
  },
  {
    name: "Batman",
    powers: ["Martial Arts Expertise", "Detective Skills", "High-Tech Gadgets"],
    description:
      "Batman tracks and dismantles operations using detective skills and advanced technology.",
  },
  {
    name: "Iron Man",
    powers: ["Genius-Level Intellect", "Flight", "Armor Suit"],
    description:
      "Iron Man uses his intellect and technology to develop solutions and fight enemies while protected by his armor suit.",
  },
  {
    name: "Thor",
    powers: ["Godly Strength", "Mjolnir (Hammer)", "Weather Manipulation"],
    description:
      "Thor controls the elements and overpowers foes with his immense strength and storm-creating abilities.",
  },
  {
    name: "Captain America",
    powers: ["Enhanced Strength", "Shield", "Combat Skills"],
    description:
      "Captain America expertly defends and attacks using his versatile shield and enhanced combat skills.",
  },
  {
    name: "The Hulk",
    powers: ["Super Strength", "Regenerative Healing Factor"],
    description:
      "The Hulk recovers quickly from injuries while overpowering enemies with his immense strength.",
  },
  {
    name: "Black Widow",
    powers: ["Martial Arts Expertise", "Espionage Skills", "Gadgets"],
    description:
      "Black Widow gathers intelligence and completes missions using her espionage skills and advanced gadgets.",
  },
];

const situations = [
  {
    situation:
      "Alien Invasion: An alien force invades Earth with advanced technology and overwhelming numbers.",
    requiredSuperheroes: ["Superman", "Iron Man", "Thor"],
    correctSolution:
      "Superman handles heavy combat and protects civilians with his strength, Iron Man disables alien technology with his intellect and armor, and Thor creates storms to disrupt the alien fleet.",
    incorrectSolution:
      "Superman tries to disable alien technology, Iron Man handles heavy combat, and Thor focuses solely on civilian evacuation.",
    notRequiredSuperheroes: {
      Batman:
        "Lacks the superpowers required to combat an alien invasion effectively.",
      "Spider-Man":
        "His abilities are less effective against advanced alien technology.",
      "The Flash":
        "Super speed alone is not sufficient for large-scale alien combat.",
    },
  },
  {
    situation:
      "Time-Traveling Villain: A villain travels back in time to alter history and conquer the world.",
    requiredSuperheroes: ["The Flash", "Batman", "Wonder Woman"],
    correctSolution:
      "The Flash chases the villain through time, Batman finds clues and sets traps, and Wonder Woman fights and restrains the villain.",
    incorrectSolution:
      "The Flash sets traps, Batman chases the villain through time, and Wonder Woman searches for clues.",
    notRequiredSuperheroes: {
      Aquaman: "His powers are not relevant to time travel scenarios.",
      Thor: "While powerful, his abilities are not suited for time-travel and detective work.",
      "Iron Man":
        "Technological prowess is less effective in historical and time travel contexts.",
    },
  },
  {
    situation:
      "Biohazard Outbreak: A deadly virus is released, threatening to wipe out humanity.",
    requiredSuperheroes: ["Spider-Man", "Iron Man", "Captain America"],
    correctSolution:
      "Spider-Man rescues the infected, Iron Man develops a cure or containment solution, and Captain America coordinates ground operations.",
    incorrectSolution:
      "Spider-Man tries to develop a cure, Iron Man focuses on rescuing the infected, and Captain America attempts to contain the virus without coordination.",
    notRequiredSuperheroes: {
      Thor: "His abilities are more suited for combat than medical emergencies.",
      "The Hulk":
        "His brute strength does not help in containing or curing a virus.",
      Aquaman: "His powers are more effective in water-related scenarios.",
    },
  },
];

function SituationCard({ situation, selectedHeroes, onHeroSelect }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleHeroSelect = (hero) => {
    if (selectedHeroes.includes(hero)) {
      onHeroSelect(selectedHeroes.filter((h) => h !== hero));
    } else if (selectedHeroes.length < 3) {
      if (situation.notRequiredSuperheroes[hero]) {
        setErrorMessage(
          `${hero} can't fit: ${situation.notRequiredSuperheroes[hero]}`
        );
        setTimeout(() => setErrorMessage(""), 3000);
      } else {
        onHeroSelect([...selectedHeroes, hero]);
      }
    }
  };

  React.useEffect(() => {
    if (
      selectedHeroes.length === 3 &&
      selectedHeroes.every((hero) =>
        situation.requiredSuperheroes.includes(hero)
      )
    ) {
      setSuccessMessage(situation.correctSolution);
    } else {
      setSuccessMessage("");
    }
  }, [selectedHeroes, situation]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{situation.situation}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {superheroes.map((hero) => (
            <div key={hero.name} className="flex items-center space-x-2">
              <Checkbox
                id={`${situation.situation}-${hero.name}`}
                checked={selectedHeroes.includes(hero.name)}
                onCheckedChange={() => handleHeroSelect(hero.name)}
                disabled={
                  selectedHeroes.length === 3 &&
                  !selectedHeroes.includes(hero.name)
                }
              />
              <label htmlFor={`${situation.situation}-${hero.name}`}>
                {hero.name}
              </label>
            </div>
          ))}
        </div>
        {errorMessage && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert className="mt-4">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [selectedHeroes, setSelectedHeroes] = useState(
    situations.map(() => [])
  );

  const handleHeroSelect = (situationIndex, heroes) => {
    const newSelectedHeroes = [...selectedHeroes];
    newSelectedHeroes[situationIndex] = heroes;
    setSelectedHeroes(newSelectedHeroes);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Superhero Puzzle</h1>
      {situations.map((situation, index) => (
        <SituationCard
          key={index}
          situation={situation}
          selectedHeroes={selectedHeroes[index]}
          onHeroSelect={(heroes) => handleHeroSelect(index, heroes)}
        />
      ))}
    </div>
  );
}
