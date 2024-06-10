// hooks
import React from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Settings() {
  return (
    <Box
      id="settings-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-6
        p-6
      "
    >
      <Typography
        variant="h4"
        className="
          text-black
          font-semibold
        "
      >
        Settings
      </Typography>
      <Box
        id="settings-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
          rounded-md
          border
          border-neutral-300
          p-6
        "
      >
        <Typography
          variant="body1"
          className="
          text-neutral-700
          "
        >
          Account and team settings coming soon...
        </Typography>
      </Box>
    </Box>
  )
};