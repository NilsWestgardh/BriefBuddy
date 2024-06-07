"use client";

// Hooks
import React, { useState } from "react";
import { useTeam } from "@/app/contexts/TeamContext";
// Custom components
import CreateProjectModal from "@/app/components/project/CreateProjectModal";
// Components
import Button from "@mui/material/Button";

export default function CreateProjectButton() {
  const [open, setOpen] = useState(false);
  const { selectedTeam } = useTeam();

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
        size="small"
        className="
          flex
          justify-center
          items-center
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
      <CreateProjectModal 
        open={open} 
        handleClose={handleClose}
        projects_limit={selectedTeam?.projects_limit}
      />
    </>
  );
};