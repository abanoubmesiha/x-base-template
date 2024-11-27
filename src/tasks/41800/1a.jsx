import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

function MoneyField({ value = 0, onChange }) {
  const formatCurrency = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [inputValue, setInputValue] = useState(formatCurrency(value));

  useEffect(() => {
    setInputValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    let val = e.target.value.replace(/[^\d.]/g, ""); // Remove non-digit and non-dot characters
    if (val.includes(".")) {
      const parts = val.split(".");
      if (parts[1].length > 2) return; // Limit to 2 decimal places
      val = `${parts[0]}.${parts[1]}`;
    }
    if (val === "" || val === ".") {
      onChange(0);
      setInputValue("");
      return;
    }
    const num = parseFloat(val);
    if (num < 0) return; // Do not accept negative values
    onChange(num);
    setInputValue(formatCurrency(num));
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor="money-input">Amount</Label>
      <Input
        id="money-input"
        type="text"
        value={`${inputValue}$`}
        onChange={handleChange}
        className="text-right pr-2"
      />
    </div>
  );
}

export default function App() {
  const [amount, setAmount] = useState(1234.56);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100 sm:px-4">
      <div className="max-w-sm w-full">
        <MoneyField value={amount} onChange={setAmount} />
        <p className="mt-4 text-center text-sm text-slate-500">
          Current value: ${amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
