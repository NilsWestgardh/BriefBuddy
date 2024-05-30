"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
// Utils
import Link from "next/link";
import clsx from "clsx";
// Components
import Button from "@mui/material/Button";
// Icons
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavButtonProps {
  route: string;
}

export default function NavButton({ route }: NavButtonProps) {
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string>("");

  const currentPathname = usePathname();

  useEffect(() => {
    function setButton() {
      switch (route.toLowerCase()) {
        case "home":
          setIcon(<HomeIcon />);
          setTitle("Home");
          break;
        case "projects":
          setIcon(<AssignmentIcon />);
          setTitle("Projects");
          break;
        case "settings":
          setIcon(<SettingsIcon />);
          setTitle("Settings");
          break;
        default:
          setIcon(null);
          setTitle("");
      }
    }

    setButton();
  }, [route]);

  return (
    <Link
      href={`/${route.toLowerCase()}`}
      className="w-full"
    >
      <Button
        id={`${route.toLowerCase()}-button`}
        color="primary"
        startIcon={icon}
        className={clsx("flex flex-row justify-start items-center w-full hover:cursor-pointer", {
          "hover:opacity-80": currentPathname.includes(route.toLowerCase()),
          "opacity-50 hover:opacity-100 transition-all": !currentPathname.includes(route.toLowerCase()),
        })}
      >
        {title}
      </Button>
    </Link>
  );
};