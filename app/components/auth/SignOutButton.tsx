"use client";

// Hooks
import React, { 
  useState 
} from "react";
// Components
import { Button } from "@mui/material";
// Icons
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton() {
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
    <Button
      id="sign-out-button"
      onClick={handleSignOut}
      startIcon={<LogoutIcon />}
      color={buttonDisabled ? "error" : "secondary"}
      disabled={buttonDisabled}
      className="
        flex
        flex-row
        justify-start
        items-center
        w-full
        hover:bg-red-100
        hover:text-red-500
        hover:cursor-pointer
        hover:opacity-90
        transition-all
      "
    >
      {buttonDisabled ? "Logging out.." : "Log out"}
    </Button>
  );
}
