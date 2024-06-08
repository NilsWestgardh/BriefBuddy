"use client";

// Hooks
import React, { useState } from "react";
import { useTeam } from "@/app/contexts/TeamContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// Types
import { TeamType } from "@/app/utils/types/TeamType";
// Utils
import clsx from "clsx";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// Custom Components
import CreateTeamButton from "@/app/components/team/CreateTeamButton";

export default function TeamSelect() {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { 
    teams, 
    selectedTeam, 
    setSelectedTeam 
  } = useTeam();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "team-popover" : undefined;

  function handleTeamSelect(
    team: TeamType
  ) {
    setSelectedTeam(team);
    if (
      pathname.startsWith("/team/") && 
      pathname !== `/team/${team.id}`
    ) {
      router.push(`/team/${team.id}`);
    }
    handleClose();
  }

  return (
    <Box
      id="sidebar-team-select-container"
      className="
        relative
        flex
        flex-col
        w-full
      "
    >
      <Box
        id="sidebar-team-select-button"
        onClick={handleClick}
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
          border-neutral-700
          bg-white
          hover:border-neutral-500
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
          <Typography variant="caption" className="neutral-500">
            Teams
          </Typography>
          {
            teams.length > 0 ? (
              <Typography
                variant="subtitle2"
                className="
                  font-semibold 
                  text-black
                "
              >
                {selectedTeam ? selectedTeam.name : "Select a team"}
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                className="
                  font-semibold 
                  text-black
                "
              >
                Create a team
              </Typography>
            )
          }
        </Box>
        {open ? (
          <ExpandLessIcon className="text-neutral-700" />
        ) : (
          <ExpandMoreIcon className="text-neutral-700" />
        )}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={clsx("",
          {
            "bg-black/20": open
          }
        )}
      >
        <Box
          id="sidebar-team-select-dropdown"
          className="
            flex
            flex-col
            justify-start
            center-start
            p-2
            pb-3
            rounded-md
            border
            border-black
            bg-white
            w-full
            min-w-[180px]
            gap-2
          "
        >
          <Box
            id="popover-teams-list"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
            "
          >
            {
              teams.length === 0 && (
                <Typography
                  variant="body2"
                  className="
                    bg-neutral-100 
                    p-2
                    rounded-md
                    w-full
                  "
                >
                  No teams found
                </Typography>
              )
            }
            {
              teams.map((
                team: TeamType, 
                index: number
              ) => (
                <Typography
                  key={index}
                  variant="body2"
                  onClick={() => handleTeamSelect(team)}
                  className={clsx(
                    "hover:cursor-pointer hover:bg-neutral-100 p-2 rounded-md w-full",
                    { 
                      "bg-neutral-200 font-semibold": selectedTeam?.id === team.id 
                    }
                  )}
                  style={{ 
                    wordWrap: "break-word" 
                  }}
                >
                  {team?.name ?? "Unnamed team"}
                </Typography>
              ))
            }
          </Box>
          <CreateTeamButton />
        </Box>
      </Popover>
    </Box>
  );
};