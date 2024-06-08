"use client";

// Hooks
import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// Utils
import clsx from "clsx";
// Components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// Icons
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton() {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  async function handleSignOut() {
    setButtonDisabled(!buttonDisabled);
    const response = await fetch(`${window.location.origin}/api/auth/logout-user`, {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.log("Logout failed.");
    }
    setButtonDisabled(!buttonDisabled);
  };

  return (
    isPhone ? (
      <>
      <Tooltip
        title="Log out"
        placement="bottom"
      >
        <IconButton
          id="sign-out-button"
          onClick={handleSignOut}
          color={buttonDisabled ? "error" : "secondary"}
          disabled={buttonDisabled}
          className="
            hover:bg-red-100
            hover:text-red-500
            hover:cursor-pointer
            hover:opacity-90
            transition-all
          "
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
      </>
    ) : (
      <Button
        id="sign-out-button"
        onClick={handleSignOut}
        startIcon={!isTablet ? <LogoutIcon /> : null}
        size={!isPhone ? "large" : "small"}
        color={buttonDisabled ? "error" : "secondary"}
        disabled={buttonDisabled}
        className={clsx("flex flex-row items-center hover:bg-red-100 hover:text-red-500 hover:cursor-pointer hover:opacity-90 transition-all min-w-[96px]", {
          "justify-start w-full": !isTablet,
        })}
      >
        {buttonDisabled ? "Logging out.." : "Log out"}
      </Button>
    )
    
  );
}
