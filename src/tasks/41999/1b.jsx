import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";

const Row = React.memo(({ index, content }) => (
  <div className="py-2 px-4 border-b last:border-b-0">
    Row {index + 1}: {content}
  </div>
));

const RowList = React.memo(({ rows }) => (
  <div className="h-[60vh] overflow-y-auto">
    {rows.map((content, index) => (
      <Row key={index} index={index} content={content} />
    ))}
  </div>
));

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const rows = useMemo(() => {
    return Array(2000).fill(inputValue);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            2000 Rows Updater
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type to update all rows..."
            value={inputValue}
            onChange={handleInputChange}
            className="mb-4"
          />
          <RowList rows={rows} />
        </CardContent>
      </Card>
    </div>
  );
}
