// Hooks
import React from "react";
import { usePathname } from 'next/navigation';
// Utils
import Link from "next/link";
import clsx from "clsx";
// Components
import Button from "@mui/material/Button";

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

  return (
    <Link href={`/${route}`} className="w-full">
      <Button
        id={`${route.toLowerCase()}-button`}
        color="primary"
        size="small"
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