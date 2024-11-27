import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

  const handleStepClick = (stepIndex, subStepIndex) => {
    setCurrentStep(stepIndex);
    setCurrentSubStep(subStepIndex);
  };

  const handleNext = () => {
    if (currentSubStep < steps[currentStep].subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(0);
    }
  };

  const handlePrevious = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps.length - 1);
    }
  };

  const generateRandomText = () => {
    return `This is some random text for ${steps[currentStep].name} - ${steps[currentStep].subSteps[currentSubStep].name}.`;
  };

  const generateRandomDescription = () => {
    return `Here's a longer description that goes into more detail about the current step, which might include instructions or additional information relevant to ${steps[currentStep].subSteps[currentSubStep].name}.`;
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsVertical(!isVertical)} className="mb-4">
        Flip
      </Button>
      <div
        className={`flex ${
          isVertical ? "flex-col" : "flex-row"
        } space-x-4 space-y-4 items-center justify-center`}
      >
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="w-full sm:w-1/3">
            <Card
              onClick={() => handleStepClick(stepIndex, 0)}
              className={`cursor-pointer ${
                stepIndex < currentStep ||
                (stepIndex === currentStep && currentSubStep === 0)
                  ? "bg-blue-100"
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{step.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {step.subSteps.map((subStep, subStepIndex) => (
                  <div
                    key={subStepIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepClick(stepIndex, subStepIndex);
                    }}
                    className={`p-2 rounded ${
                      subStep.isActive
                        ? "bg-blue-500 text-white"
                        : stepIndex < currentStep ||
                          (stepIndex === currentStep &&
                            subStepIndex < currentSubStep)
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {subStep.name}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0 && currentSubStep === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} className="ml-2">
          Next
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent>
          <CardTitle>
            {steps[currentStep].subSteps[currentSubStep].name}
          </CardTitle>
          <CardDescription>{generateRandomDescription()}</CardDescription>
          <p>{generateRandomText()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function App() {
  const steps = [
    {
      name: "Getting Information",
      subSteps: [{ name: "Personal", isActive: true }, { name: "Family" }],
    },
    {
      name: "Sign Docs",
      subSteps: [{ name: "Waiver" }, { name: "Ownership" }],
    },
    {
      name: "Final Review",
      subSteps: [{ name: "Review" }],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Stepper steps={steps} />
    </div>
  );
}
