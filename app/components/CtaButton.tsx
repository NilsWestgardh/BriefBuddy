"use client";

// Hooks
import React from "react";
// Components
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

type SubmitButtonProps = {
  tooltip?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  cta: string;
  icon?: React.ReactNode | null;
  onClick?: () => void;
};

export default function SubmitButton({ 
  tooltip,
  tooltipPlacement,
  cta,
  icon,
  onClick,
 }: SubmitButtonProps) {

  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Button
        onClick={onClick}
        variant="outlined"
        size="large"
        color="primary"
        endIcon={icon ? icon : null}
        className="
          bg-white
          hover:bg-neutral-100
          transition-all
          border-neutral-700
          hover:border-black
        "
        sx={{
          boxShadow: "0 2px 0 0 #404040",
          "&:hover": {
            boxShadow: "0 2px 0 0 #000000"
          }
        }}
      >
        {cta}
      </Button>
    </Tooltip>
  );
};