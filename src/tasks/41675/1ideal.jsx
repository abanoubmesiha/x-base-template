import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

// Mock function to simulate a live camera feed
const getCameraFeed = (position) => `Camera Feed: ${position}`;

// MicrophoneItem component to display individual microphone details and controls
const MicrophoneItem = ({
  id,
  position,
  isActive,
  volume,
  camera,
  toggleActive,
  changeVolume,
  toggleCamera,
}) => (
  <div className="flex flex-col p-2 border-b">
    <div className="flex justify-between">
      <p className="font-bold">Position: {position}</p>
      <Button
        onClick={() => toggleActive(id)}
        className={isActive ? "bg-red-500" : "bg-green-500"}
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
    <div className="flex justify-between mt-2">
      <div className="w-full">
        <p className="font-bold">Volume: {volume}</p>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => changeVolume(id, e.target.value)}
          className="w-full"
        />
      </div>
      <Button
        onClick={() => toggleCamera(id)}
        className={camera ? "bg-red-500" : "bg-green-500"}
      >
        {camera ? "Close Camera" : "Open Camera"}
      </Button>
    </div>
  </div>
);

const CameraGrid = ({ cameras }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    {cameras.map((camera) => (
      <div
        key={camera.id}
        className="border p-2 flex flex-col items-center justify-center"
      >
        {camera.camera ? (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <p>{getCameraFeed(camera.position)}</p>
          </div>
        ) : (
          <div className="w-full h-40 bg-black" />
        )}
        <p className="mt-2">{camera.position}</p>
      </div>
    ))}
  </div>
);

// Main App component
export default function App() {
  const [microphones, setMicrophones] = useState([
    {
      id: 1,
      position: "Stage Left",
      isActive: false,
      volume: 50,
      camera: false,
    },
    {
      id: 2,
      position: "Stage Right",
      isActive: false,
      volume: 50,
      camera: false,
    },
    {
      id: 3,
      position: "Center Stage",
      isActive: true,
      volume: 75,
      camera: true,
    },
    {
      id: 4,
      position: "Back Stage",
      isActive: false,
      volume: 50,
      camera: false,
    },
  ]);

  // Function to toggle the active state of a microphone
  const toggleActive = (id) => {
    setMicrophones(
      microphones.map((mic) =>
        mic.id === id ? { ...mic, isActive: !mic.isActive } : mic
      )
    );
  };

  // Function to change the volume of a microphone
  const changeVolume = (id, newVolume) => {
    setMicrophones(
      microphones.map((mic) =>
        mic.id === id ? { ...mic, volume: newVolume } : mic
      )
    );
  };

  // Function to toggle the camera state of a microphone
  const toggleCamera = (id) => {
    setMicrophones(
      microphones.map((mic) =>
        mic.id === id ? { ...mic, camera: !mic.camera } : mic
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Microphone Control Panel
          </CardTitle>
          <CardDescription className="text-gray-500">
            Manage the activation status, volume, and camera of microphones in
            the theater
          </CardDescription>
        </CardHeader>
        <CardContent>
          {microphones.map((mic) => (
            <MicrophoneItem
              key={mic.id}
              {...mic}
              toggleActive={toggleActive}
              changeVolume={changeVolume}
              toggleCamera={toggleCamera}
            />
          ))}
          {microphones.filter((mic) => mic.camera).length > 0 && (
            <CameraGrid cameras={microphones.filter((mic) => mic.camera)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
