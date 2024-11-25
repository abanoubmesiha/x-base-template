import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect, useState } from "react";

const StatusCard = ({ title, value }) => (
  <Card className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 sm:mr-4">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const RemoteControl = () => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Remote Control</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        <p className="text-gray-500">
          Remote control functionality coming soon
        </p>
      </div>
    </CardContent>
  </Card>
);

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [provider, setProvider] = useState("Example Telecom");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      showToast("Connected successfully!");
    }, 5000);
  };

  const showToast = (message) => {
    Toast({
      title: "Notification",
      description: message,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Mobile Surveillance Camera</h1>

      <Button
        onClick={handleConnect}
        disabled={isConnected || isConnecting}
        className="mb-6"
      >
        {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
      </Button>

      {isConnected && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Surveillance Options</h2>
            <div className="flex items-center mb-2">
              <Switch
                id="microphone"
                checked={microphoneOn}
                onCheckedChange={setMicrophoneOn}
              />
              <label htmlFor="microphone" className="ml-2">
                Microphone
              </label>
            </div>
            <div className="flex items-center">
              <Switch
                id="camera"
                checked={cameraOn}
                onCheckedChange={setCameraOn}
              />
              <label htmlFor="camera" className="ml-2">
                Camera
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Device Status</h2>
            <div className="flex flex-wrap">
              <StatusCard title="Battery Level" value={`${batteryLevel}%`} />
              <StatusCard title="Mobile Provider" value={provider} />
              <StatusCard
                title="Time"
                value={currentTime.toLocaleTimeString()}
              />
              <StatusCard
                title="Date"
                value={currentTime.toLocaleDateString()}
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Battery Level</h2>
            <Slider
              value={[batteryLevel]}
              onValueChange={(value) => setBatteryLevel(value[0])}
              max={100}
              step={1}
            />
          </div>

          <RemoteControl />
        </>
      )}
    </div>
  );
}
