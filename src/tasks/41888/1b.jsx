import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import React, { useState } from "react";

const countries = [
  { name: "Egypt", gravity: 9.79 },
  { name: "United States", gravity: 9.80665 },
  { name: "United Kingdom", gravity: 9.81 },
  { name: "Japan", gravity: 9.798 },
  // Add all countries here. This is just a sample.
];

const units = [
  "Gram",
  "Kilogram",
  "Pound",
  "Ounce",
  "Tonne",
  "Milligram",
  "Carat",
  "Stone",
  "Slug",
  "Grain",
];

const unitConversions = {
  Gram: 1,
  Kilogram: 1000,
  Pound: 453.592,
  Ounce: 28.3495,
  Tonne: 1e6,
  Milligram: 0.001,
  Carat: 0.2,
  Stone: 6350.29,
  Slug: 14593.9,
  Grain: 0.0647989,
};

function WeightConverter() {
  const [objectName, setObjectName] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Kilogram");
  const [country, setCountry] = useState(countries[0].name);
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight || weight <= 0) return;

    const baseWeight = weight * unitConversions[unit];
    const results = countries.map((c) => ({
      country: c.name,
      weight: (
        (baseWeight / unitConversions[unit]) *
        (c.gravity / 9.80665)
      ).toFixed(2),
    }));
    setResults(results);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weight Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="objectName">Object Name</Label>
              <Input
                id="objectName"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                placeholder="Enter object name"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1")
                  )
                }
                placeholder="Enter weight"
                min="0"
                step="any"
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="country">Country of Origin</Label>
              <Select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button type="submit">Calculate</Button>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results for {objectName}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weight ({unit})
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <td className="px-6 py-4">{r.country}</td>
                    <td className="px-6 py-4">{r.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function App() {
  return <WeightConverter />;
}
