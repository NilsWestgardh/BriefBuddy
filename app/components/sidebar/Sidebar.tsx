import React from "react";
// Custom components
import SidebarHeader from "@/app/components/sidebar/SidebarHeader";
import SidebarTeamSelect from "@/app/components/sidebar/SidebarTeamSelect";
import NavButton from "@/app/components/sidebar/NavButton";
import SignOutButton from "@/app/components/auth/SignOutButton";
// Components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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
        p-2
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
          gap-2
        "
      >
        <SidebarHeader
          version="v1.0.0"
        />
        <SidebarTeamSelect
          team="Nils's Team" // TODO: Replace with dynamic data
        />
        <Box
          id="sidebar-primary-nav"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          <NavButton route="home" />
          <Divider flexItem className="opacity-20" />
          {/* TODO: Fetch the currently selected team id */}
          <NavButton route="team" />
          <NavButton route="contact" />
        </Box>
      </Box>
      <Box
        id="sidebar-secondary-nav"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-2
        "
      >
        <NavButton route="settings" />
        <Divider flexItem className="opacity-20" />
        <SignOutButton />
      </Box>
    </Box>
  );
};