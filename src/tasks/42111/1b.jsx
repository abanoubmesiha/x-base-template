import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@/components/ui/card";
import React, { useState } from "react";

const heroes = [
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
      "Global Natural Disaster: Multiple earthquakes, tsunamis, and volcanic eruptions threaten global stability.",
    requiredSuperheroes: ["Aquaman", "Superman", "The Flash"],
    correctSolution:
      "Aquaman mitigates tsunamis, Superman stabilizes structures, and The Flash evacuates people from danger zones.",
    incorrectSolution:
      "Aquaman focuses on stabilizing structures, Superman evacuates people, and The Flash tries to control tsunamis.",
    notRequiredSuperheroes: {
      Batman:
        "His skills are not effective against large-scale natural disasters.",
      "Black Widow":
        "Her espionage skills are not useful in natural disaster scenarios.",
      "Iron Man":
        "While helpful in technology-related issues, large-scale natural disasters require more specialized powers.",
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
  {
    situation:
      "City-Wide Blackout: A terrorist group causes a massive blackout in a major city, leading to chaos and crime.",
    requiredSuperheroes: ["Batman", "Black Widow", "The Flash"],
    correctSolution:
      "Batman tracks and dismantles the terrorist group, Black Widow infiltrates and gathers intelligence, and The Flash restores order and assists in emergency response.",
    incorrectSolution:
      "Batman focuses on restoring order, Black Widow attempts to dismantle the terrorist group alone, and The Flash gathers intelligence.",
    notRequiredSuperheroes: {
      Superman:
        "His abilities are better suited for large-scale crises rather than city-specific issues.",
      "Wonder Woman":
        "Her combat skills are not as useful for restoring order and handling technological issues.",
      "Captain America":
        "While a strong leader, his skills are less effective in handling a massive blackout and technological sabotage.",
    },
  },
];
function SuperheroCheckbox({ hero, onChange, disabled, reason, checked }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={hero.name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={hero.name}
        className={`cursor-pointer ${disabled ? "text-red-500" : ""}`}
      >
        {hero.name} {disabled && `(${reason})`}
      </label>
    </div>
  );
}

function SituationCard({ situation }) {
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleCheckboxChange = (hero) => {
    if (selectedHeroes.includes(hero)) {
      setSelectedHeroes(selectedHeroes.filter((h) => h !== hero));
    } else if (selectedHeroes.length < 3) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const isCorrectSelection =
    situation.requiredSuperheroes.every((hero) =>
      selectedHeroes.includes(hero)
    ) && selectedHeroes.length === situation.requiredSuperheroes.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSolution(true);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{situation.situation}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          Select up to 3 superheroes:
        </p>
        {heroes.map((hero) => (
          <SuperheroCheckbox
            key={hero.name}
            hero={hero}
            onChange={() => handleCheckboxChange(hero.name)}
            disabled={
              showSolution &&
              !situation.requiredSuperheroes.includes(hero.name) &&
              situation.notRequiredSuperheroes[hero.name]
            }
            reason={
              showSolution ? situation.notRequiredSuperheroes[hero.name] : ""
            }
            checked={selectedHeroes.includes(hero.name)}
          />
        ))}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
        {showSolution && (
          <div className="mt-4">
            {isCorrectSelection ? (
              situation.requiredSuperheroes.map((hero) => (
                <p key={hero} className="text-green-500">
                  {hero} fits because:{" "}
                  {situation.correctSolution
                    .split(". ")
                    .find((s) => s.includes(hero))}
                </p>
              ))
            ) : (
              <p className="text-red-500">
                Try again! Your selection was incorrect.
              </p>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Superhero Puzzle</h1>
      {situations.map((situation, index) => (
        <SituationCard key={index} situation={situation} />
      ))}
    </div>
  );
}
