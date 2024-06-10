"use client";

// Hooks
import React, { 
  useEffect, 
  useState 
} from "react";
// Actions
import { fetchProjectCreatorUtil } from "@/app/actions/fetchProjectCreatorUtil";
// Utils
import { formatDistanceToNowStrict } from "date-fns";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

type ProjectDetailsProps = {
  client: string | undefined;
  user_id: string | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
};

export default function ProjectDetails({
  client,
  user_id,
  created_at,
  updated_at
}: ProjectDetailsProps) {
  const [projectCreator, setProjectCreator] = useState<string | null>(null);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>("");
  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState<string>("");

  // Fetch project creator
  useEffect(() => {
    async function fetchProjectDetails() {
      if (user_id) {
        const creator = await fetchProjectCreatorUtil(user_id);
        setProjectCreator(creator);
      }
    }

    fetchProjectDetails();
  }, [user_id]);

  // Format dates
  useEffect(() => {
    if (created_at) {
      const date = new Date(created_at);
      setFormattedCreatedAt(
        formatDistanceToNowStrict(date, {
          addSuffix: true
        })
      );
    }
    if (updated_at && created_at !== updated_at) {
      const date = new Date(updated_at);
      setFormattedUpdatedAt(
        formatDistanceToNowStrict(date, {
          addSuffix: true
        })
      );
    }
  }, [
    created_at, 
    updated_at
  ]);

  return projectCreator ? (
    <Box
      id="project-details-container"
      className="
        flex
        flex-row
        flex-wrap
        justify-start
        items-start
        w-full
        gap-2
      "
    >
      <Typography
        variant="caption"
        component="span"
        className="text-neutral-700"
      >
        {client && (
          <>
            <Typography
              variant="caption"
              className="text-neutral-900 font-semibold"
            >
              {client}
            </Typography>
            {" "}<span className="text-neutral-500">•</span>{" "}
          </>
        )}
        <Typography
          variant="caption"
        >
          Made by {projectCreator} {formattedCreatedAt}
        </Typography>
        {formattedUpdatedAt && (
          <>
            {" "}<span className="text-neutral-500">•</span>{" "}
            <Typography
              variant="caption"
            >
              Updated {formattedUpdatedAt}
            </Typography>
          </>
        )}
      </Typography>
    </Box>
  ) : (
    <Box
      id="project-details-container"
      className="
        flex
        flex-row
        flex-wrap
        justify-start
        items-start
        w-full
        gap-2
      "
    >
      <Skeleton
        variant="text"
        width="144px"
        height="24px"
        animation="wave"
        className="rounded-sm"
      />
      <span className="text-neutral-300">•</span>{" "}
      <Skeleton
        variant="text"
        width="96px"
        height="24px"
        animation="wave"
        className="rounded-sm"
      />
    </Box>
  );
}
