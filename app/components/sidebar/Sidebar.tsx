import React from "react";
// Custom components
import SidebarHeader from "@/app/components/sidebar/SidebarHeader";
import SidebarTeamSelect from "@/app/components/sidebar/SidebarTeamSelect";
import NavButton from "@/app/components/sidebar/NavButton";
import SignOutButton from "@/app/components/auth/SignOutButton";
import NewProjectButton from "@/app/components/sidebar/NewProjectButton";
// Components
import Box from "@mui/material/Box";

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
        bg-neutral-50
        border-r
        border-neutral-200
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
          <NewProjectButton />
          <NavButton route="projects" />
          <NavButton route="settings" />
        </Box>
      </Box>
      <SignOutButton />
    </Box>
  );
};