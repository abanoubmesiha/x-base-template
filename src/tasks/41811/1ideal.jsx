import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Stepper = ({ steps, isHorizontal, currentStep, currentSubStep }) => {
  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-4`}>
      {steps.map((step, stepIndex) => (
        <div
          key={step.name + stepIndex}
          className={`flex ${
            isHorizontal ? "flex-col" : "flex-row"
          } items-center gap-2`}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer",
              !step.isActive && "bg-gray-300 text-gray-600",
              currentStep >= stepIndex && "bg-green-500 text-white",
              step.isActive && "bg-blue-500 text-white"
            )}
            onClick={() => handleStepClick(stepIndex, 0)}
          >
            {stepIndex + 1}
          </div>
          <div
            className={cn(
              "text-sm font-medium",
              !step.isActive && "text-gray-300",
              currentStep >= stepIndex && "text-green-500",
              step.isActive && "text-blue-500"
            )}
          >
            {step.name}
          </div>
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } gap-2 ml-4`}
          >
            {step.subSteps.map((subStep, subStepIndex) => (
              <div
                key={subStep.name + subStepIndex}
                className={cn(
                  "text-xs cursor-pointer",
                  !subStep.isActive && "text-gray-600",
                  currentStep > stepIndex && "text-green-600",
                  currentStep === stepIndex &&
                    currentSubStep >= subStepIndex &&
                    "text-green-600",
                  subStep.isActive && "text-blue-600 font-bold"
                )}
                onClick={() => handleStepClick(stepIndex, subStepIndex)}
              >
                {subStep.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const StepContent = ({ step, subStep }) => {
  const randomText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${step.name} - ${subStep?.name}`;
  const randomDescription = `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${step.name} - ${subStep?.name}`;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{`${step.name} - ${subStep?.name}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{randomText}</p>
        <p className="mt-2 text-sm text-gray-500">{randomDescription}</p>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [steps, setSteps] = useState([
    {
      name: "Getting Information",
      subSteps: [
        { name: "Personal", isActive: true },
        { name: "Family", isActive: false },
      ],
      isActive: false,
    },
    {
      name: "Sign Docs",
      subSteps: [
        { name: "Waiver", isActive: false },
        { name: "Ownership", isActive: false },
      ],
      isActive: false,
    },
    {
      name: "Final Review",
      subSteps: [{ name: "Review", isActive: false }],
      isActive: false,
    },
  ]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);

  const handleNext = () => {
    if (currentSubStep < steps[currentStep].subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
      console.log("🚀 ~ setSteps ~ currentStep:", currentStep);
      console.log("🚀 ~ setSteps ~ currentSubStep:", currentSubStep);
      setSteps((prev) => {
        const updatedSteps = [...prev];
        updatedSteps[currentStep].subSteps[currentSubStep].isActive = false;
        updatedSteps[currentStep].isActive = true;
        updatedSteps[currentStep].subSteps[currentSubStep + 1].isActive = true;
        return updatedSteps;
      });
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(0);
      setSteps((prev) => {
        const updatedSteps = [...prev];
        updatedSteps[currentStep].isActive = false;
        updatedSteps[currentStep].subSteps[
          updatedSteps[currentStep].subSteps.length - 1
        ].isActive = false;
        updatedSteps[currentStep + 1].isActive = true;
        updatedSteps[currentStep + 1].subSteps[0].isActive = true;
        return updatedSteps;
      });
    }
  };

  const handlePrevious = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
      setSteps((prev) => {
        const updatedSteps = [...prev];
        updatedSteps[currentStep].subSteps[currentSubStep].isActive = false;
        updatedSteps[currentStep].isActive = true;
        updatedSteps[currentStep].subSteps[currentSubStep - 1].isActive = true;
        return updatedSteps;
      });
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps.length - 1);
      setSteps((prev) => {
        const updatedSteps = [...prev];
        updatedSteps[currentStep].isActive = false;
        updatedSteps[currentStep - 1].isActive = true;
        updatedSteps[currentStep - 1].subSteps[
          updatedSteps[currentStep - 1].subSteps.length - 1
        ].isActive = true;
        return updatedSteps;
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setIsHorizontal(!isHorizontal)} className="mb-4">
        Flip
      </Button>
      <Stepper
        steps={steps}
        isHorizontal={isHorizontal}
        currentStep={currentStep}
        currentSubStep={currentSubStep}
      />
      <div className="mt-4 flex justify-between">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
      <StepContent
        step={steps[currentStep]}
        subStep={steps[currentStep].subSteps[currentSubStep]}
      />
    </div>
  );
}
