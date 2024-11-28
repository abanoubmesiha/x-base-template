import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "@/index.css";
import React, { useMemo, useState } from "react";

// List of all countries
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

// List of weight units
const units = [
  "Gram",
  "Slug",
  "Grain",
  "Carat",
  "Stone",
  "Ounce",
  "Tonne",
  "Milligram",
  "Kilogram",
  "Pound",
];

// Function to convert weight between units
function convertWeight(weight, unitFrom, unitTo) {
  const conversions = {
    Gram: 1,
    Slug: 14593.9029,
    Grain: 0.06479891,
    Carat: 0.2,
    Stone: 6350.29318,
    Ounce: 28.34952,
    Tonne: 1e6,
    Milligram: 0.001,
    Kilogram: 1000,
    Pound: 453.59237,
  };

  return (weight * conversions[unitFrom]) / conversions[unitTo];
}

// Component to display weight in a specific country
function CountryWeight({ country, weight, unit }) {
  return (
    <div className="flex justify-between p-2 border-b">
      <span>{country}</span>
      <span>
        {weight.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
      </span>
    </div>
  );
}

// Component to display weights in all countries
function CountryWeightsList({ weight, unit }) {
  return (
    <div className="max-h-96 overflow-y-auto mt-4 border rounded-md">
      {countries.map((country) => (
        <CountryWeight
          key={country}
          country={country}
          weight={weight}
          unit={unit}
        />
      ))}
    </div>
  );
}

// Main component for weight conversion
function WeightConverter() {
  const [objectName, setObjectName] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Kilogram");
  const [country, setCountry] = useState("Egypt");

  // Calculate converted weight
  const convertedWeight = useMemo(() => {
    return weight
      ? convertWeight(parseFloat(weight.replace(/,/g, "")), unit, unit)
      : 0;
  }, [weight, unit]);

  return (
    <div className="p-4 sm:p-10 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Weight Converter</CardTitle>
          <CardDescription>Enter the details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Object Name
              </label>
              <Input
                type="text"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                placeholder="Enter object name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight
              </label>
              <Input
                type="text"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )
                }
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Weights in other countries:</p>
          <CountryWeightsList weight={convertedWeight} unit={unit} />
        </CardFooter>
      </Card>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <WeightConverter />
    </div>
  );
}
