"use client";

import React, { useState, useEffect } from "react";
// Utils
import Link from "next/link";
// Components
import Button from "@mui/material/Button";
// Icons
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavButton({ 
  route 
}: { 
  route: string 
}) {
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string>("");

  useEffect (() => {
    function setButton() {
      switch (route.toLowerCase()) {
        case "home":
          setIcon(<HomeIcon />);
          setTitle("Home");
          break;
        case "new-brief":
          setIcon(<EditNoteIcon />);
          setTitle("New Brief");
          break;
        case "my-briefs":
          setIcon(<ArticleIcon />);
          setTitle("My Briefs");
          break;
        case "settings":
          setIcon(<SettingsIcon />);
          setTitle("Settings");
          break;
        case "sign-out":
          setIcon(<LogoutIcon />);
          setTitle("Sign out");
          break;
        default:
          setIcon(null);
      };
    };
  
    if (!icon || !title) {
      setButton();
    };
  }, [
    route,
    icon,
    title,
  ]);

  return route !== "sign-out" ? (
    <Link
      href={`/${route.toLowerCase()}`}
      className="w-full"
    >
      <Button
        id={`${route.toLowerCase()}-button`}
        variant="outlined"
        color="primary"
        startIcon={icon}
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          rounded-md
          hover:cursor-pointer
          hover:opacity-90
        "
      >
        {title}
      </Button>
    </Link>
  ) : (
    <Link
      href={`/${route.toLowerCase()}`}
      className="w-full"
    >
      <Button
        id={`${route.toLowerCase()}-button`}
        variant="outlined"
        startIcon={<LogoutIcon />}
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          rounded-md
          bg-red-200
          border-none
          text-red-500
          hover:cursor-pointer
          hover:opacity-90
        "
      >
        {title}
      </Button>
    </Link>
  )
};