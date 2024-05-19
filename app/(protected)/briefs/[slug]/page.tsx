"use client";

// Hooks
import React, { useState } from "react";
// Utils
import Link from "next/link";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const placeholderIdeas = {
  1: {
    title: "Idea 1",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
  2: {
    title: "Idea 2",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
  3: {
    title: "Idea 3",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
};

const ToolTipCopy = "Copy to clipboard";
const ToolTipCopied = "Copied!";

export default function BriefId() {
  const [copiedSection, setCopiedSection] = useState<{ [key: string]: boolean }>({});

  const handleCopyToClipboardClick = (content: string, sectionKey: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(prevState => ({ ...prevState, [sectionKey]: true }));
    setTimeout(() => {
      setCopiedSection(prevState => ({ ...prevState, [sectionKey]: false }));
    }, 2000);
  };

  return (
    <Box
      id="brief-id-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
        h-full
      "
    >
      <Box
        id="brief-id-header-container"
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
          border-neutral-200
          sticky
          top-0
          z-10
        "
      >
        <Box
          id="brief-id-header-info-container"
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
            Brief Name
          </Typography>
          <Typography
            variant="caption"
            className="
            text-neutral-700
            "
          >
            <Link
              href="/username"
              className="
                hover:pointer-cursor 
                hover:underline 
                hover:text-neutral-900
              "
            >
              Username
            </Link>
            {" "} <span className="text-neutral-500">•</span> {" "}
            Created 25/10/1988 {/* TODO: Make Dynamic */}
            {" "} <span className="text-neutral-500">•</span> {" "}
            Updated 25/10/1988 {/* TODO: Make Dynamic */}
          </Typography>
          <Typography
            variant="body1"
            className="mt-2 font-medium"
          >
            Brief summary lorem ipsum dolor sit amet.
          </Typography>
        </Box>
        <Box
          id="brief-id-header-options-container"
          className="
            flex
            flex-col
            justify-start
            items-start
          "
        >
          <IconButton size="small" color="secondary"><EditIcon /></IconButton>
        </Box>
      </Box>

      <Box
        id="brief-id-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          max-w-3xl
          gap-4
          py-8
        "
      >
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
                <Typography variant="subtitle1" className="text-black font-semibold">
                  {idea.title}
                </Typography>
                <Typography variant="subtitle2">Idea rationale lorem ipsum dolor sit amet.</Typography>
              </Box>
              <IconButton aria-label="more options" disabled={false} color="secondary">
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
              {["problem", "insight", "idea"].map((section) => (
                <Box
                  key={section}
                  id={`${idea.title}-${section}-container`}
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
                    <Typography variant="body2">{idea[section as keyof typeof idea]}</Typography>
                  </Box>
                  <Tooltip title={copiedSection[`${idea.title}-${section}`] ? ToolTipCopied : ToolTipCopy}>
                    <IconButton
                      aria-label="copy to clipboard"
                      disabled={false}
                      color={copiedSection[`${idea.title}-${section}`] ? "success" : "secondary"}
                      onClick={() => handleCopyToClipboardClick(idea[section as keyof typeof idea], `${idea.title}-${section}`)}
                    >
                      {copiedSection[`${idea.title}-${section}`] ? <CheckIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};