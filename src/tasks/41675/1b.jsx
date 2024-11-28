import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Country data can be fetched from an API or included as a static list
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "...",
  "Zimbabwe", // Example, replace with full list
];

function CountryDropdown({ value, onChange }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [search]);

  const handleInputFocus = () => setIsOpen(true);
  const handleBlur = () => setTimeout(() => setIsOpen(false), 200);

  const highlightMatch = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="relative w-full max-w-xs">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        placeholder="Type to search countries..."
      />
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto">
          <ScrollArea className="h-full">
            {filteredCountries.map((country, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-muted",
                  country === value && "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  onChange(country);
                  setSearch(country);
                  setIsOpen(false);
                }}
              >
                {search ? highlightMatch(country, search) : country}
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-2 text-muted-foreground">
                No countries found.
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="sm:max-w-sm w-full p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Country Selector
        </h1>
        <CountryDropdown
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
        <p className="mt-4 text-center">Selected: {selectedCountry}</p>
      </div>
    </div>
  );
}
