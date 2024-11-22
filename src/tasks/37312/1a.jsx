import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type SortOption = {
  label: string;
  value: string;
  direction: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { label: 'Name (A-Z)', value: 'name', direction: 'asc' },
  { label: 'Name (Z-A)', value: 'name', direction: 'desc' },
  { label: 'Date (Newest)', value: 'date', direction: 'desc' },
  { label: 'Date (Oldest)', value: 'date', direction: 'asc' },
];

const SortDropdown: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    // Here you can add logic to actually perform the sorting
  };

  const getSortIcon = () => {
    if (selectedSort.direction === 'asc') {
      return <ArrowUp className="mr-2 h-4 w-4" />;
    } else {
      return <ArrowDown className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {getSortIcon()}
          {selectedSort.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={`${option.value}-${option.direction}`}
            onClick={() => handleSortChange(option)}
          >
            {option.direction === 'asc' ? (
              <ArrowUp className="mr-2 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-2 h-4 w-4" />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;