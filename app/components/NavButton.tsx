"use client";

// Hooks
import React, {
  useState,
  useEffect 
} from "react";
import { usePathname } from 'next/navigation';
// Utils
import Link from "next/link";
import clsx from "clsx";
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

  const currentPathname = usePathname();

  // setButton
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
        case "briefs":
          setIcon(<ArticleIcon />);
          setTitle("Briefs");
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
        color="primary"
        startIcon={icon}
        className={clsx("flex flex-row justify-start items-center w-full hover:cursor-pointer",
          {
            "hover:opacity-80": currentPathname.includes(route.toLowerCase()),
            "opacity-50 hover:opacity-100 transition-all": !currentPathname.includes(route.toLowerCase()),
          }
        )}
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
        startIcon={<LogoutIcon className="hover:text-red-500" />}
        color={"secondary"}
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
        "
      >
        {title}
      </Button>
    </Link>
  )
};