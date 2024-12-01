import { Input } from "@/components/ui/input";
import React, { useDeferredValue, useMemo, useState } from "react";

function List({ query }) {
  const LIST_SIZE = 2000;
  const defferedQuery = useDeferredValue(query);
  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{defferedQuery}</div>);
    }
    return l;
  }, [defferedQuery]);
  return list;
}

function App() {
  const [value, setValue] = useState("");

  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <List query={value} />
    </>
  );
}

export default App;
