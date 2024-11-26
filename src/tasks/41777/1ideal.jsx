import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import React, { useState } from "react";

const RadioButtonGroup = ({
  label,
  options,
  selectedOption,
  onOptionChange,
  showInput,
}) => {
  return (
    <div>
      <p>{label}</p>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="inline-flex items-center mt-2">
            <input
              type="radio"
              name={label}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
              className="mr-2"
            />
            {option}
            {option === showInput && (
              <input
                type="text"
                placeholder="Other"
                className="ml-2 border border-gray-300 p-1 rounded"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

const ComplicatedRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [nestedOption, setNestedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setNestedOption("");
  };

  const handleNestedOptionChange = (option) => {
    setNestedOption(option);
  };

  return (
    <div className="flex flex-col gap-4">
      <RadioButtonGroup
        label="I am a complicated radio button"
        options={["Option A", "Option B", "Option C", "Option D"]}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
        showInput={selectedOption === "Option D" ? "Option D" : ""}
      />
      {selectedOption === "Option A" && (
        <RadioButtonGroup
          label="I am a A complicated radio button"
          options={["Option AA", "Option AB", "Option AC", "Option AD"]}
          selectedOption={nestedOption}
          onOptionChange={handleNestedOptionChange}
          showInput={nestedOption === "Option AD" ? "Option AD" : ""}
        />
      )}
      {selectedOption === "Option B" && (
        <RadioButtonGroup
          label="I am a B complicated radio button"
          options={["Option BA", "Option BB", "Option BC", "Option BD"]}
          selectedOption={nestedOption}
          onOptionChange={handleNestedOptionChange}
          showInput={nestedOption === "Option BD" ? "Option BD" : ""}
        />
      )}
      {selectedOption === "Option C" && (
        <RadioButtonGroup
          label="I am a C complicated radio button"
          options={["Option CA", "Option CB", "Option CC", "Option CD"]}
          selectedOption={nestedOption}
          onOptionChange={handleNestedOptionChange}
          showInput={nestedOption === "Option CD" ? "Option CD" : ""}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="container mx-auto p-4 sm:max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Complicated Radio Button</CardTitle>
        </CardHeader>
        <CardContent>
          <ComplicatedRadioButton />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
