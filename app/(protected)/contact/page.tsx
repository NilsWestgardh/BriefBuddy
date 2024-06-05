"use client";

// Hooks
import React, { useEffect } from "react";
// Utils
import Cal, { getCalApi } from "@calcom/embed-react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Contact() {

  // Fetch Cal.com Embed
  useEffect(()=>{
	  (async function () {
      const cal = await getCalApi();
      cal(
        "ui", {
          "theme": "light",
          "styles": {
            "branding":{
              "brandColor":"#000000"
            }},
          "hideEventTypeDetails": true,
          "layout": "month_view"
        }
      );
	  })();
	}, [])

  return (
    <Box
      id="contact-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
        p-6
      "
    >
      <Box
        id="contact-header"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          bg-neutral-50
          p-6
          rounded-lg
          gap-4
        "
      >
        <Typography
          variant="h4"
          className="
            text-black
            font-semibold
          "
        >
          Contact
        </Typography>
        <Typography
          variant="body2"
          className="text-neutral-700"
        >
          Need help? Please email <strong>nils@briefbuddy.ai</strong> or schedule 30 minute meeting using the calendar below.
        </Typography>
      </Box>

      {/* Cal.com Embed */}
      <Cal 
        calLink="nilswestgardh/30min"
        style={{
          width:"100%",
          height:"100%",
          overflow:"scroll"
        }}
        config={{
          layout: "week_view",
        }}
      />
    </Box>
  )
};