import React from "react";
// Utils
import Link from "next/link";
// Custom Components
import CustomGridItem from "@/app/components/CustomGridItem";
// Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Icons
import AddIcon from '@mui/icons-material/Add';

export default function MyBriefs() {
  return (
    <Box
      id="home-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-6
        p-4
      "
    >
      <Typography
        variant="h4"
        className="
          font-semibold
        "
      >
        My Briefs
      </Typography>
      <Box
        id="sort-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          gap-1
        "
      >
        <Typography
          variant="overline"
          className="
            text-neutral-500
          "
        >
          Sort by
        </Typography>
        <Button
          size="small"
          color="secondary"
        >
          Latest
        </Button>
        <Button
          size="small"
          color="secondary"
        >
          Oldest
        </Button>
      </Box>
      {/* TODO: Dynamically render each brief */}
      <Grid
        container
        spacing={4}
      >
        <Grid
          xs={12}
          md={6}
          lg={4}
          className="
            bg-neutral-50
            border
            border-neutral-100
            hover:border-neutral-200
            hover:shadow-md
            hover:shadow-neutral-100
            hover:cursor-pointer
            rounded-md
            p-4
          "
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={1}
            title="Project Title"
            briefDetails="Lorem ipsum dolor sit amet."
            company="Company"
            companyAvatar="/briefbuddy-logo.png"
            createdAt="2021-10-01"
            updatedAt={null}
            ideasQuantity={5}
          />
        </Grid>
        <Grid
          xs={6}
          className="
            bg-neutral-50
            border
            border-neutral-100
            hover:border-neutral-200
            hover:shadow-md
            hover:shadow-neutral-100
            hover:cursor-pointer
            rounded-md
            p-4
          "
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={1}
            title="Project Title"
            briefDetails="Lorem ipsum dolor sit amet."
            company="Company"
            companyAvatar="/briefbuddy-logo.png"
            createdAt="2021-10-01"
            updatedAt={null}
            ideasQuantity={5}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={4}
          className="
            bg-neutral-50
            border
            border-neutral-100
            hover:border-neutral-200
            hover:shadow-md
            hover:shadow-neutral-100
            hover:cursor-pointer
            rounded-md
            p-4
          "
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={1}
            title="Project Title"
            briefDetails="Lorem ipsum dolor sit amet."
            company="Company"
            companyAvatar="/briefbuddy-logo.png"
            createdAt="2021-10-01"
            updatedAt={null}
            ideasQuantity={5}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={4}
          className="
            bg-neutral-50
            border
            border-neutral-100
            hover:border-neutral-200
            hover:shadow-md
            hover:shadow-neutral-100
            hover:cursor-pointer
            rounded-md
            p-4
          "
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={1}
            title="Project Title"
            briefDetails="Lorem ipsum dolor sit amet."
            company="Company"
            companyAvatar="/briefbuddy-logo.png"
            createdAt="2021-10-01"
            updatedAt={null}
            ideasQuantity={5}
          />
        </Grid>
        {/* Create New Brief */}
        <Link
          href="/new-brief"
          className="w-full"
        >
          <Grid
            xs={12}
            md={6}
            lg={4}
            className="
              bg-neutral-100
              hover:cursor-pointer
              rounded-md
              p-4
            "
          >
            {/* TODO: Replace with dynamic data */}
            <Item
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                min-h-[120px]
                gap-2
              "
            >
              <Typography
                variant="subtitle1"
                className="
                text-neutral-400
                hover:text-neutral-500
                  gap-2
                "
              >
                New brief
                <AddIcon
                  className="
                    ml-2
                  "
                />
              </Typography>
            </Item>
          </Grid>
        </Link>
      </Grid>
    </Box>
  );
};