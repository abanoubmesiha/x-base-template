import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const rooms = ["Loopy", "Bedroom", "Children Room", "Kitchen", "Bathroom"];

const LightControl = ({ room }) => {
  const [lightIntensity, setLightIntensity] = useState(50);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{room}</h3>
      <div className="flex items-center justify-between">
        <span className="mr-2">Light Intensity:</span>
        <Slider
          className="w-1/2"
          value={[lightIntensity]}
          onValueChange={(value) => setLightIntensity(value[0])}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};

const WindowControl = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{room}</h3>
      <div className="flex items-center justify-between">
        <span>Window:</span>
        <Switch checked={isOpen} onCheckedChange={setIsOpen} />
        <span>{isOpen ? "Open" : "Closed"}</span>
      </div>
    </div>
  );
};

const DeviceControl = ({ device }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{device}</h3>
      <div className="flex items-center justify-between">
        <span>Status:</span>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
        <span>{isOn ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
};

const VoiceControl = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
    // Simulating recording, in a real app we would use the Web Audio API
    setTimeout(() => {
      setIsRecording(false);
      setRecordedAudio("Simulated recorded audio");
    }, 3000);
  };

  const playbackRecording = () => {
    // In a real app, we would play the actual recorded audio
    alert("Playing back: " + recordedAudio);
  };

  const submitRecording = () => {
    // In a real app, we would send the recording to a server or process it
    alert("Submitting recording: " + recordedAudio);
    setRecordedAudio(null);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Voice Control</h3>
      <div className="flex flex-col space-y-2">
        <Button onClick={startRecording} disabled={isRecording}>
          {isRecording ? "Recording..." : "Start Recording"}
        </Button>
        {recordedAudio && (
          <>
            <Button onClick={playbackRecording}>Playback Recording</Button>
            <Button onClick={submitRecording}>Submit Recording</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Smart Home Control Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lighting Control</CardTitle>
          </CardHeader>
          <CardContent>
            {rooms.map((room) => (
              <LightControl key={`light-${room}`} room={room} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Window Control</CardTitle>
          </CardHeader>
          <CardContent>
            {rooms.map((room) => (
              <WindowControl key={`window-${room}`} room={room} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Device Control</CardTitle>
          </CardHeader>
          <CardContent>
            {["TV", "Cameras", "Garage", "Music"].map((device) => (
              <DeviceControl key={device} device={device} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Voice Control</CardTitle>
          </CardHeader>
          <CardContent>
            <VoiceControl />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
