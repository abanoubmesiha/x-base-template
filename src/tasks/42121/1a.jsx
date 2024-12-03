import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import {
  CalculatorIcon,
  CalendarIcon,
  CogIcon,
  DollarSignIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const actions = [
  { name: "Calendar", icon: CalendarIcon },
  { name: "Search Emoji", icon: SearchIcon },
  { name: "Calculator", icon: CalculatorIcon },
  { name: "Profile", icon: UserIcon },
  { name: "Billing", icon: DollarSignIcon },
  { name: "Settings", icon: CogIcon },
];

const ActionItem = ({ action, onClick }) => (
  <Button
    variant="ghost"
    className="w-full justify-start"
    onClick={() => onClick(action)}
  >
    <action.icon className="mr-2 h-4 w-4" />
    {action.name}
  </Button>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredActions, setFilteredActions] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "j") {
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const results = actions.filter((action) =>
      action.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredActions(results);
  }, [search]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-sm text-gray-500">
        Press Ctrl + J to open the command palette
      </p>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="sm:max-w-lg">
          <ModalHeader>
            <ModalTitle>Command Palette</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Search for actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            {filteredActions.length > 0 ? (
              <>
                <h3 className="text-xs font-semibold text-gray-500 mb-2">
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {filteredActions.map((action) => (
                    <ActionItem
                      key={action.name}
                      action={action}
                      onClick={() => console.log(`Selected ${action.name}`)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-400">No results found.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

// Assuming these components exist in your Shadcn setup
const ModalTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);
