import React from "react";
// Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function TeamTableHeader() {
  return (
    <Box
      id="team-table-header"
      className="
        flex
        flex-row
        justify-between
        items-center
        p-4
        border
        border-neutral-300
        rounded-md
        w-full
      "
    >
      <Typography
        variant="subtitle1"
        className="text-black"
      >
        Team Members
      </Typography>
      <Button
        variant="outlined"
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
        Invite
      </Button>
    </Box>
  );
};