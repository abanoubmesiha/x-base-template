import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useState } from "react";

function App() {
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm breakpoint

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Home Control Panel</h1>
      <ControlsSection
        title="Lights"
        items={[
          "Loopy",
          "Bedroom",
          "Children Room",
          "Kitchen",
          "Bathroom (light)",
          "Bathroom (heavy)",
        ]}
      />
      <ControlsSection
        title="Windows"
        items={["Loopy", "Bedroom", "Children Room", "Kitchen", "Bathroom"]}
      />
      <SimpleSwitchControl title="TV" />
      <SimpleSwitchControl title="Cameras" />
      <SimpleSwitchControl title="Garage" />
      <SimpleSwitchControl title="Music" />
      <AudioControl />
    </div>
  );
}

function ControlsSection({ title, items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between">
            <Label>{item}</Label>
            <Switch />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SimpleSwitchControl({ title }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <Label>{title}</Label>
        <Switch />
      </CardContent>
    </Card>
  );
}

function AudioControl() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const handleRecord = () => {
    // Here you would handle actual recording logic
    setIsRecording(!isRecording);
  };

  const handleSubmit = () => {
    // Here you would submit the recording
    console.log("Submit recording");
    setAudioURL("dummyURL"); // Placeholder for actual audio URL
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Microphone</CardTitle>
      </CardHeader>
      <CardContent>
        {isRecording ? (
          <Button onClick={handleRecord}>Stop Recording</Button>
        ) : (
          <Button onClick={handleRecord}>Start Recording</Button>
        )}
        {audioURL && <Button onClick={handleSubmit}>Submit Recording</Button>}
        {audioURL && <audio src={audioURL} controls />}
      </CardContent>
    </Card>
  );
}

export default App;
