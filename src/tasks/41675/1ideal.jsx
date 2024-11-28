import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/index.css";
import { useMemo, useRef, useState } from "react";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
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
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
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
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
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
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
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
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
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
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
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

function Dropdown({ options, value, onChange }) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      ),
    [search, options]
  );

  const handleBlur = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setTimeout(() => {
        setShowDropdown(false);
      }, 100);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Type to search..."
        value={search}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showDropdown && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0
            ? filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-100 ${
                    option === value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    console.log("🚀 ~ Dropdown ~ option:", option);
                    onChange(option);
                    setSearch(option);
                    setShowDropdown(false);
                  }}
                >
                  {highlightSearch(option, search)}
                </li>
              ))
            : options.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-100 ${
                    option === value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    console.log("🚀 ~ Dropdown ~ option:", option);
                    onChange(option);
                    setSearch(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

function highlightSearch(text, search) {
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  console.log("🚀 ~ App ~ selectedCountry:", selectedCountry);

  return (
    <div className="p-4 sm:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Country Selector</CardTitle>
          <CardDescription>
            Select a country from the dropdown below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dropdown
            options={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
          />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Selected Country: {selectedCountry}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
