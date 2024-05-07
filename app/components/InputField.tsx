import React from "react";
// Custom components
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  label: string;
  helperText: string | null;
  required: boolean;
  error: boolean;
};

export default function InputField({
  label,
  helperText,
  required,
  error,
}: InputFieldProps) {
  return (
    <TextField
      required={required}
      id={`${label}-input-field`}
      variant="outlined"
      label={label}
      helperText={helperText ? helperText : null}
      size="small"
      error={error} // TODO: Dynamic logic
      color="primary" // TODO: Dynamic logic
      className="
        w-full
      "
    />
  );
};