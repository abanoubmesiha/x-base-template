import { Input } from "@/components/ui/input";
import React, { useCallback, useMemo, useState } from "react";

const Row = React.memo(function Row({ value }) {
  return <div className="border-b p-2">{value}</div>;
});

function RowList({ filterValue }) {
  const rows = useMemo(() => {
    return Array.from(
      { length: 2000 },
      (_, i) => `Row ${i + 1}: ${filterValue}`
    );
  }, [filterValue]);

  return (
    <div className="max-h-96 overflow-y-auto">
      {rows.map((row, index) => (
        <Row key={index} value={row} />
      ))}
    </div>
  );
}

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Input
          placeholder="Type to filter rows..."
          value={inputValue}
          onChange={handleInputChange}
          className="mb-4"
        />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <RowList filterValue={inputValue} />
        </div>
      </div>
    </div>
  );
}
