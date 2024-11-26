import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import React, { useState } from "react";

// Component for a group of radio buttons with an optional text input field
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

// Component that manages the state and renders the complex radio button logic
const ComplicatedRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State for the main radio button selection
  const [nestedOption, setNestedOption] = useState(""); // State for the nested radio button selection

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update the main radio button selection
    setNestedOption(""); // Reset the nested selection when main selection changes
  };

  const handleNestedOptionChange = (option) => {
    setNestedOption(option); // Update the nested radio button selection
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

// Main application component
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
      <Toaster /> {/* Toast notifications */}
    </div>
  );
}
