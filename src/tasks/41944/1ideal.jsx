import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { OTPInput } from "@/components/ui/otp-input";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

export default function App() {
  const [verificationType, setVerificationType] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerificationChange = (event) => {
    setVerificationType(event.target.value);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Verification Type:", verificationType);
    console.log("OTP:", otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <CardTitle>User Verification</CardTitle>
          <CardDescription>
            Choose your verification method and enter the OTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="verificationType" className="mb-2">
                Verification Method
              </label>
              <Combobox
                id="verificationType"
                value={verificationType}
                onChange={handleVerificationChange}
                options={[
                  { value: "SMS", label: "SMS" },
                  { value: "Email", label: "Email" },
                  { value: "Phone Call", label: "Phone Call" },
                ]}
                placeholder="Select verification method"
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="otp" className="mb-2">
                OTP
              </label>
              <OTPInput
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                separator={<span>-</span>}
                className="otp-input"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-500 rounded"
            >
              Verify
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
