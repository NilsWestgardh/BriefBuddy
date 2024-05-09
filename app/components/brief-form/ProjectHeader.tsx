import React from "react";
// Custom components
import DynamicAvatarGroup from "@/app/components/DynamicAvatarGroup";
// Components
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ProjectHeader() {
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
        py-2
        bg-neutral-50
        border-b
        border-neutral-100
        z-12
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
            "
          >
            Brief
            <ExpandMore
              sx={{ fontSize: 16 }}
            />
          </Typography>
        </Breadcrumbs>
        </Box>
        <Box
          id="name-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-1
          "
        >
          <Typography
            variant="subtitle2"
            className="text-black"
          >
            Project name
          </Typography>
          <EditIcon
            sx={{ fontSize: 16 }}
            className="
              hover:text-black
              hover:cursor-pointer
              hover:opacity-90
            "
          />
        </Box>
      </Box>
      <Box
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
      </Box>
    </Box>
  )
}