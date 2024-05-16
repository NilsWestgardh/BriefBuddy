"use client";

// Hooks
import React from "react";
import { 
  useFormContext, 
  Controller 
} from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Custom components
import DynamicAvatarGroup from "@/app/components/DynamicAvatarGroup";
// Components
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ProjectHeader() {
  const {
    control,
    formState: { 
      isSubmitting, 
      isSubmitted,
  },
  } = useFormContext<BriefFormType>();

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
            border
            border-red-500
          "
        >
          {/* <Typography
            variant="subtitle1"
            className="
              text-black
              font-semibold
            "
          >
            Project name
          </Typography> */}
          <Controller
            name="project_name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                id="project-name-input-field"
                label="Project name"
                placeholder="Project name"
                size="small"
                error={!!fieldState.error}
                color="primary"
                inputProps={{
                  maxLength: 50,
                  style: {
                    paddingLeft: "0",
                    textAlign: "left",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    textAlign: "left",
                    transformOrigin: "top left",
                    left: "0", // Align the label text to the left
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0",
                  },
                  '& .MuiOutlinedInput-input': {
                    paddingLeft: "0", // Ensure the input text has no left padding
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "none",
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: "none",
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: "none",
                  },
                }}
              />
            )}
            disabled={isSubmitting || isSubmitted}
        />
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