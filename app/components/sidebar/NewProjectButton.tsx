"use client";

// Hooks
import React, { useState } from "react";
// Custom components
import NewProjectModal from "@/app/components/project/NewProjectModal";
// Components
import Button from "@mui/material/Button";
// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NewProjectButton() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };
  
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
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
      <NewProjectModal 
        open={open} 
        handleClose={handleClose}
        projects_limit={5} // TODO: Replace with actual limit from team profile
      />
    </>
  );
};