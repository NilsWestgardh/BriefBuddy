// Hooks
import React from 'react';
// Custom components
import ResponsiveAppBar from "@/app/components/landing-page/ResponsiveAppBar";
import MarketingHero from "@/app/components/landing-page/MarketingHero";
import MarketingFeature from "@/app/components/landing-page/MarketingFeature";
import Footer from "@/app/components/Footer";
// Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArticleIcon from '@mui/icons-material/Article';

const MarketingFeaturesData = {
  time: {
    title: "Save time",
    copy: "Get to the first advertising campaign ideas faster than ever.",
    icon: <AccessTimeIcon />,
  },
  money: {
    title: "Save money",
    copy: "Help your team work on big ideas, not thought starters.",
    icon: <AttachMoneyIcon />,
  },
  progress: {
    title: "Save progress",
    copy: "Keep all of your teams campaign ideas in one place.",
    icon: <ArticleIcon />,
  },
};

export default async function Index() {

  return (
    <Box
      id="landing-page-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-screen
      "
    >
      <ResponsiveAppBar />
      <Box
        id="landing-page-content-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          h-full
          mt-16
          p-8
        "
      >
        {/* Hero */}
        <MarketingHero />
        {/* Features */}
        <Grid
          container
          spacing={2}
          className="
            w-full
            max-w-4xl
          "
        >
          {Object
            .values(MarketingFeaturesData)
            .map((
              feature, 
              index
            ) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <MarketingFeature
                feature={feature.title}
                copy={feature.copy}
                icon={feature.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      * How BriefBuddy works
      ** Goals & Strategy
      ** Audience & Market
      ** Brand & Tone
      ** Channels & Budget
      <Footer />
    </Box>
  );
}
