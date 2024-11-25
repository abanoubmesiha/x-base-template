import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ToastProvider, useToast } from "@/components/ui/toast";
import React, { useEffect, useState } from "react";

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [micStatus, setMicStatus] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState({
    battery: 85,
    provider: "MobileNet",
    time: new Date().toLocaleTimeString(),
  });

  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setPhoneStatus((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Connected Successfully",
        description: "Your mobile device is now connected.",
      });
    }, 5000);
  };

  const FeatureCard = ({ title, description, status, onToggle }) => (
    <Card className="mb-4 sm:mb-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Switch checked={status} onCheckedChange={onToggle} />
      </CardFooter>
    </Card>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Mobile Surveillance Manager</h1>

        {!isConnected ? (
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? <Progress className="w-4 h-4 mr-2" /> : "Connect"}
          </Button>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <FeatureCard
                title="Microphone"
                description="Activate the microphone"
                status={micStatus}
                onToggle={setMicStatus}
              />
              <FeatureCard
                title="Camera & Microphone"
                description="Activate both camera and microphone"
                status={cameraStatus}
                onToggle={setCameraStatus}
              />
            </div>

            <Card className="mt-6 w-full max-w-lg">
              <CardHeader>
                <CardTitle>Phone Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Battery: {phoneStatus.battery}%</p>
                <p>Provider: {phoneStatus.provider}</p>
                <p>Time: {phoneStatus.time}</p>
              </CardContent>
            </Card>

            <Card className="mt-6 w-full max-w-lg">
              <CardHeader>
                <CardTitle>Remote Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <p>Remote control interface will be implemented here.</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ToastProvider>
  );
}

export default App;
