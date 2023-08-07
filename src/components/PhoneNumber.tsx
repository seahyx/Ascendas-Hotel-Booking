import React from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

interface PhoneNumberProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  const isValidTel = matchIsValidTel(value);

  return (
    <>
      <MuiTelInput value={value} onChange={handleChange} error={!isValidTel} />
      {!isValidTel && (
        <span style={{ color: "red", fontSize: "12px" }}>
          Invalid phone number format!
        </span>
      )}
    </>
  );
};

export default PhoneNumber;
