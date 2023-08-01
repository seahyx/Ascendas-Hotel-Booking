import React, { useState, useEffect } from 'react';
import { Box,MenuItem, Select, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import countryCodes from '~/components/countryCode.json';
import { isValidPhoneNumber } from 'libphonenumber-js';

interface PhoneNumberTextFieldProps {
  countryCode: string;
  onChange: (phoneNumber: string) => void;
}

const PhoneNumberTextField: React.FC<PhoneNumberTextFieldProps> = ({ countryCode, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsValid(true); // Reset the error when the country code changes
    setIsDisabled(!countryCode); // Disable the field if no country code is selected
  }, [countryCode]);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    if (!countryCode) {
      // If no country code is selected, don't perform validation
      onChange(event.target.value);
    } else {
      // Validate the phone number for the selected country code
      const phoneNumberWithCountryCode = `+${countryCode}${event.target.value}`;
      const isValidNumber = isValidPhoneNumber(phoneNumberWithCountryCode);
      setIsValid(isValidNumber);
      if (isValidNumber) {
        onChange(phoneNumberWithCountryCode);
      }
    }
  };

  return (
    <>
    <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
        <Box style={{ flex:2,display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Country Code</Box>  
          
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <FormControl variant="outlined">
        <InputLabel htmlFor="country-code">Country Code</InputLabel>
        <Select
          
          value={countryCode}
          onChange={(event) => handlePhoneNumberChange(event as React.ChangeEvent<HTMLInputElement>)}
        >
          {countryCodes.map((country) => (
            <MenuItem key={country.dial_code} value={country.dial_code}>
              {`${country.name} (${country.dial_code})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Box>  
        </Box>
        <Box style={{flex:5 ,display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Phone Number</Box> 
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <FormControl variant="outlined" error={!isValid}>
        
        <Input
          id="phone-number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          disabled={isDisabled}
        />
        {!isValid && (
          <FormHelperText>Error: Invalid phone number for the selected country code.</FormHelperText>
        )}
      </FormControl>
          </Box> 
        </Box>
      </Box>
      
      
    </>
  );
};

export default PhoneNumberTextField;
