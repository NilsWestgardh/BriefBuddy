import React from "react";
// Components
import Button from "@mui/material/Button";
// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NewProjectButton() {
  // TODO: New project logic
  // Create new row in Supabase
  // Redirect to new project page
  
  return (
    <Button
      variant="outlined"
      startIcon={<AssignmentIcon />}
      className="
        w-full
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
      New project
    </Button>
  );
};