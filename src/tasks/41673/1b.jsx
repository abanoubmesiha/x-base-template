import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const QueueItem = ({ number, name, status }) => (
  <TableRow>
    <TableCell>{number}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{status}</TableCell>
  </TableRow>
);

const QueueList = ({ queue }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Number</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {queue.map((item) => (
        <QueueItem key={item.number} {...item} />
      ))}
    </TableBody>
  </Table>
);

const ReserveSpot = ({ onReserve }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onReserve(name);
      setName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserve a Spot</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Reserve</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const AdminPanel = ({ onNextTurn }) => (
  <Card>
    <CardHeader>
      <CardTitle>Admin Panel</CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={onNextTurn}>Call Next</Button>
    </CardContent>
  </Card>
);

export default function App() {
  const [queue, setQueue] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setQueue((prevQueue) =>
        prevQueue.map((item) => ({
          ...item,
          status:
            item.status === "Waiting"
              ? "Waiting."
              : item.status === "Waiting."
              ? "Waiting.."
              : "Waiting",
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const reserveSpot = (name) => {
    const newItem = { number: currentNumber, name, status: "Waiting" };
    setQueue([...queue, newItem]);
    setCurrentNumber(currentNumber + 1);
  };

  const nextTurn = () => {
    if (queue.length > 0) {
      const updatedQueue = queue.map((item, index) => {
        if (index === 0) return { ...item, status: "Called" };
        return item;
      });
      setQueue(updatedQueue);
      setTimeout(() => {
        setQueue(updatedQueue.slice(1));
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8">Queue Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ReserveSpot onReserve={reserveSpot} />
        </div>
        <div>
          <AdminPanel onNextTurn={nextTurn} />
        </div>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Live Queue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <QueueList queue={queue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
