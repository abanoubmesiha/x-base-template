import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

const Stepper = ({ steps, isHorizontal, onStepChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);

  const handleNext = () => {
    if (activeSubStep < steps[activeStep].subSteps.length - 1) {
      setActiveSubStep(activeSubStep + 1);
    } else if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      setActiveSubStep(0);
    }
    onStepChange(activeStep, activeSubStep);
  };

  const handlePrevious = () => {
    if (activeSubStep > 0) {
      setActiveSubStep(activeSubStep - 1);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setActiveSubStep(steps[activeStep - 1].subSteps.length - 1);
    }
    onStepChange(activeStep, activeSubStep);
  };

  const handleStepClick = (stepIndex, subStepIndex) => {
    setActiveStep(stepIndex);
    setActiveSubStep(subStepIndex);
    onStepChange(stepIndex, subStepIndex);
  };

  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-4`}>
      {steps.map((step, stepIndex) => (
        <div
          key={stepIndex}
          className={`flex ${
            isHorizontal ? "flex-col" : "flex-row"
          } items-center gap-2`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
              stepIndex <= activeStep
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => handleStepClick(stepIndex, 0)}
          >
            {stepIndex + 1}
          </div>
          <div className="text-sm font-medium">{step.name}</div>
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } gap-2 ml-4`}
          >
            {step.subSteps.map((subStep, subStepIndex) => (
              <div
                key={subStepIndex}
                className={`text-xs cursor-pointer ${
                  stepIndex === activeStep && subStepIndex <= activeSubStep
                    ? "text-blue-500 font-bold"
                    : "text-gray-500"
                }`}
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
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);

  const steps = [
    {
      name: "Getting Information",
      subSteps: [
        { name: "Personal", isActive: true },
        { name: "Family", isActive: false },
      ],
    },
    {
      name: "Sign Docs",
      subSteps: [
        { name: "Waiver", isActive: false },
        { name: "Ownership", isActive: false },
      ],
    },
    {
      name: "Final Review",
      subSteps: [{ name: "Review", isActive: false }],
    },
  ];

  const handleStepChange = (stepIndex, subStepIndex) => {
    setCurrentStep(stepIndex);
    setCurrentSubStep(subStepIndex);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setIsHorizontal(!isHorizontal)} className="mb-4">
        Flip
      </Button>
      <Stepper
        steps={steps}
        isHorizontal={isHorizontal}
        onStepChange={handleStepChange}
      />
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => handleStepChange(currentStep, currentSubStep - 1)}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleStepChange(currentStep, currentSubStep + 1)}
        >
          Next
        </Button>
      </div>
      <StepContent
        step={steps[currentStep]}
        subStep={steps[currentStep].subSteps[currentSubStep]}
      />
    </div>
  );
}
