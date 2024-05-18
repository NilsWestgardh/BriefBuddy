import React from "react";
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Custom components
import FooterLink from "@/app/components/footer/FooterLink"

type FooterColumnProps = {
  columnTitle: string;
  dataObject: object;
};

export default function FooterColumn({
  columnTitle,
  dataObject,

}: FooterColumnProps) {
  return (
    <Box
      id={`footer-col-${columnTitle.toLowerCase()}`}
      className="
        flex
        flex-col
        justify-start
        items-start
      "
    >
      <Typography
        variant="overline"
        className="font-semibold"
      >
        {columnTitle}
      </Typography>
      <Box
        id={`footer-col-${columnTitle.toLowerCase()}-links`}
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-1
        "
      >
        {Object.values(dataObject).map((link, index) => (
          <FooterLink
            key={index}
            url={link.url}
            linkTitle={link.linkTitle}
          />
        ))}
      </Box>
    </Box>
  );
};