import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";

const StepperItem = ({ step, level = 0, activePath, onStepClick }) => {
  const isActive = activePath.slice(0, level + 1).join(".") === step.id;
  const isPassed = activePath.slice(0, level + 1).join(".") > step.id;

  const handleClick = useCallback(() => {
    onStepClick(step.id.split("."));
  }, [step.id, onStepClick]);

  return (
    <div className={`flex flex-col items-center ${level > 0 ? "mt-2" : ""}`}>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${
            isActive
              ? "bg-blue-500 text-white"
              : isPassed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        {step.name}
      </button>
      {step.children && (
        <div className="flex flex-wrap justify-center mt-2">
          {step.children.map((childStep) => (
            <StepperItem
              key={childStep.id}
              step={childStep}
              level={level + 1}
              activePath={activePath}
              onStepClick={onStepClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Stepper = ({ steps, activePath, onStepClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 overflow-x-auto">
      {steps.map((step) => (
        <StepperItem
          key={step.id}
          step={step}
          activePath={activePath}
          onStepClick={onStepClick}
        />
      ))}
    </div>
  );
};

const findDeepestStep = (steps, path) => {
  let currentStep = steps.find((s) => s.id === path[0]);
  for (let i = 1; i < path.length; i++) {
    if (!currentStep.children) break;
    currentStep = currentStep.children.find(
      (s) => s.id === path.slice(0, i + 1).join(".")
    );
  }
  return currentStep;
};

const findNextStep = (steps, currentPath) => {
  const flattenSteps = (steps, prefix = "") => {
    return steps.flatMap((step) => [
      { ...step, id: prefix + step.id },
      ...(step.children ? flattenSteps(step.children, step.id + ".") : []),
    ]);
  };

  const allSteps = flattenSteps(steps);
  const currentIndex = allSteps.findIndex(
    (s) => s.id === currentPath.join(".")
  );
  return currentIndex < allSteps.length - 1
    ? allSteps[currentIndex + 1].id.split(".")
    : null;
};

const findPreviousStep = (steps, currentPath) => {
  const flattenSteps = (steps, prefix = "") => {
    return steps.flatMap((step) => [
      { ...step, id: prefix + step.id },
      ...(step.children ? flattenSteps(step.children, step.id + ".") : []),
    ]);
  };

  const allSteps = flattenSteps(steps);
  const currentIndex = allSteps.findIndex(
    (s) => s.id === currentPath.join(".")
  );
  return currentIndex > 0 ? allSteps[currentIndex - 1].id.split(".") : null;
};

export default function App() {
  const steps = [
    {
      id: "1",
      name: "Getting Information",
      children: [
        { id: "1.1", name: "Personal" },
        { id: "1.2", name: "Family" },
      ],
    },
    {
      id: "2",
      name: "Sign Docs",
      children: [
        { id: "2.1", name: "Waiver" },
        {
          id: "2.2",
          name: "Ownership",
          children: [
            { id: "2.2.1", name: "Car" },
            { id: "2.2.2", name: "House" },
          ],
        },
      ],
    },
    { id: "3", name: "Final Review" },
  ];

  const [activePath, setActivePath] = useState(["1"]);

  const handleStepClick = useCallback((path) => {
    setActivePath(path);
  }, []);

  const handleNext = useCallback(() => {
    const nextStep = findNextStep(steps, activePath);
    if (nextStep) setActivePath(nextStep);
  }, [steps, activePath]);

  const handlePrevious = useCallback(() => {
    const previousStep = findPreviousStep(steps, activePath);
    if (previousStep) setActivePath(previousStep);
  }, [steps, activePath]);

  const activeStep = findDeepestStep(steps, activePath);

  return (
    <div className="container mx-auto p-4">
      <Stepper
        steps={steps}
        activePath={activePath}
        onStepClick={handleStepClick}
      />
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Current Step: {activeStep.name}
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handlePrevious}
            disabled={activePath.join(".") === "1"}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={activePath.join(".") === "3"}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
