"use client";

// Hooks
import React from "react";
import { useTeam } from "@/app/contexts/TeamContext";
// Custom components
import SidebarHeader from "@/app/components/navigation/sidebar/SidebarHeader";
import TeamSelect from "@/app/components/team/TeamSelect";
import NavButton from "@/app/components/navigation/NavButton";
import SignOutButton from "@/app/components/navigation/auth/SignOutButton";
// Components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Icons
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function Sidebar() {
  const { selectedTeam } = useTeam();

  return (
    <Box
      id="sidebar-container"
      className="
        hidden
        md:flex
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
        px-2
        py-3
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
          gap-3
        "
      >
        <SidebarHeader
          version="v1.0.0"
        />
        <TeamSelect />
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
          <NavButton
            route="home"
            title="Home"
            icon={<HomeIcon />}
          />
          <Divider
            flexItem
            className="opacity-20"
          />
          <NavButton
            route={`team/${selectedTeam?.id ?? ''}`}
            title="Team"
            icon={<GroupIcon />}
          />
          <NavButton
            route="contact"
            title="Contact"
            icon={<ContactSupportIcon />}
          />
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
        <NavButton
          route="settings"
          title="Settings"
          icon={<SettingsIcon />}
        />
        <Divider flexItem className="opacity-20" />
        <SignOutButton />
      </Box>
    </Box>
  );
};