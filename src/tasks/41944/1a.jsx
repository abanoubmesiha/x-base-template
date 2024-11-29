import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { OtpInput } from "@/components/ui/otp-input";
import { ToastProvider, useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

const VerificationMethodCombobox = ({ value, onChange }) => {
  const methods = [
    { value: "sms", label: "SMS" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone Call" },
  ];

  return (
    <Combobox
      value={value}
      onValueChange={onChange}
      items={methods}
      placeholder="Select Verification Method"
    >
      {methods.map((method) => (
        <Combobox.Option key={method.value} value={method.value}>
          {method.label}
        </Combobox.Option>
      ))}
    </Combobox>
  );
};

function VerificationScreen() {
  const [method, setMethod] = useState("sms");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "OTP must be 6 digits long.",
        variant: "destructive",
      });
      return;
    }
    // Here you would typically send the OTP for verification
    toast({
      title: "Success",
      description: `Verification via ${method.toUpperCase()} successful!`,
    });
  };

  return (
    <Card className="max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Verify Your Identity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="verificationMethod">Verification Method</Label>
          <VerificationMethodCombobox value={method} onChange={setMethod} />
          <Label htmlFor="otp">Enter OTP</Label>
          <OtpInput value={otp} onChange={setOtp} numInputs={6} />
          <Button onClick={handleSubmit} className="w-full">
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <VerificationScreen />
      </div>
    </ToastProvider>
  );
}
