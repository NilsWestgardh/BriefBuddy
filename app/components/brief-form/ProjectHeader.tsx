"use client";

// Hooks
import React from "react";
import { 
  useFormContext, 
} from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Custom components
// import DynamicAvatarGroup from "@/app/components/DynamicAvatarGroup";
// Components
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// Icons
// import SaveIcon from "@mui/icons-material/Save";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ProjectHeader() {
  const {
    watch,
  } = useFormContext<BriefFormType>();
  const form = watch();

  return (
    <Box
      id="project-header-container"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-1
        bg-neutral-100
        border-b
        border-neutral-300
        z-10
        sticky
        top-0
      "
    >
      <Box
        id="breadcrumbs-name-container"
        className="
          flex
          flex-col
          justify-start
          items-start
        "
      >
        <Box
          id="breadcrumbs-container"
          className="
            flex
            flex-row
            justify-start
            items-center
          "
        >
        <Breadcrumbs
          aria-label="breadcrumb"
          className="text-neutral-500"
        >
          <Typography
            variant="body2"
            sx={{ fontSize: 12 }}
            className="
              text-neutral-500
              hover:text-neutral-700
              hover:cursor-pointer
              hover:opacity-90
              align-center
              font-semibold
            "
          >
            Team
            <ExpandMore
              sx={{ fontSize: 16 }}
            />
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 12 }}
            className="
            text-neutral-500
            hover:text-neutral-700
              hover:cursor-pointer
              hover:opacity-90
              align-center
              font-semibold
            "
          >
            Company
            <ExpandMore
              sx={{ fontSize: 16 }}
            />
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 12 }}
            className="
            text-neutral-700
            hover:text-black
              hover:cursor-pointer
              hover:opacity-90
              align-center
              font-semibold
            "
          >
            Project
            <ExpandMore
              sx={{ fontSize: 16 }}
            />
          </Typography>
        </Breadcrumbs>
        </Box>
        {/* TODO: Make dynamic */}
        <Typography
          variant="subtitle1"
          className="
            text-black
            font-semibold
          "
        >
          {form.project_name ? form.project_name : "Project name"}
        </Typography>
      </Box>
      {/* <Box
        id="avatars-buttons-container"
        className="
          flex
          flex-row
          justify-end
          items-center
          gap-2
        "
      >
        <DynamicAvatarGroup />
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          className="
            hover:cursor-pointer
            hover:opacity-90
          "
        >
          Share
        </Button>
        <Button
          variant="outlined"
          startIcon={<SaveIcon style={{ fontSize: 16 }} />}
          size="small"
          className="
            hover:cursor-pointer
            hover:opacity-90
          "
        >
          Save
        </Button>
      </Box> */}
    </Box>
  )
}