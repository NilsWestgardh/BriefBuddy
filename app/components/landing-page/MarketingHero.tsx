import React from "react";
// Utils
import Link from "next/link";
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MarketingHero() {
  return (
    <Box
      id="lockup-container"
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        md:max-w-xl
        lg:max-w-4xl
        gap-6
        py-8
      "
    >
      <Typography
        variant="h1"
        className="
          text-4xl
          md:text-6xl
          lg:text-8xl
          font-bold
          text-center
          text-black
          md:max-w-lg
          lg:max-w-2xl
        "
      >
        Get campaign ideas faster
      </Typography>
      <Typography
        variant="subtitle1"
        className="
          text-neutral-900
          text-center
          text-lg
          md:text-xl
          md:max-w-lg
          lg:max-w-xl
        "
      >
        BriefBuddy makes generating advertising campaigns easy, and fast. {""}
        Go from brief to ideas in minutes.
      </Typography>
      <Box
        id="button-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          md:max-w-xl
          lg:max-w-4xl
          gap-2
        "
      >
        <Link
          href="/login"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
          "
        >
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            size="large"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
              max-w-sm
              border-2
              hover:border-2
              rounded-md
              py-2
              px-6
            "
          >
            Get started for free
          </Button>
        </Link>
        <Typography
          variant="body1"
          className="
            text-neutral-500
          "
        >
          No credit card required
        </Typography>
      </Box>
    </Box>
  );
};