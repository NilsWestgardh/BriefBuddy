"use client";

import React from "react";
import Box from "@mui/material/Box";

type ProjectTabContentProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export default function ProjectTabContent(
  props: ProjectTabContentProps
) {
  const { 
    children, 
    value, 
    index, 
    ...other 
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
      className="w-full"
    >
      {value === index && (
        <Box
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            h-full
            relative
          "
        >
          {children}
        </Box>
      )}
    </div>
  );
};