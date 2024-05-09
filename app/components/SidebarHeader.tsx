import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SidebarHeader({ 
  version 
}: { 
  version: string
}) {
  return (
    <Link
      href="/home"
      className="w-full"
    >
      <Box
        id="sidebar-header"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-2
          hover:cursor-pointer
          hover:opacity-90
        "
      >
        <Image
          src="/briefbuddy-logo.png"
          alt="BriefBuddy logo"
          width={48}
          height={48}
          className="
            rounded-md
          "
        />
        <Box
          id="sidebar-header-title"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
          "
        >
          <Typography
            variant="subtitle1"
            className="
              font-semibold
              text-black
            "
          >
            BriefBuddy
          </Typography>
          <Typography
            variant="caption"
            className="
              text-neutral-400
            "
          >
            {version}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};