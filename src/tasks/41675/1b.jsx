import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const MicrophoneControl = ({
  mic,
  onToggle,
  onVolumeChange,
  onCameraToggle,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Mic {mic.id}</span>
          <Switch
            checked={mic.active}
            onCheckedChange={() => onToggle(mic.id)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-20">Volume:</span>
            <Slider
              value={[mic.volume]}
              onValueChange={(value) => onVolumeChange(mic.id, value[0])}
              max={100}
              step={1}
              className="flex-grow"
            />
            <span className="w-8 text-right">{mic.volume}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Camera:</span>
            <Switch
              checked={mic.cameraActive}
              onCheckedChange={() => onCameraToggle(mic.id)}
            />
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${mic.amplitude}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CameraPreview = ({ mic }) => {
  return (
    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-white">
        Camera {mic.id}
      </div>
    </div>
  );
};

export default function App() {
  const [mics, setMics] = useState([
    { id: 1, active: false, volume: 50, cameraActive: false, amplitude: 0 },
    { id: 2, active: false, volume: 50, cameraActive: false, amplitude: 0 },
    { id: 3, active: false, volume: 50, cameraActive: false, amplitude: 0 },
    { id: 4, active: false, volume: 50, cameraActive: false, amplitude: 0 },
  ]);

  const handleToggle = (id) => {
    setMics((prevMics) =>
      prevMics.map((mic) =>
        mic.id === id ? { ...mic, active: !mic.active } : mic
      )
    );
  };

  const handleVolumeChange = (id, volume) => {
    setMics((prevMics) =>
      prevMics.map((mic) => (mic.id === id ? { ...mic, volume } : mic))
    );
  };

  const handleCameraToggle = (id) => {
    setMics((prevMics) =>
      prevMics.map((mic) =>
        mic.id === id ? { ...mic, cameraActive: !mic.cameraActive } : mic
      )
    );
  };

  // Simulate amplitude changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMics((prevMics) =>
        prevMics.map((mic) => ({
          ...mic,
          amplitude: mic.active ? Math.random() * 100 : 0,
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const activeCameras = mics.filter((mic) => mic.cameraActive);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Theater Microphone Control Panel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mics.map((mic) => (
          <MicrophoneControl
            key={mic.id}
            mic={mic}
            onToggle={handleToggle}
            onVolumeChange={handleVolumeChange}
            onCameraToggle={handleCameraToggle}
          />
        ))}
      </div>
      {activeCameras.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Camera Previews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCameras.map((mic) => (
              <CameraPreview key={mic.id} mic={mic} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
