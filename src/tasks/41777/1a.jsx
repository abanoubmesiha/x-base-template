import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

const RadioWithOther = ({ options, selectedValue, onChange, otherLabel }) => {
  const [otherValue, setOtherValue] = useState("");

  return (
    <RadioGroup value={selectedValue} onValueChange={onChange}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
          {option.value === "D" && selectedValue === "D" && (
            <Input
              className="ml-2 w-40"
              placeholder={otherLabel}
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
            />
          )}
        </div>
      ))}
    </RadioGroup>
  );
};

const NestedRadio = ({ options, label, otherLabel }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [nestedValue, setNestedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    setNestedValue("");
  };

  const handleNestedChange = (value) => {
    setNestedValue(value);
  };

  const getNestedOptions = () => {
    switch (selectedValue) {
      case "A":
        return [
          { value: "AA", label: "Option AA" },
          { value: "AB", label: "Option AB" },
          { value: "AC", label: "Option AC" },
          { value: "AD", label: "Option AD" },
        ];
      case "B":
        return [
          { value: "BA", label: "Option BA" },
          { value: "BB", label: "Option BB" },
          { value: "BC", label: "Option BC" },
          { value: "BD", label: "Option BD" },
        ];
      case "C":
        return [
          { value: "CA", label: "Option CA" },
          { value: "CB", label: "Option CB" },
          { value: "CC", label: "Option CC" },
          { value: "CD", label: "Option CD" },
        ];
      default:
        return [];
    }
  };

  const getNestedLabel = () => {
    switch (selectedValue) {
      case "A":
        return "I am a A complicated radio button";
      case "B":
        return "I am a B complicated radio button";
      case "C":
        return "I am a C complicated radio button";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioWithOther
          options={[
            { value: "A", label: "Option A" },
            { value: "B", label: "Option B" },
            { value: "C", label: "Option C" },
            { value: "D", label: "Option D" },
          ]}
          selectedValue={selectedValue}
          onChange={handleChange}
          otherLabel={otherLabel}
        />

        {(selectedValue === "A" ||
          selectedValue === "B" ||
          selectedValue === "C") && (
          <div className="mt-4">
            <Label>{getNestedLabel()}</Label>
            <RadioWithOther
              options={getNestedOptions()}
              selectedValue={nestedValue}
              onChange={handleNestedChange}
              otherLabel={otherLabel}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <NestedRadio label="I am a complicated radio button" otherLabel="Other" />
    </div>
  );
}
