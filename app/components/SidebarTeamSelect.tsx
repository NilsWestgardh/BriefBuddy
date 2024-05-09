"use client";

import React, { useState } from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function SidebarTeamSelect({ 
  team 
}: { 
  team: string 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      id="sidebar-team-select-container"
      onClick={() => setIsExpanded(!isExpanded)}
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        gap-2
        py-1
        px-2
        rounded-md
        border
        border-neutral-200
        bg-neutral-100
        hover:shadow-md
        hover:shadow-neutral-100
        hover:border-neutral-300
        hover:cursor-pointer
        hover:opacity-90
      "
    >
      <Box
        id="sidebar-team-select-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
        "
      >
        <Typography
          variant="caption"
          className="neutral-500"
        >
          Team
        </Typography>
        <Typography
          variant="subtitle2"
          className="
            font-semibold 
            text-black
          "
        >
          {team}
        </Typography>
      </Box>
      {isExpanded && (<ExpandLessIcon />)}
      {!isExpanded && (<ExpandMoreIcon />)}
    </Box>
  );
};