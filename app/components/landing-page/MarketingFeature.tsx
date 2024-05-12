import React from "react";
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type MarketingFeatureProps = {
  feature: string;
  copy: string;
  icon: React.ReactNode;
};

export default function MarketingFeature({ 
  feature, 
  copy, 
  icon 
}: MarketingFeatureProps
) {
  return (
    <Box
      id={`${feature}-container`}
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        min-h-24
        p-4
        gap-4
        rounded-lg
        border
        border-black
        bg-white
      "
    >
      {icon}
      <Box
        id={`${feature}-content-container`}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-1
          pb-2
        "
      >
        <Typography
          variant="subtitle2"
          className="
            text-black
            font-semibold
          "
        >
          {feature.toUpperCase()}
        </Typography>
        <Typography
          variant="body2"
          className="text-neutral-700"
        >
          {copy}
        </Typography>
      </Box>
    </Box>
  );
}