import React from "react";
// Custom components
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  required: boolean;
  error: boolean;
};

export default function InputField({
  label,
  placeholder,
  helperText,
  multiline,
  rows,
  required,
  error,
}: InputFieldProps) {
  return (
    <TextField
      required={required}
      id={`${label}-input-field`}
      variant="outlined"
      label={label}
      placeholder={placeholder ?? undefined}
      helperText={helperText ?? undefined}
      multiline={multiline ?? undefined}
      rows={rows ?? 1}
      size="small"
      error={error} // TODO: Dynamic logic
      color="primary" // TODO: Dynamic logic
      className="
        w-full
      "
    />
  );
};