// Enable strict mode for better error handling and warnings.
"use client";

// Import necessary icons from the 'lucide-react' package.
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import * as React from "react";

// Import components from the 'ui/command' module.
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// Main component of the app.
function App() {
  // State to manage the open/close status of the CommandDialog.
  const [open, setOpen] = React.useState(false);

  // useEffect to add an event listener for keydown events.
  React.useEffect(() => {
    const down = (e) => {
      // If 'j' key is pressed with 'meta' (command) or 'ctrl' key, toggle CommandDialog.
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); // Prevent the default action for the key event.
        setOpen((open) => !open); // Toggle the open state.
      }
    };

    // Add the event listener when the component mounts.
    document.addEventListener("keydown", down);
    // Remove the event listener when the component unmounts.
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Instruction text with keyboard shortcut */}
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>

      {/* CommandDialog component that opens based on 'open' state */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* Input field for searching commands */}
        <CommandInput placeholder="Type a command or search..." />

        {/* List of commands */}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Group of suggested commands */}
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Group of settings commands */}
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default App;
