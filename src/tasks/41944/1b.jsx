import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

const verificationMethods = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
];

function VerificationMethodSelector({ selectedMethod, setSelectedMethod }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedMethod
            ? verificationMethods.find(
                (method) => method.value === selectedMethod
              )?.label
            : "Select verification method..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search verification method..." />
          <CommandEmpty>No verification method found.</CommandEmpty>
          <CommandGroup>
            {verificationMethods.map((method) => (
              <CommandItem
                key={method.value}
                onSelect={(currentValue) => {
                  setSelectedMethod(
                    currentValue === selectedMethod ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedMethod === method.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {method.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function OTPInput({ otp, setOTP }) {
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOTP([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-between mt-4">
      {otp.map((data, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 text-center text-xl"
        />
      ))}
    </div>
  );
}

export default function App() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [otp, setOTP] = useState(new Array(6).fill(""));

  const handleVerify = () => {
    const otpValue = otp.join("");
    console.log("Verification method:", selectedMethod);
    console.log("OTP:", otpValue);
    // Here you would typically send the verification data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-method">Verification Method</Label>
              <VerificationMethodSelector
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <OTPInput otp={otp} setOTP={setOTP} />
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleVerify}
              disabled={!selectedMethod || otp.some((digit) => digit === "")}
            >
              Verify
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
