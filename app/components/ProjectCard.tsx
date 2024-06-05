import React from "react";
// Types
import { ProjectCardType } from "@/app/utils/types/ProjectCardType";
// Utils
import Link from "next/link";
import timeSince from "@/app/actions/timeSince"; // TODO: Replace with ISO date formatting
// Components
import Box from "@mui/material/Box";
import Item from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type ProjectCardProps = ProjectCardType;

export default function ProjectCard({ 
  id,
  created_at,
  updated_at,
  name,
  client,
  details,
  ideas_limit,
  ideas_count,
  team_members,
}: ProjectCardProps) {
  return (
    <Link
      href={`/project/${id}`}
    >
      <Item
        id={`${name}-grid-item-container`}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-2
        "
      >
        <Box
          id={`${name}-header-container`}
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
          "
        >
          <Typography
            variant="subtitle2"
            className="
              font-semibold
              hover:underline
              text-black
            "
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className="
              flex
              flex-row
              flex-wrap
              justify-start
              items-center
              gap-2
              font-semibold
              text-black
            "
          >
            {client ? client : "ACME"}
            <Typography
              variant="body2"
              className="
                text-neutral-700
              "
            >
              •
            </Typography>
            <Typography
              variant="body2"
              component="span"
            >
              {ideas_count ? ideas_count : 0}/{ideas_limit ? ideas_limit : 25} ideas
            </Typography>
            <Typography
              variant="body2"
              component="span"
            >
              {team_members?.length ? team_members.length : 0} members
            </Typography>
          </Typography>
        </Box>
        <Box
          id={`${name}-info-container`}
          className="
            flex
            flex-row
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          {updated_at ? (
            <Typography
              variant="caption"
              className="
                text-neutral-500
              "
            >
              Updated {timeSince(updated_at)}
            </Typography>
          ) : (
            <Typography
              variant="caption"
              className="
                text-neutral-500
              "
            >
              Created {timeSince(created_at)}
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          className="
            w-full
            text-neutral-700
          "
        >
          {details ? details : "No details available"}
        </Typography>
      </Item>
    </Link>
  );
};