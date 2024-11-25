import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ToastProvider, useToast } from "@/components/ui/toast";
import React, { useEffect, useState } from "react";

function App() {
  return (
    <ToastProvider>
      <SurveillanceApp />
    </ToastProvider>
  );
}

function SurveillanceApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(50);
  const { toast } = useToast();

  const handleConnect = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);
    setIsConnected(true);
    toast({
      title: "Connected",
      description: "Successfully connected to the mobile device.",
    });
  };

  useEffect(() => {
    // Simulate battery level change
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 0 ? prev - 1 : 100));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Mobile Surveillance Control</CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <Button onClick={handleConnect} disabled={loading}>
              {loading ? "Connecting..." : "Connect"}
            </Button>
          ) : (
            <>
              <div className="mb-4">
                <Switch
                  id="mic"
                  checked={micOn}
                  onCheckedChange={setMicOn}
                  className="mr-2"
                />
                <label htmlFor="mic">Microphone</label>
              </div>
              <div>
                <Switch
                  id="cam"
                  checked={cameraOn}
                  onCheckedChange={setCameraOn}
                  className="mr-2"
                />
                <label htmlFor="cam">Camera & Microphone</label>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium">Device Status</h3>
                <Progress value={batteryLevel} className="mt-2" />
                <p className="mt-2 text-xs">Battery: {batteryLevel}%</p>
                <p className="text-xs">Provider: MobileNet</p>
                <p className="text-xs">
                  Time: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <div className="border border-dashed border-gray-300 p-4">
            <p className="text-center text-gray-500">
              Remote Control Interface (To be implemented)
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
