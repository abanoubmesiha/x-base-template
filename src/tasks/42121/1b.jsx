import { Command } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useCallback, useEffect, useState } from "react";

const options = [
  { id: 1, name: "Calendar", icon: "📅" },
  { id: 2, name: "Search Emoji", icon: "🔍" },
  { id: 3, name: "Calculator", icon: "🧮" },
  { id: 4, name: "Profile", icon: "👤" },
  { id: 5, name: "Billing", icon: "💳" },
  { id: 6, name: "Settings", icon: "⚙️" },
];

const CommandMenu = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [search]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Command Menu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search options..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-3"
          />
          <ScrollArea className="h-[300px]">
            {filteredOptions.length > 0 ? (
              <>
                <h3 className="mb-2 font-semibold">Suggestions</h3>
                <Command>
                  <Command.List>
                    {filteredOptions.map((option) => (
                      <Command.Item
                        key={option.id}
                        onSelect={() => {
                          console.log(`Selected: ${option.name}`);
                          setIsOpen(false);
                        }}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span>{option.name}</span>
                      </Command.Item>
                    ))}
                  </Command.List>
                </Command>
              </>
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === "j") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-lg mb-4">
          Press{" "}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            J
          </kbd>{" "}
          to open the command menu
        </p>
      </div>
      <CommandMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
