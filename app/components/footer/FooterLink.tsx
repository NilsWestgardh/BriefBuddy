import React from "react";
// Utils
import Link from "next/link";
// Components
import Typography from '@mui/material/Typography';

type FooterLinkProps = {
  url: string;
  linkTitle: string;
};

export default function FooterLink({ 
  url, 
  linkTitle
}: FooterLinkProps) {
  return (
    <Link href={url}>
      <Typography
        variant="body2"
        className="
          hover:cursor-pointer
          hover:opacity-90
          hover:underline
        "
      >
        {/* TODO: Add icon */}
        {linkTitle}
      </Typography>
    </Link>
  );
};