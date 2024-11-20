import React from 'react';
import { 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SortOption {
  label: string;
  value: string;
  direction: 'asc' | 'desc';
}

const sortOptions: SortOption[] = [
  { label: 'Name Ascending', value: 'name', direction: 'asc' },
  { label: 'Name Descending', value: 'name', direction: 'desc' },
  // Add more options as needed
];

const SortDropdown: React.FC = () => {
  const [selectedSort, setSelectedSort] = React.useState<SortOption | null>(null);

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    // Here you would typically call a function to sort your data
    // sortData(option.value, option.direction);
  };

  return (
    <Menu>
      <MenuButton 
        as={Icon} 
        cursor="pointer"
        icon={selectedSort?.direction === 'asc' ? <ChevronDown /> : <ChevronUp />}
        variant="ghost"
        rightIcon={<ChevronDown />} // This can be static or dynamic based on your design preference
      >
        Sort
      </MenuButton>
      <MenuList>
        {sortOptions.map((option) => (
          <MenuItem 
            key={option.value + option.direction} 
            onClick={() => handleSortChange(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortDropdown;