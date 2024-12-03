import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const InputField = ({ label, value, onChange, disabled, suffix }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <div className="relative">
      <Input
        type="number"
        min="0"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="pr-10"
        required
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        {suffix}
      </span>
    </div>
  </div>
);

const ResultItem = ({ label, value, onRetest }) => {
  const [isRetesting, setIsRetesting] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleRetest = async () => {
    onRetest(true);
    setIsRetesting(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsRetesting(false);
    setIsFlashing(true);
    onRetest(false);
    setTimeout(() => setIsFlashing(false), 3000);
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <span className={`font-medium ${isFlashing ? "animate-pulse" : ""}`}>
        {label}: {value}
      </span>
      <Button onClick={handleRetest} disabled={isRetesting}>
        {isRetesting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Retesting
          </>
        ) : (
          "Retest"
        )}
      </Button>
    </div>
  );
};

export default function App() {
  const [tirePressures, setTirePressures] = useState(["", "", "", ""]);
  const [brakeFluidLevels, setBrakeFluidLevels] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [tireRestingIndex, setTireRestingIndex] = useState(null);
  const [brakeRestingIndex, setBrakeRestingIndex] = useState(null);

  const handleTirePressureChange = (index, value) => {
    const newPressures = [...tirePressures];
    newPressures[index] = value;
    setTirePressures(newPressures);
  };

  const handleBrakeFluidChange = (index, value) => {
    const newLevels = [...brakeFluidLevels];
    newLevels[index] = value;
    setBrakeFluidLevels(newLevels);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setResults({
      tirePressures: tirePressures.map((p) => `${p} PSI`),
      brakeFluidLevels: brakeFluidLevels.map((l) => `${l}%`),
    });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Car Manufacturing Quality Check</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Tire Pressures</h3>
                <div className="grid grid-cols-4 gap-2">
                  {tirePressures.map((pressure, index) => (
                    <InputField
                      key={`tire-${index}`}
                      label={`Tire ${index + 1}`}
                      value={pressure}
                      onChange={(e) =>
                        handleTirePressureChange(index, e.target.value)
                      }
                      disabled={isSubmitting || tireRestingIndex === index}
                      suffix="PSI"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Brake Fluid Levels</h3>
                <div className="grid grid-cols-4 gap-2">
                  {brakeFluidLevels.map((level, index) => (
                    <InputField
                      key={`brake-${index}`}
                      label={`Brake ${index + 1}`}
                      value={level}
                      onChange={(e) =>
                        handleBrakeFluidChange(index, e.target.value)
                      }
                      disabled={isSubmitting || brakeRestingIndex === index}
                      suffix="%"
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          {results && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Results</h3>
              {results.tirePressures.map((pressure, index) => (
                <ResultItem
                  key={`tire-result-${index}`}
                  label={`Tire ${index + 1}`}
                  value={pressure}
                  onRetest={(isActive) =>
                    setTireRestingIndex(isActive ? index : null)
                  }
                />
              ))}
              {results.brakeFluidLevels.map((level, index) => (
                <ResultItem
                  key={`brake-result-${index}`}
                  label={`Brake ${index + 1}`}
                  value={level}
                  onRetest={(isActive) =>
                    setBrakeRestingIndex(isActive ? index : null)
                  }
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
