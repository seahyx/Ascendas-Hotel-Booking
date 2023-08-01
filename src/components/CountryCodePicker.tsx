import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import countryCodes from '~/components/countryCode.json';

interface CountryCodePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Country code</InputLabel>
      <Select
        label="Country Code"
        value={value}
        onChange={(event) => onChange(event.target.value as string)}
      >
        {countryCodes.map((country) => (
          <MenuItem key={country.dial_code} value={`${country.dial_code}`}>
            {`${country.name} (${country.dial_code})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryCodePicker;
