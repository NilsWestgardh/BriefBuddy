"use client";

// Hooks
import React from "react";
import { useFormContext } from "react-hook-form";
// Components
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// Icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type SubmitButtonProps = {
  cta: string;
  feedback: string;
  isGuest?: boolean;
};

export default function SubmitButton({ 
  cta,
  feedback,
  isGuest,
 }: SubmitButtonProps) {
  const {
    formState: { 
      isSubmitting, 
      isSubmitted, 
      isValid 
    },
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="outlined"
      size="large"
      disabled={
        !isValid || 
        isSubmitting || 
        isGuest
      }
      color={isValid ? "primary" : "secondary"}
      endIcon={
        !isSubmitting ? <ArrowForwardIcon /> 
        : <CircularProgress
            color="primary"
            size={24}
          />
      }
      className="
        w-full
        hover:cursor-pointer
        justify-between
      "
    >
      {isSubmitted ? feedback : cta}
    </Button>
  );
};