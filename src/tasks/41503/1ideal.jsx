import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";

// Component to display device status
const DeviceStatus = ({ batteryLevel, provider, time }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Device Status</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Battery: {batteryLevel}%</p>
      <p>Provider: {provider}</p>
      <p>Time: {time}</p>
    </CardContent>
  </Card>
);

// Component to display surveillance controls
const SurveillanceControls = ({
  onMicToggle,
  onCameraToggle,
  micActive,
  cameraActive,
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Surveillance Controls</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-2">
        <span>Microphone</span>
        <Switch checked={micActive} onCheckedChange={onMicToggle} />
      </div>
      <div className="flex items-center justify-between">
        <span>Camera</span>
        <Switch checked={cameraActive} onCheckedChange={(checked)=>{
          onCameraToggle(checked)
          if (!micActive){
            onMicToggle(checked)
          }
        }} />
      </div>
    </CardContent>
  </Card>
);

// Component to preview the current stream status
const Preview = ({ micActive, cameraActive }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Preview</CardTitle>
    </CardHeader>
    <CardContent>
      {micActive && <p>Microphone active: Audio streaming...</p>}
      {cameraActive && (
        <div className="bg-gray-200 h-40 flex items-center justify-center">
          Camera active: Video feed placeholder
        </div>
      )}
      {!micActive && !cameraActive && <p>No active streams</p>}
    </CardContent>
  </Card>
);

// Component to display remote control interface
const RemoteControl = () => (
  <Card>
    <CardHeader>
      <CardTitle>Remote Control</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        Remote control interface placeholder
      </div>
    </CardContent>
  </Card>
);

export default function App() {
  const [connected, setConnected] = useState(false); // State for connection status
  const [loading, setLoading] = useState(false); // State for loading status
  const [micActive, setMicActive] = useState(false); // State for microphone status
  const [cameraActive, setCameraActive] = useState(false); // State for camera status
  const [batteryLevel, setBatteryLevel] = useState(85); // State for battery level
  const [provider, setProvider] = useState("Example Network"); // State for provider
  const [time, setTime] = useState(""); // State for current time
  const { toast } = useToast(); // Hook for displaying toast notifications

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle connecting to the device
  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
      toast({
        title: "Connected successfully",
        description: "Your mobile device is now connected.",
      });
    }, 5000);
  };

  // Handle toggling microphone
  const handleMicToggle = (checked) => {
    setMicActive(checked);
    toast({
      title: checked ? "Microphone activated" : "Microphone deactivated",
    });
  };

  // Handle toggling camera
  const handleCameraToggle = (checked) => {
    setCameraActive(checked);
    toast({
      title: checked ? "Camera activated" : "Camera deactivated",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Mobile Surveillance App</h1>
      {!connected && (
        <Button
          onClick={handleConnect}
          disabled={loading}
          className="w-full mb-4"
        >
          {loading ? "Connecting..." : "Connect"}
        </Button>
      )}
      {connected && (
        <>
          <DeviceStatus
            batteryLevel={batteryLevel}
            provider={provider}
            time={time}
          />
          <SurveillanceControls
            onMicToggle={handleMicToggle}
            onCameraToggle={handleCameraToggle}
            micActive={micActive}
            cameraActive={cameraActive}
          />
          <Preview micActive={micActive} cameraActive={cameraActive} />
          <RemoteControl />
        </>
      )}
      <Toaster /> {/* Toast notifications */}
    </div>
  );
}
