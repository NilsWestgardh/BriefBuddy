"use client";

import React from "react";
// Utils
import clsx from "clsx";
// Components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
// Icons
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteIcon from '@mui/icons-material/Note';

const ideas_quantity = 100; // TODO: Replace placeholder with fetched data
const team_size = 5; // TODO: Replace placeholder with fetched data

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
          label={
            <Badge
              badgeContent={ideas_quantity}
              color="primary"
              max={99}
              showZero={false}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                "& .MuiBadge-badge": {
                  transform: "translate(60%, -70%)",
                  marginRight: "6px",
                },
              }}
            >
              Ideas
            </Badge>
          }
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
          label={
            <Badge
              badgeContent={team_size}
              color="primary"
              max={99}
              showZero={false}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                "& .MuiBadge-badge": {
                  transform: "translate(100%, -70%)",
                  marginRight: "6px",
                },
              }}
            >
              Team
            </Badge>
          }
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