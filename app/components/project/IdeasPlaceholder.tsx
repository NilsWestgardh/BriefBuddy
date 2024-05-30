import React from "react";
// Custom components
import CtaButton from "@/app/components/CtaButton";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function IdeasPlaceholder({ 
  onClick 
}: { 
  onClick: () => void 
}) {
  return (
    <Box
      id="ideas-placeholder-container"
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        min-h-72
        gap-4
        p-4
        bg-neutral-50
      "
    >
      <CtaButton
        tooltip="Create a brief to generate ideas"
        tooltipPlacement="top"
        cta="Create brief"
        onClick={onClick}
      />
      <Typography
        variant="subtitle2"
        className="text-neutral-500 text-center"
      >
        This project has no ideas yet.<br/>
        Create a brief to generate ideas.
      </Typography>
    </Box>
  );
};