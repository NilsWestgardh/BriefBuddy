// hooks
import React from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TeamIdPage({ 
  params 
}: { params: { 
  slug: string 
}}) {
  return (
    <Box
      id={`team-${params.slug}-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-2
        p-4
      "
    >
      <Typography
        variant="h4"
        className="
          text-black
          font-semibold
          mb-2
        "
      >
        Team {params.slug} settings
      </Typography>
    </Box>
  )
};