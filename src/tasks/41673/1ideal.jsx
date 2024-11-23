import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

// QueueItem component to display individual queue details
const QueueItem = ({ position, name, current }) => (
  <div
    className={`flex justify-between p-2 border-b ${
      current ? "bg-blue-100" : ""
    }`}
  >
    <div>
      <p className="font-bold">{name}</p>
    </div>
    <p>Position: {position}</p>
  </div>
);

// Main App component
export default function App() {
  const [queue, setQueue] = useState([]); // State for queue
  const [name, setName] = useState(""); // State for name input
  const [currentTurn, setCurrentTurn] = useState(0); // State for current turn

  // Function to join the queue
  const joinQueue = () => {
    if (name) {
      setQueue([...queue, { name, position: queue.length + 1 }]);
      setName("");
    }
  };

  // Function to call the next person in the queue
  const callNext = () => {
    if (currentTurn < queue.length) {
      setCurrentTurn(currentTurn + 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Queue Management System
          </CardTitle>
          <CardDescription className="text-gray-500">
            Reserve your spot in the queue and see the live status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {queue.map((item, index) => (
            <QueueItem
              key={index}
              position={item.position}
              name={item.name}
              current={index + 1 === currentTurn}
            />
          ))}
        </CardContent>
        <CardFooter>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
            />
            <Button onClick={joinQueue}>Join Queue</Button>
            <Button onClick={callNext} className="mt-4 bg-green-500">
              Next
            </Button>
            {currentTurn > 0 && (
              <div className="mt-4 text-center">
                <p className="text-lg">
                  Current Turn: {queue[currentTurn - 1]?.name}
                </p>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
