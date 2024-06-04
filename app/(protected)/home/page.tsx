"use client";

// Hooks
import React, { useState } from "react";
// Utils
import Link from "next/link";
// Custom Components
import CustomGridItem from "@/app/components/CustomGridItem";
import CreateProjectButton from "@/app/components/project/CreateProjectButton";
// Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Icons
import AddIcon from '@mui/icons-material/Add';

const sortByOptions = {
  latest: "latest",
  oldest: "oldest",
};

export default function Home() {
  const [sortBy, setSortBy] = useState<string>(sortByOptions.latest);

  // TODO: Sort by logic

  return (
    <Box
      id="home-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-2
        p-4
      "
    >
      <Box
        id="home-header"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
        <Typography
          variant="h4"
          className="
            text-black
            font-semibold
            mb-2
          "
        >
          My home
        </Typography>
        <CreateProjectButton />
      </Box>
      
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
          color={sortBy === sortByOptions.latest ? "primary" : "secondary"}
          onClick={() => setSortBy(sortByOptions.latest)}
        >
          Latest
        </Button>
        <Button
          size="small"
          color={sortBy === sortByOptions.oldest ? "primary" : "secondary"}
          onClick={() => setSortBy(sortByOptions.oldest)}
        >
          Oldest
        </Button>
      </Box>
      {/* TODO: Dynamically render each brief */}
      <Grid
        container
        spacing={4}
        className="w-full gap-4 m-0 flex-wrap"
      >
        <Grid
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="
            bg-white
            border
            border-black
            hover:border-neutral-700
            hover:cursor-pointer
            rounded-md
            p-4
          "
          sx={{
            "&:hover": {
              boxShadow: "0 2px 0 0 #000000"
            }
          }}
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
          sm={6}
          md={4}
          lg={3}
          className="
            bg-white
            border
            border-black
            hover:border-neutral-700
            hover:cursor-pointer
            rounded-md
            p-4
          "
          sx={{
            "&:hover": {
              boxShadow: "0 2px 0 0 #000000"
            }
          }}
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={2}
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
          sm={6}
          md={4}
          lg={3}
          className="
            bg-white
            border
            border-black
            hover:border-neutral-700
            hover:cursor-pointer
            rounded-md
            p-4
          "
          sx={{
            "&:hover": {
              boxShadow: "0 2px 0 0 #000000"
            }
          }}
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={3}
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
          sm={6}
          md={4}
          lg={3}
          className="
            bg-white
            border
            border-black
            hover:border-neutral-700
            hover:cursor-pointer
            rounded-md
            p-4
          "
          sx={{
            "&:hover": {
              boxShadow: "0 2px 0 0 #000000"
            }
          }}
        >
          {/* TODO: Replace with dynamic data */}
          <CustomGridItem
            id={4}
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