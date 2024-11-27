import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";

const StepperItem = ({ step, level = 0, onStepClick }) => {
  const handleClick = useCallback(() => {
    onStepClick(step.id.split("."));
  }, [step.id, onStepClick]);

  return (
    <div className={`flex flex-col items-center ${level > 0 ? "mt-2" : ""}`}>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${
            step.isActive
              ? "bg-blue-500 text-white"
              : step.isPassed
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
              onStepClick={onStepClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Stepper = ({ steps, onStepClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 overflow-x-auto">
      {steps.map((step) => (
        <StepperItem key={step.id} step={step} onStepClick={onStepClick} />
      ))}
    </div>
  );
};

function findAndUpdateNextStep(
  steps,
  activeFound = false,
  parentActive = false
) {
  for (const step of steps) {
    if (activeFound) {
      step.isActive = true;
      return true;
    }

    if (step.isActive) {
      step.isActive = false;
      activeFound = true;
    }

    if (step.children) {
      const nextStepFound = findAndUpdateNextStep(
        step.children,
        activeFound,
        step.isActive
      );
      step.isActive = step.isActive || nextStepFound || parentActive;
      if (nextStepFound) {
        return true;
      }
    }
  }
  return activeFound;
}

function findActiveStep(steps) {
  for (const step of steps) {
    // Check if the current step is active
    if (step.isActive) {
      return step;
    }

    // If the step has children, recurse through them
    if (step.children) {
      const activeChild = findActiveStep(step.children);
      if (activeChild) {
        return activeChild;
      }
    }
  }
  return null;
}

function findPreviousStep(steps, parent = null) {
  for (const step of steps) {
    // Check if the current step is active
    if (step.isActive && parent) {
      // Find the index of the current step within its parent's children
      const currentIndex = parent.children.findIndex(
        (child) => child.id === step.id
      );

      // Return the previous step if it exists
      if (currentIndex > 0) {
        return parent.children[currentIndex - 1];
      }
    }

    // If the step has children, recurse through them
    if (step.children) {
      const previousStep = findPreviousStep(step.children, step);
      if (previousStep) {
        return previousStep;
      }
    }
  }
  return null;
}

export default function App() {
  const [steps, setSteps] = useState([
    {
      id: "1",
      name: "Getting Information",
      children: [
        { id: "1.1", name: "Personal", isActive: false, isPassed: false },
        { id: "1.2", name: "Family", isActive: false, isPassed: false },
      ],
      isActive: true,
      isPassed: false,
    },
    {
      id: "2",
      name: "Sign Docs",
      children: [
        { id: "2.1", name: "Waiver", isActive: false, isPassed: false },
        {
          id: "2.2",
          name: "Ownership",
          children: [
            { id: "2.2.1", name: "Car", isActive: false, isPassed: false },
            { id: "2.2.2", name: "House", isActive: false, isPassed: false },
          ],
          isActive: false,
          isPassed: false,
        },
      ],
    },
    { id: "3", name: "Final Review", isActive: false, isPassed: false },
  ]);

  const handleNext = useCallback(() => {
    const updatedSteps = [...steps];
    findAndUpdateNextStep(updatedSteps);
    setSteps(updatedSteps);
  }, [steps]);

  const handlePrevious = useCallback(() => {
    console.log("🚀 ~ handlePrevious ~ handlePrevious:", handlePrevious);
  }, [steps]);

  return (
    <div className="container mx-auto p-4">
      <Stepper steps={steps} onStepClick={console.log} />
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Current Step:</h2>
        <div className="flex justify-center gap-4">
          <Button onClick={handlePrevious} disabled={false}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={false}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
