import React from "react";
import { MuiTelInput, MuiTelInputProps, matchIsValidTel } from "mui-tel-input";

interface PhoneNumberProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputProps?: MuiTelInputProps;
}

const PhoneNumber = ({
  label,
  value,
  onChange,
  className,
  inputProps,
}: PhoneNumberProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  const isValidTel = value ? matchIsValidTel(value) : true;

  return (
    <MuiTelInput
      className={className}
      label={label}
      value={value}
      onChange={handleChange}
      error={!isValidTel}
      helperText={!isValidTel ? "Invalid phone number!" : undefined}
      {...inputProps}
    />
  );
};

export default PhoneNumber;
