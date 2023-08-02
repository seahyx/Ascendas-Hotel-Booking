import React from "react";
import { MuiTelInput } from "mui-tel-input";

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
    if (newValue.replace(/\D/g, "").length <= 10) {
      // Check if the phone number is 10 digits or fewer
      onChange(newValue);
    } else {
      // Display a warning or handle the error
      console.warn("Phone number cannot be greater than 10 digits!");
    }
  };

  return (
    <>
      <MuiTelInput value={value} onChange={handleChange} />
      {value.replace(/\D/g, "").length > 10 && (
        <span style={{ color: "red", fontSize: "12px" }}>
          Phone number cannot be greater than 10 digits!
        </span>
      )}
    </>
  );
};

export default PhoneNumber;
