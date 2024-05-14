"use client";

// Hooks
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
// Types
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Custom components
import TextField from "@mui/material/TextField";

type TextFieldColor = "primary" | "secondary" | "error" | "info" | "success" | "warning";

type CustomTextInputProps = {
  fieldName: keyof BriefFormType;
  label: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  required: boolean;
  color?: TextFieldColor;
  maxLength?: number;
};

export default function CustomTextInput({
  fieldName,
  label,
  placeholder,
  helperText,
  multiline,
  rows,
  required,
  color,
  maxLength,
}: CustomTextInputProps) {
  const {
    control,
    formState: { 
      isSubmitting, 
      isSubmitted 
    },
  } = useFormContext<BriefFormType>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required={required}
          id={`${label}-input-field`}
          variant="outlined"
          label={label}
          placeholder={placeholder ?? undefined}
          helperText={helperText ?? undefined}
          multiline={multiline ?? undefined}
          rows={rows ?? 1}
          size="small"
          error={!!fieldState.error}
          color={color ? color : "primary"}
          inputProps={{
            maxLength: maxLength ? maxLength : 1500,
          }}
          className="w-full"
        />
      )}
      disabled={isSubmitting || isSubmitted}
    />
  );
};