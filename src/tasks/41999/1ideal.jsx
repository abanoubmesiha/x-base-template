import { Input } from "@/components/ui/input";
import React, { useDeferredValue, useMemo, useState } from "react";

// Define a component that takes a query prop and generates a list of 2000 items
function List({ query }) {
  const LIST_SIZE = 2000;
  const defferedQuery = useDeferredValue(query); // Defer updates to query to avoid unnecessary renders
  const list = useMemo(() => {
    // Memorize the list to optimize performance
    const l = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{defferedQuery}</div>); // Create 2000 divs with the deferred query value
    }
    return l;
  }, [defferedQuery]);
  return list; // Render the memorized list
}

// Define the main component that handles the input and updates the query
function App() {
  const [value, setValue] = useState(""); // State to hold the input value

  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)} // Update the state with the input value
      />
      <List query={value} /> // Pass the input value to the List component
    </>
  );
}

export default App;
