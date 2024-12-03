import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

const weapons = {
  "AK-47": {
    parts: { Magazine: 10, Silencer: 20, "7.62x39mm rounds": 1000 },
    shared: ["Magazine", "Barrel"],
  },
  M16: {
    parts: { Magazine: 5, "Upper receiver": 2 },
    shared: ["Magazine", "Barrel"],
  },
  "Glock 17": {
    parts: { Magazine: 15, Slide: 1 },
    shared: ["Magazine", "Trigger Mechanism"],
  },
  "Desert Eagle": {
    parts: { Magazine: 2, Barrel: 1 },
    shared: ["Magazine", "Trigger Mechanism"],
  },
  MP5: { parts: { Magazine: 30, Stock: 1 }, shared: ["Magazine"] },
};

function WeaponCard({ name, parts, shared }) {
  const [items, setItems] = useState(parts);

  const handleMove = (item, amount, toWeapon) => {
    setItems((prev) => {
      const updated = { ...prev };
      if (updated[item] >= amount) {
        updated[item] -= amount;
        // Here you would typically update the target weapon's inventory
        // For simplicity, we're not managing state for all weapons here
      }
      return updated;
    });
  };

  return (
    <Card className="sm:w-full w-[300px] m-2">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(items).map(([item, count]) => (
          <div key={item} className="flex justify-between items-center mb-2">
            <span>{item}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">
                  {count}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(weapons)
                  .filter(
                    (w) =>
                      w !== name &&
                      (weapons[w].shared.includes(item) ||
                        item.includes("rounds"))
                  )
                  .map((weapon) => (
                    <DropdownMenuGroup key={weapon}>
                      <DropdownMenuItem
                        onClick={() => handleMove(item, 1, weapon)}
                      >
                        Move 1 to {weapon}
                      </DropdownMenuItem>
                      {item.includes("rounds") && (
                        <DropdownMenuItem
                          onClick={() => handleMove(item, 10, weapon)}
                        >
                          Move 10 to {weapon}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="flex flex-wrap justify-center p-4 bg-background">
      {Object.entries(weapons).map(([name, details]) => (
        <WeaponCard
          key={name}
          name={name}
          parts={details.parts}
          shared={details.shared}
        />
      ))}
    </div>
  );
}
