import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

function App() {
  const [mainOption, setMainOption] = useState(null);
  const [subOption, setSubOption] = useState(null);
  const [otherText, setOtherText] = useState("");

  const handleMainOptionChange = (value) => {
    setMainOption(value);
    setSubOption(null); // Reset sub options when main option changes
    setOtherText(""); // Reset other text when main option changes
  };

  const handleSubOptionChange = (value) => {
    setSubOption(value);
  };

  const SubOptions = ({ forOption }) => {
    let options = [];
    let showOther = false;

    switch (forOption) {
      case "A":
        options = ["AA", "AB", "AC", "AD"];
        showOther = subOption === "AD";
        break;
      case "B":
        options = ["BA", "BB", "BC", "BD"];
        showOther = subOption === "BD";
        break;
      case "C":
        options = ["CA", "CB", "CC", "CD"];
        showOther = subOption === "CD";
        break;
      case "D":
        showOther = true;
        break;
      default:
        return null;
    }

    return (
      <>
        <RadioGroup
          value={subOption}
          onValueChange={handleSubOptionChange}
          className="mt-4"
        >
          <div className="font-semibold mb-2">
            I am a {forOption} complicated radio button
          </div>
          {options.map((option) => (
            <RadioGroupItem key={option} value={option} id={`option-${option}`}>
              {option}
            </RadioGroupItem>
          ))}
        </RadioGroup>
        {showOther && (
          <div className="flex items-center mt-2">
            <label htmlFor="other" className="mr-2">
              Other:
            </label>
            <Input
              id="other"
              placeholder="Specify other"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="flex-grow"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-lg mx-auto">
        <RadioGroup
          value={mainOption}
          onValueChange={handleMainOptionChange}
          className="mb-4"
        >
          <div className="font-bold mb-2">I am a complicated radio button</div>
          {["A", "B", "C", "D"].map((option) => (
            <RadioGroupItem
              key={option}
              value={option}
              id={`main-option-${option}`}
            >
              Option {option}
            </RadioGroupItem>
          ))}
        </RadioGroup>
        {mainOption && <SubOptions forOption={mainOption} />}
      </div>
    </div>
  );
}

export default App;
