import React from "react";
// Custom components
import SidebarHeader from "@/app/components/SidebarHeader";
import SidebarTeamSelect from "@/app/components/SidebarTeamSelect";
import NavButton from "@/app/components/NavButton";
// Components
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

export default function Sidebar() {
  return (
    <Box
      id="sidebar-container"
      className="
        flex
        flex-col
        justify-between
        items-center
        top-0
        sticky
        h-[100vh]
        w-[240px]
        bg-neutral-100
        border-r
        border-neutral-300
        p-3
      "
    >
      <Box
        id="sidebar-header"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SidebarHeader
          version="v1.0.0"
        />
        <SidebarTeamSelect
          team="Nils's Team" // TODO: Replace with dynamic data
        />
        <Box
          id="sidebar-nav-buttons"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
          "
        >
          <NavButton route="new-brief" />
          <NavButton route="briefs" />
          <NavButton route="settings" />
        </Box>
      </Box>
      <NavButton route="sign-out" />
    </Box>
  );
}