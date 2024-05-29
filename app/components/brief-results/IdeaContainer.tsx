"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type IdeaContainerProps = {
  title: string;
  problem: string;
  insight: string;
  idea: string;
};

const ToolTipCopy = "Copy to clipboard";
const ToolTipCopied = "Copied!";

export default function IdeaContainer ({ title, problem, insight, idea }: IdeaContainerProps) {
  const [copiedSection, setCopiedSection] = useState<{ [key: string]: boolean }>({});

  const handleCopyToClipboardClick = (content: string, sectionKey: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSection((prevState) => ({ ...prevState, [sectionKey]: true }));
    setTimeout(() => {
      setCopiedSection((prevState) => ({ ...prevState, [sectionKey]: false }));
    }, 2000);
  };

  const sections = { problem, insight, idea };

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
        px-4
        pt-2
        pb-4
        gap-4
        rounded-md
      "
    >
      <Box
        id={`${title}-header`}
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
        <Box
          className="
            flex
            flex-col
            justify-start
            items-start
          "
        >
          <Typography variant="subtitle1" className="text-black font-semibold">
            {title}
          </Typography>
          <Typography variant="subtitle2">Idea rationale lorem ipsum dolor sit amet.</Typography>
        </Box>
        <IconButton aria-label="more options" disabled={false} color="secondary">
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
              <Typography variant="overline" className="font-semibold">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Typography>
              <Typography variant="body2">{sections[section as keyof typeof sections]}</Typography>
            </Box>
            <Tooltip title={copiedSection[`${title}-${section}`] ? ToolTipCopied : ToolTipCopy}>
              <IconButton
                aria-label="copy to clipboard"
                disabled={false}
                color={copiedSection[`${title}-${section}`] ? "success" : "secondary"}
                onClick={() => handleCopyToClipboardClick(sections[section as keyof typeof sections], `${title}-${section}`)}
              >
                {copiedSection[`${title}-${section}`] ? <CheckIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
