import React from "react";
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

export default function Footer() {
  return (
    <Box
      id="footer-container"
      className="
        flex
        flex-col
        justify-between
        items-center
        w-full
        min-h-24
        py-4
        bg-neutral-100
        
      "
    >
      <Typography
        variant="overline"
      >
        Footer
      </Typography>
    </Box>
  );
};