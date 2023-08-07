import * as React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DropdownTitle: React.FC<DropdownProps> = ({ label, value, onChange }) => {
  const options = ['Mr', 'Ms', 'Mrs'];

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownTitle;
