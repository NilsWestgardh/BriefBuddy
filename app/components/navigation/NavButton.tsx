"use client";

// Hooks
import React from "react";
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// Utils
import Link from "next/link";
import clsx from "clsx";
// Components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type NavButtonProps = {
  route: string;
  title?: string;
  icon?: React.ReactNode;
};

export default function NavButton({ 
  route,
  title,
  icon,
 }: NavButtonProps) {
  const currentPathname = usePathname();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Link
      href={`/${route}`}
      className={clsx("", {
        "w-full": isLaptop || isTablet,
      })}
    >
      {isPhone ? (
        <>
          <Tooltip
            title={title}
            placement="bottom"
          >
            <IconButton
              id={`${route.toLowerCase()}-iconbutton`}
              color="primary"
              className={clsx("hover:cursor-pointer transition-all", {
                "hover:opacity-80": currentPathname.includes(route.toLowerCase()),
                "opacity-50 hover:opacity-100": !currentPathname.includes(route.toLowerCase()),
              })}
            >
              {icon}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Button
          id={`${route.toLowerCase()}-button`}
          color="primary"
          size="large"
          startIcon={isLaptop ? icon : null}
          className={clsx("flex flex-row items-center hover:cursor-pointer transition-all", {
            "justify-start w-full": isLaptop || isTablet,
            "hover:opacity-80": currentPathname.includes(route.toLowerCase()),
            "opacity-50 hover:opacity-100": !currentPathname.includes(route.toLowerCase()),
          })}
        >
          {title}
        </Button>
      )}
    </Link>
  );
};
