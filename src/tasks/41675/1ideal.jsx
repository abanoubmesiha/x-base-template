import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Static list of countries for the dropdown options
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function CountryDropdown({ value, onChange }) {
  const [search, setSearch] = useState(""); // State to manage search input
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [filteredCountries, setFilteredCountries] = useState(countries); // State to manage filtered country list

  // Update filtered countries when search input changes
  useEffect(() => {
    if (search !== value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [search]);

  const handleInputFocus = () => setIsOpen(true); // Show dropdown on input focus
  const handleBlur = () => setTimeout(() => setIsOpen(false), 200); // Hide dropdown on blur with a delay

  // Highlight matching search term in the country name
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
  const [selectedCountry, setSelectedCountry] = useState(""); // State for the selected country

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
