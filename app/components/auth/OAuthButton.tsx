"use client";

// Hooks
import React, { useState, useEffect } from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Components
import { Button } from "@mui/material";
// Icons
import GoogleIcon from "@mui/icons-material/Google";
import { FaMicrosoft } from "react-icons/fa";
import { FaSlack } from "react-icons/fa";

type NewAuthButtonProps = {
  cta: string | null;
  provider: "google" | "slack" | "azure" | null;
  disabled?: boolean;
};

export default function OAuthButton({
  cta,
  provider,
  disabled = false,
}: NewAuthButtonProps) {
  const [providerIcon, setProviderIcon] = useState<React.ReactNode | null>(null);

  const supabase = createClient();

  // Sign in handler
  async function handleSignIn() {
    if (provider !== null) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.log(error);
      };
    };
  };

  useEffect(() => {
    switch (provider) {
      case "google":
        setProviderIcon(<GoogleIcon />);
        break;
      case "slack":
        setProviderIcon(<FaSlack />);
        break;
      case "azure":
        setProviderIcon(<FaMicrosoft />);
        break;
      default:
        setProviderIcon(null);
        break;
    }
  }, [provider]);

  return (
    <Button
      onClick={handleSignIn}
      variant="outlined"
      disabled={disabled}
      startIcon={providerIcon}
      size="large"
      className="flex justify-center items-center w-full"
    >
      {cta}
    </Button>
  );
}
