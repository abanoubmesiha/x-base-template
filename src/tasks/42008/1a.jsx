import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Spinner,
} from "@/components/ui";
import React, { useState } from "react";

const TirePressureInput = ({ onChange, value, disabled }) => (
  <div className="mb-4">
    <Label htmlFor="tirePressure">Tire Pressure</Label>
    <Input
      id="tirePressure"
      type="number"
      min="0"
      suffix="PSI"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  </div>
);

const BrakeFluidInput = ({ onChange, value, disabled }) => (
  <div className="mb-4">
    <Label htmlFor="brakeFluid">Brake Fluid</Label>
    <Input
      id="brakeFluid"
      type="number"
      min="0"
      max="100"
      suffix="%"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  </div>
);

const ResultDisplay = ({ result, onRetest, loading }) => (
  <div className="flex items-center space-x-2">
    <span className={loading ? "animate-pulse" : ""}>{result}</span>
    <Button onClick={onRetest} disabled={loading}>
      {loading ? <Spinner /> : "Retest"}
    </Button>
  </div>
);

function App() {
  const [tirePressures, setTirePressures] = useState(Array(4).fill(""));
  const [brakeFluids, setBrakeFluids] = useState(Array(4).fill(""));
  const [results, setResults] = useState(Array(4).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [retestIndex, setRetestIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 5000));
    const mockResults = tirePressures.map(
      (_, i) =>
        `Tire ${i + 1}: ${tirePressures[i]} PSI, Brake ${i + 1}: ${
          brakeFluids[i]
        }%`
    );
    setResults(mockResults);
    setIsLoading(false);
  };

  const handleRetest = (index) => {
    setRetestIndex(index);
    setIsLoading(true);
    setTimeout(() => {
      const newResult = `Retested - Tire ${index + 1}: ${
        tirePressures[index]
      } PSI, Brake ${index + 1}: ${brakeFluids[index]}%`;
      setResults((prev) => prev.map((r, i) => (i === index ? newResult : r)));
      setIsLoading(false);
      setRetestIndex(null);
    }, 5000);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Car Maintenance Check</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tirePressures.map((_, index) => (
                <div key={index} className="space-y-4">
                  <TirePressureInput
                    value={tirePressures[index]}
                    onChange={(value) =>
                      setTirePressures((prev) => [
                        ...prev.slice(0, index),
                        value,
                        ...prev.slice(index + 1),
                      ])
                    }
                    disabled={isLoading}
                  />
                  <BrakeFluidInput
                    value={brakeFluids[index]}
                    onChange={(value) =>
                      setBrakeFluids((prev) => [
                        ...prev.slice(0, index),
                        value,
                        ...prev.slice(index + 1),
                      ])
                    }
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </form>
          {results.every((r) => r !== null) && (
            <div className="mt-6 space-y-4">
              {results.map((result, index) => (
                <ResultDisplay
                  key={index}
                  result={result}
                  onRetest={() => handleRetest(index)}
                  loading={retestIndex === index}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
