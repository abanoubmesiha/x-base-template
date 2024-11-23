import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Slider,
  Switch,
} from "@/components/ui/card";
import React, { useState } from "react";

const MicrophoneCard = ({
  microphone,
  onToggle,
  onVolumeChange,
  onCameraToggle,
}) => (
  <Card className="mb-4 last:mb-0">
    <CardHeader>
      <CardTitle>{microphone.name}</CardTitle>
      <CardDescription>Position: {microphone.position}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <Switch
          checked={microphone.active}
          onCheckedChange={(checked) => onToggle(microphone.id, checked)}
        />
        <span>{microphone.active ? "Active" : "Inactive"}</span>
      </div>
      <div className="mt-2">
        <Slider
          defaultValue={[microphone.volume]}
          onValueChange={(value) => onVolumeChange(microphone.id, value[0])}
          max={100}
          className="w-full"
        />
        <span>Volume: {microphone.volume}</span>
      </div>
      <div className="mt-2">
        <Switch
          checked={microphone.camera}
          onCheckedChange={(checked) => onCameraToggle(microphone.id, checked)}
        />
        <span>{microphone.camera ? "Camera On" : "Camera Off"}</span>
      </div>
    </CardContent>
  </Card>
);

const CameraGrid = ({ microphones }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    {microphones
      .filter((mic) => mic.camera)
      .map((mic) => (
        <div key={mic.id} className="bg-gray-200 p-2 rounded">
          <img
            src={`/placeholder-camera-${mic.id}.jpg`}
            alt={`Camera feed for ${mic.name}`}
            className="w-full h-48 object-cover rounded"
          />
        </div>
      ))}
  </div>
);

export default function App() {
  const [microphones, setMicrophones] = useState([
    {
      id: 1,
      name: "Stage Left",
      position: "Left",
      active: false,
      volume: 50,
      camera: false,
    },
    {
      id: 2,
      name: "Stage Right",
      position: "Right",
      active: true,
      volume: 75,
      camera: true,
    },
    {
      id: 3,
      name: "Orchestra",
      position: "Center",
      active: false,
      volume: 30,
      camera: false,
    },
  ]);

  const toggleMicrophone = (id, active) => {
    setMicrophones(
      microphones.map((mic) => (mic.id === id ? { ...mic, active } : mic))
    );
  };

  const changeVolume = (id, volume) => {
    setMicrophones(
      microphones.map((mic) => (mic.id === id ? { ...mic, volume } : mic))
    );
  };

  const toggleCamera = (id, camera) => {
    setMicrophones(
      microphones.map((mic) => (mic.id === id ? { ...mic, camera } : mic))
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Theater Microphone Control</h1>
      <div className="grid gap-4">
        {microphones.map((mic) => (
          <MicrophoneCard
            key={mic.id}
            microphone={mic}
            onToggle={toggleMicrophone}
            onVolumeChange={changeVolume}
            onCameraToggle={toggleCamera}
          />
        ))}
      </div>
      <CameraGrid microphones={microphones} />
    </div>
  );
}
