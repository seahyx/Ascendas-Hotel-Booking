import React, { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface EmailInputProps {
  label: string;
  onValidEmailChange: (email: string) => void;
  inputProps?: TextFieldProps;
}

const isValidEmail = (email: string) => {
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return emailRegex.test(email);
};

export default function EmailInput({
  label,
  onValidEmailChange,
  inputProps,
}: EmailInputProps) {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isValid = isValidEmail(newEmail);
    setIsEmailValid(isValid);
    if (isValid) {
      onValidEmailChange(newEmail);
    } else {
      onValidEmailChange("");
    }
  };

  return (
    <TextField
      fullWidth
      id="email"
      name="email"
      type="email"
      label={label}
      inputProps={{ style: { textTransform: "lowercase" } }}
      onChange={handleEmailChange}
      value={email}
      error={!isEmailValid}
      helperText={!isEmailValid ? "Please enter a valid email address" : ""}
      {...inputProps}
    />
  );
}
