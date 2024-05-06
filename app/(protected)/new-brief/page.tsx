import React from "react";
// Custom Components
import ProjectHeader from "@/app/components/ProjectHeader";
// Components
import Box from "@mui/material/Box";

export default function NewBriefPage() {
  return (
    <Box
      id="new-brief-page-container"
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        h-full
      "
    >
      <ProjectHeader />
      New Brief Page
    </Box>
  );
}