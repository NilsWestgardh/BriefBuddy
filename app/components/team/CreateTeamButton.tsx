"use client";

// Hooks
import React, { useState } from "react";
// Custom components
import CreateTeamModal from "@/app/components/team/CreateTeamModal";
// Components
import Button from "@mui/material/Button";
// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CreateTeamButton() {
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
        endIcon={<ArrowForwardIcon />}
        size="small"
        className="
          flex
          flex-row
          justify-between
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
        New Team
      </Button>
      <CreateTeamModal 
        open={open} 
        handleClose={handleClose}
      />
    </>
  );
};