"use client";

// Hooks
import React, { useState } from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type IdeaContainerProps = {
  index: number;
  title: string;
  problem: string;
  insight: string;
  idea: string;
  description: string;
  idea_quantity: number;
};

const ToolTipCopy = "Copy to clipboard";
const ToolTipCopied = "Copied!";

export default function IdeaContainer({ 
  index,
  title, 
  problem, 
  insight, 
  idea,
  description,
  idea_quantity,
}: IdeaContainerProps) {
  const [copiedSection, setCopiedSection] = useState<{ [key: string]: boolean }>({});

  function handleCopyToClipboardClick(
    content: string, 
    sectionKey: string
  ) {
    navigator.clipboard.writeText(content);
    setCopiedSection((prevState) => ({ 
      ...prevState, 
      [sectionKey]: true 
    }));
    setTimeout(() => {
      setCopiedSection((prevState) => ({ 
        ...prevState, 
        [sectionKey]: false 
      }));
    }, 2000);
  };

  const sections = { 
    problem, 
    insight, 
    idea 
  };

  return (
    <Box
      id={`${title}-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        border
        border-black
        px-6
        pt-4
        pb-6
        gap-6
        rounded-xl
      "
    >
      <Box
        id={`${title}-header`}
        className="
          flex
          flex-row
          justify-between
          items-start
          w-full
          gap-8
        "
      >
        <Box
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-2
          "
        >
          <Box
            className="
              flex
              flex-row
              justify-start
              items-baseline
              gap-3
            "
          >
            <Typography
              variant="subtitle1"
              className="
                text-black 
                font-semibold
              "
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              className="
                text-neutral-700
              "
            >
              {index} / {" "}
              <Typography
                variant="caption"
                className="
                text-neutral-500
              "
              >
                {idea_quantity}
              </Typography>
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
          >
            {description}
          </Typography>
        </Box>
        {/* TODO: Implement dropdown menu with CRUD options */}
        <IconButton
          aria-label="more options"
          disabled={false}
          color="secondary"
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Box
        id={`${title}-content-container`}
        className="
          flex
          flex-col
          justify-between
          items-center
          w-full
          gap-2
          hover:text-black
        "
      >
        {Object.keys(sections).map((section) => (
          <Box
            key={section}
            id={`${title}-${section}-container`}
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
              px-4
              pt-1
              pb-3
              rounded-md
              border
              border-neutral-300
              hover:border-neutral-500
              hover:bg-neutral-50
              gap-4
            "
          >
            <Box
              className="
                flex
                flex-col
                justify-center
                items-start
                w-full
              "
            >
              <Typography
                variant="overline"
                className="font-semibold"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Typography>
              <Typography
                variant="body2"
              >
                {sections[section as keyof typeof sections]}
              </Typography>
            </Box>
            <Tooltip
              title={
                copiedSection[`${title}-${section}`] ? 
                ToolTipCopied : ToolTipCopy
              }
            >
              <IconButton
                aria-label="copy to clipboard"
                disabled={false}
                color={
                  copiedSection[`${title}-${section}`] ? 
                  "success" : "secondary"
                }
                onClick={() => handleCopyToClipboardClick(
                  sections[section as keyof typeof sections], 
                  `${title}-${section}`
                )}
              >
                {
                  copiedSection[`${title}-${section}`] ? 
                  <CheckIcon /> : <ContentCopyIcon />
                }
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};