import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import React, { useState } from "react";

const weapons = [
  {
    name: "AK-47",
    components: {
      Magazine: 10,
      Barrel: 5,
      "Bolt carrier": 3,
      "Gas tube": 4,
      Stock: 2,
      "7.62x39mm rounds": 1000,
    },
  },
  {
    name: "M16",
    components: {
      Magazine: 8,
      "Upper receiver": 2,
      "Lower receiver": 2,
      "Bolt carrier group": 3,
      Handguard: 4,
      "5.56x45mm NATO rounds": 800,
    },
  },
  {
    name: "Glock 17",
    components: {
      Magazine: 6,
      Slide: 2,
      Barrel: 3,
      "Recoil spring": 4,
      "Trigger assembly": 2,
      "9mm rounds": 500,
    },
  },
  {
    name: "Desert Eagle",
    components: {
      Magazine: 4,
      Barrel: 2,
      Slide: 1,
      "Recoil spring": 3,
      "Firing pin": 5,
      ".50 AE rounds": 200,
    },
  },
  {
    name: "MP5",
    components: {
      Magazine: 7,
      Barrel: 2,
      Bolt: 3,
      "Trigger group": 2,
      Stock: 3,
      "9mm rounds": 600,
    },
  },
];

const sharedComponents = {
  Magazine: ["AK-47", "M16", "Glock 17", "Desert Eagle", "MP5"],
  Barrel: ["AK-47", "M16", "Glock 17", "Desert Eagle", "MP5"],
  "Trigger assembly": ["Glock 17", "Desert Eagle"],
  "9mm rounds": ["Glock 17", "MP5"],
  "7.62x39mm rounds": ["AK-47"],
};

const WeaponBox = ({ weapon, onMoveComponent }) => {
  // const filteredSharedComponents = sharedComponents
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gray-200 p-4 rounded cursor-context-menu">
          {weapon.name}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {Object.entries(weapon.components).map(([component, count], i) => (
          <React.Fragment key={component}>
            {sharedComponents[component] ? (
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  {component}: {count}
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  {sharedComponents[component]
                    .filter((w) => w !== weapon.name)
                    .map((targetWeapon) => (
                      <ContextMenuItem
                        key={targetWeapon}
                        onClick={() =>
                          onMoveComponent(weapon.name, targetWeapon, component)
                        }
                      >
                        Move{" "}
                        {component.includes("rounds") ? `10 pieces` : "1 piece"}{" "}
                        to {targetWeapon}
                      </ContextMenuItem>
                    ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
            ) : (
              <ContextMenuItem>
                {component}: {count}
              </ContextMenuItem>
            )}
            {i < Object.entries(weapon.components).length - 1 && (
              <ContextMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default function App() {
  const [weaponsState, setWeaponsState] = useState(weapons);

  const handleMoveComponent = (fromWeapon, toWeapon, component) => {
    setWeaponsState((prevState) => {
      const newState = [...prevState];
      const fromIndex = newState.findIndex((w) => w.name === fromWeapon);
      const toIndex = newState.findIndex((w) => w.name === toWeapon);

      if (fromIndex !== -1 && toIndex !== -1) {
        const moveAmount = component.includes("rounds") ? 10 : 1;
        if (newState[fromIndex].components[component] >= moveAmount) {
          newState[fromIndex].components[component] -= moveAmount;
          newState[toIndex].components[component] =
            (newState[toIndex].components[component] || 0) + moveAmount;
        }
      }

      return newState;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weapon Storage System</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {weaponsState.map((weapon) => (
          <WeaponBox
            key={weapon.name}
            weapon={weapon}
            onMoveComponent={handleMoveComponent}
          />
        ))}
      </div>
    </div>
  );
}
