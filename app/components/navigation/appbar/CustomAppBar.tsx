"use client";

// Hooks
import React from "react";
import { useTeam } from "@/app/contexts/TeamContext";
// Utils
// import Link from "next/link";
import Image from "next/image";
// Custom components
import NavButton from "@/app/components/navigation/NavButton";
import SignOutButton from "@/app/components/navigation/auth/SignOutButton";
import TeamSelect from "@/app/components/team/TeamSelect";
// Components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
// Icons
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function CustomAppBar() {
  const { selectedTeam } = useTeam();

  return (
    <AppBar
      className="
        md:hidden
        flex
        flex-row
        items-center
        w-full
        top-0
        sticky
        py-1
        text-black
        bg-neutral-50
        border-b
        border-neutral-200
        shadow-none
      "
    >
      <Toolbar
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
        <Box
          id="appbar-menu-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            w-full
            gap-4
          "
        >
          <Box
            id="appbar-logo-team-select"
            className="
              flex
              flex-row
              justify-start
              items-center
              gap-6
              min-w-[144px]
            "
          >
            <Image
              src="/briefbuddy_logo_black_stacked.svg"
              width={60}
              height={60}
              alt="BriefBuddy Logo"
              className="md:block hidden"
            />
            <TeamSelect />
          </Box>
          <Box
            id="nav-buttons-container"
            className="
              flex
              flex-row
              justify-start
              items-center
              gap-1
            "
          >
            <NavButton
              route="home"
              title="Home"
              icon={<HomeIcon />}
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
            <NavButton
              route="settings"
              title="Settings"
              icon={<SettingsIcon />}
            />
          </Box>
        </Box>
        <SignOutButton />
      </Toolbar>
    </AppBar>
  );
};