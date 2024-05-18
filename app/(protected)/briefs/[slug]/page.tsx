"use client";

// Hooks
import React, { useState } from "react";
// Validation
// Utils
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ToolTip from "@mui/material/Tooltip";
// Custom components
// Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const placeholderIdeas = {
  1: {
    title: "Idea 1",
    problem: "Lorem ipsum dolor sit amet.",
    insight: "Lorem ipsum dolor sit amet.",
    idea: "Lorem ipsum dolor sit amet.",
  },
  2: {
    title: "Idea 2",
    problem: "Lorem ipsum dolor sit amet.",
    insight: "Lorem ipsum dolor sit amet.",
    idea: "Lorem ipsum dolor sit amet.",
  },
  3: {
    title: "Idea 3",
    problem: "Lorem ipsum dolor sit amet.",
    insight: "Lorem ipsum dolor sit amet.",
    idea: "Lorem ipsum dolor sit amet.",
  },
};

const ToolTipCopy = "Copy to clipboard";
const ToolTipCopied = "Copied!";

export default function BriefId() {
  const [toolTipTitle, setToolTipTitle] = useState(ToolTipCopy);
  const [toolTipIcon, setToolTipIcon] = useState(<ContentCopyIcon />);

  function handleCopyToClipboardClick() {
    if (toolTipTitle !== ToolTipCopied) {
      setToolTipTitle(ToolTipCopied);
      setToolTipIcon(<CheckIcon />);
      setTimeout(() => {
        setToolTipTitle(ToolTipCopy);
        setToolTipIcon(<ContentCopyIcon />);
      }, 2000);
    };
  };

  return (
    <Box
      id="brief-id-container"
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        h-full
      "
    >
      Header info: Brief name / Creator / Date / Updated<br/>
      Header options: Share / Edit / Delete
      
      <Box
        id="brief-id-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          p-4
          gap-4
          max-w-3xl
        "
      >
        <Typography
          variant="h3"
        >
          Brief ID
        </Typography>
        <Typography
          variant="body1"
        >
          Brief summary lorem ipsum dolor sit amet.
        </Typography>
        {Object.values(placeholderIdeas).map((idea, index) => (
          <Box
            key={index}
            id={`${idea.title}-container`}
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
              id={`${idea.title}-header`}
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
                <Typography
                  variant="subtitle1"
                  className="
                    text-black
                    font-semibold
                  "
                >
                  {idea.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                >
                  Idea rationale lorem ipsum dolor sit amet.
                </Typography>
              </Box>
              <IconButton
                aria-label="more options"
                disabled={false}
                color="secondary"
              >
                <MoreHorizIcon />
              </IconButton>
            </Box>
            
            <Box
              id={`${idea.title}-content-container`}
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
              <Box
                id={`${idea.title}-problem-container`}
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
                  <Typography
                    variant="overline"
                    className="font-semibold"
                  >
                    Problem
                  </Typography>
                  <Typography
                    variant="body2"
                  >
                    {idea.problem}
                  </Typography>
                </Box>
                <ToolTip title={toolTipTitle}>
                  <IconButton
                    aria-label="copy to clipboard"
                    disabled={false}
                    color={toolTipTitle !== ToolTipCopy ? "success" : "secondary"}
                    onClick={handleCopyToClipboardClick}
                  >
                    {toolTipIcon}
                  </IconButton>
                </ToolTip>
              </Box>

              <Box
                id={`${idea.title}-insight-container`}
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
                  <Typography
                    variant="overline"
                    className="font-semibold"
                  >
                    Insight
                  </Typography>
                  <Typography
                    variant="body2"
                  >
                    {idea.insight}
                  </Typography>
                </Box>
                <ToolTip title={toolTipTitle}>
                  <IconButton
                    aria-label="copy to clipboard"
                    disabled={false}
                    color={toolTipTitle !== ToolTipCopy ? "success" : "secondary"}
                    onClick={handleCopyToClipboardClick}
                  >
                    {toolTipIcon}
                  </IconButton>
                </ToolTip>
              </Box>

              <Box
                id={`${idea.title}-idea-container`}
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
                  <Typography
                    variant="overline"
                    className="font-semibold"
                  >
                    Idea
                  </Typography>
                  <Typography
                    variant="body2"
                  >
                    {idea.idea}
                  </Typography>
                </Box>
                <ToolTip title={toolTipTitle}>
                  <IconButton
                    aria-label="copy to clipboard"
                    disabled={false}
                    color={toolTipTitle !== ToolTipCopy ? "success" : "secondary"}
                    onClick={handleCopyToClipboardClick}
                  >
                    {toolTipIcon}
                  </IconButton>
                </ToolTip>
              </Box>
            </Box>
            
          </Box>
        ))}
      </Box>
    </Box>
  );
};