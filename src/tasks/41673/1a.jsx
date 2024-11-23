import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

function QueueItem({ name, onRemove }) {
  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      <span>{name}</span>
      <Button variant="destructive" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}

function QueueList({ queue, removeFromQueue }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Queue</CardTitle>
      </CardHeader>
      <CardContent>
        {queue.map((person, index) => (
          <QueueItem
            key={index}
            name={person}
            onRemove={() => removeFromQueue(index)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function AdminControls({ nextInQueue, currentTurn, setCurrentTurn }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Admin Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Label>
          Current Turn: <Badge>{currentTurn + 1}</Badge>
        </Label>
        <Button onClick={nextInQueue}>Next</Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [queue, setQueue] = useState([]);
  const [name, setName] = useState("");
  const [currentTurn, setCurrentTurn] = useState(0);

  useEffect(() => {
    if (currentTurn < queue.length) {
      alert(`It's ${queue[currentTurn]}'s turn!`);
    }
  }, [currentTurn, queue]);

  const addToQueue = () => {
    if (name && !queue.includes(name)) {
      setQueue((prev) => [...prev, name]);
      setName("");
    }
  };

  const removeFromQueue = (index) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const nextInQueue = () => {
    if (currentTurn < queue.length - 1) {
      setCurrentTurn((prev) => prev + 1);
    } else {
      setCurrentTurn(0); // Reset to start if at end of queue
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="max-w-lg mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reserve Your Spot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addToQueue}>Join Queue</Button>
            </div>
          </CardContent>
        </Card>

        <QueueList queue={queue} removeFromQueue={removeFromQueue} />

        {queue.length > 0 && (
          <AdminControls
            nextInQueue={nextInQueue}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
          />
        )}

        <div className="text-center text-sm text-muted-foreground">
          Live Queue Status: {queue.length} in queue.{" "}
          {currentTurn < queue.length
            ? `${queue[currentTurn]} is next.`
            : "Queue is empty."}
        </div>
      </div>
    </div>
  );
}
