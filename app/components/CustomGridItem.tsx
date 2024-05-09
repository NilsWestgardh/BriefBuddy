import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Components
import Box from "@mui/material/Box";
import Item from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type CustomGridItemProps = {
  id: number;
  title: string;
  briefDetails?: string | null;
  company: string;
  companyAvatar?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  ideasQuantity?: number | null;
};

export default function CustomGridItem({ 
  id,
  title,
  briefDetails,
  company,
  companyAvatar,
  createdAt,
  updatedAt,
  ideasQuantity,
}: CustomGridItemProps) {
  return (
    <Link
      href={`/project/${id}`}
    >
      <Item
        id={`${title}-${updatedAt ? updatedAt : createdAt}-grid-item-container`}
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
          id={`${title}-${updatedAt ? updatedAt : createdAt}-header-container`}
          className="
            flex
            flex-row
            justify-start
            items-center
            w-full
            gap-2
          "
        >
          <Image
            src={companyAvatar ? companyAvatar : "/briefbuddy-logo.png"}
            alt={`${company} avatar`}
            width={48}
            height={48}
            className="
              border
              border-black
              rounded-md
            "
          />
          <Box
            id={`${title}-${updatedAt ? updatedAt : createdAt}-header-container`}
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
              "
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              className="
                flex
                flex-row
                justify-start
                items-center
                gap-1
              "
            >
              {company ? company : "ACME"}
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
                {ideasQuantity ? ideasQuantity : 0} ideas
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          id={`${title}-${updatedAt ? updatedAt : createdAt}-info-container`}
          className="
            flex
            flex-row
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          {updatedAt ? (
            <Typography
              variant="caption"
              className="
                text-neutral-500
              "
            >
              Updated at {updatedAt}
            </Typography>
          ) : (
            <Typography
              variant="caption"
              className="
                text-neutral-500
              "
            >
              Created at {createdAt}
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
          {briefDetails}
        </Typography>
      </Item>
    </Link>
  );
};