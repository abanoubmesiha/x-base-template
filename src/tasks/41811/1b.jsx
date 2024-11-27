import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

const Stepper = ({ steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState([0]);

  const handleNext = () => {
    const currentDepth = currentStepIndex.length - 1;
    if (
      currentStepIndex[currentDepth] + 1 <
      steps[currentStepIndex[0]].subSteps.length
    ) {
      setCurrentStepIndex([
        ...currentStepIndex,
        currentStepIndex[currentDepth] + 1,
      ]);
    } else if (currentStepIndex[0] + 1 < steps.length) {
      setCurrentStepIndex([currentStepIndex[0] + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex.length > 1) {
      setCurrentStepIndex(currentStepIndex.slice(0, -1));
    } else if (currentStepIndex[0] > 0) {
      setCurrentStepIndex([currentStepIndex[0] - 1]);
    }
  };

  const isActive = (step, indexes) => {
    return indexes.join(".") === currentStepIndex.join(".");
  };

  const hasPassed = (indexes) => {
    return indexes.join(".") < currentStepIndex.join(".");
  };

  const renderSteps = (steps, depth = 0, parentIndexes = []) => {
    return steps.map((step, index) => {
      const indexes = [...parentIndexes, index];
      const paddingLeft = `${depth * 4}rem`;
      return (
        <div key={index} style={{ paddingLeft }}>
          <div
            className={`flex items-center ${
              isActive(step, indexes) ? "font-bold" : ""
            } ${hasPassed(indexes) ? "text-green-500" : ""}`}
          >
            <div className="w-6 h-6 mr-2 rounded-full flex items-center justify-center bg-gray-200">
              {hasPassed(indexes) ? "✓" : index + 1}
            </div>
            <span>{step.name}</span>
          </div>
          {step.subSteps && renderSteps(step.subSteps, depth + 1, indexes)}
        </div>
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stepper</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">{renderSteps(steps)}</div>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={
              currentStepIndex.length === 1 && currentStepIndex[0] === 0
            }
          >
            Previous
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const steps = [
    {
      name: "Getting Information",
      subSteps: [{ name: "Personal" }, { name: "Family" }],
    },
    {
      name: "Sign Docs",
      subSteps: [
        { name: "Waiver" },
        {
          name: "Ownership",
          subSteps: [{ name: "Car" }, { name: "House" }],
        },
      ],
    },
    { name: "Final Review" },
  ];

  return (
    <div className="container mx-auto p-4">
      <Stepper steps={steps} />
    </div>
  );
}
