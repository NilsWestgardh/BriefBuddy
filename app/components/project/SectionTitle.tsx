import React from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ 
  title, 
  subtitle 
}: SectionTitleProps ) {
  return (
    <Box
      id={`section-${title}-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
      "
    >
      <Typography
        variant="h6"
        className="
        text-black
          font-medium
        "
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};