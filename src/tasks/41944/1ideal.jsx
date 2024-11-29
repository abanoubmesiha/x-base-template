import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

function Combobox({ id, value, onChange, options, placeholder, className }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={className}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange({
                      target: {
                        value: currentValue === value ? "" : currentValue,
                      },
                    });
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

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
              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                className="otp-input"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
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
