import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

// Component for formatted money input field
const MoneyField = ({ label, value, onChange }) => {
  const formatValue = (val) => {
    // Remove non-numeric characters except decimal point
    let numericValue = val.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      numericValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Limit to 2 decimal places
    const decimalIndex = numericValue.indexOf(".");
    if (decimalIndex !== -1) {
      numericValue = numericValue.slice(0, decimalIndex + 3);
    }

    // Add commas for thousands
    const [integerPart, decimalPart] = numericValue.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  // Handle input changes and format value
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[$,]/g, "");
    if (!isNaN(parseFloat(rawValue)) || rawValue === "") {
      onChange(formatValue(rawValue));
    }
  };

  return (
    <div className="relative">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="text"
        value={value === "" ? "" : `${value}`}
        onChange={handleChange}
        className="pe-6"
      />
      <span className="absolute end-2 top-8 text-gray-500">$</span>
    </div>
  );
};

// Form component to demonstrate MoneyField usage
const ExampleForm = () => {
  const [amount, setAmount] = useState(""); // State for transaction amount
  const [salary, setSalary] = useState(""); // State for annual salary

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MoneyField
          label="Transaction Amount"
          value={amount}
          onChange={setAmount}
        />
        <MoneyField label="Annual Salary" value={salary} onChange={setSalary} />
      </CardContent>
    </Card>
  );
};

// Main application component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ExampleForm />
    </div>
  );
}
