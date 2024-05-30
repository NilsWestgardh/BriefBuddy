"use client";

import React from "react";
// Utils
import clsx from "clsx";
// Components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// Icons
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteIcon from '@mui/icons-material/Note';

type TabsMenuProps = {
  tab: number;
  handleTabChange: (
    event: React.SyntheticEvent, 
    newTab: number
  ) => void;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default function TabsMenu({ 
  tab, 
  handleTabChange 
}: TabsMenuProps) {

  return (
    <Box
      id="project-tabs-menu-container"
      className="
        w-full 
        bg-white
        border-b
        border-neutral-300
      "
    >
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="Project tabs"
      >
        <Tab
          label="Brief"
          icon={<AssignmentIcon />}
          iconPosition="start"
          {...a11yProps(0)}
          className={clsx(
            "hover:opacity-100 hover:bg-neutral-50",
            tab === 0 && "bg-neutral-100 opacity-100",
            tab !== 0 && "opacity-80",
          )}
        />
        <Tab
          label="Ideas"
          icon={<NoteIcon />}
          iconPosition="start"
          {...a11yProps(1)}
          className={clsx(
            "hover:opacity-100 hover:bg-neutral-50",
            tab === 1 && "bg-neutral-100 opacity-100",
            tab !== 1 && "opacity-80",
          )}
        />
        <Tab
          label="Team"
          icon={<GroupsIcon />}
          iconPosition="start"
          {...a11yProps(2)}
          className={clsx(
            "hover:opacity-100 hover:bg-neutral-50",
            tab === 2 && "bg-neutral-100 opacity-100",
            tab !== 2 && "opacity-80",
          )}
        />
      </Tabs>
    </Box>
  );
};