import React from "react";
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Data
import { 
  socialFooterLinks,
  termsFooterLinks,
  navigationFooterLinks,
} from "@/app/utils/data/footerLinks";
// Custom components
import FooterColumn from "@/app/components/footer/FooterColumn";

export default function Footer() {
  return (
    <Box
      id="footer-container"
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        min-h-[200px]
        pt-8
        pb-16
        px-24
        gap-24
        bg-neutral-100
      "
    >
      <FooterColumn
        columnTitle="Social"
        dataObject={socialFooterLinks}
      />
      <FooterColumn
        columnTitle="Pages"
        dataObject={navigationFooterLinks}
      />
      <FooterColumn
        columnTitle="Terms"
        dataObject={termsFooterLinks}
      />
      <Box
        id="footer-col-contact"
        className="
          flex
          flex-col
          justify-start
          items-start
        "
      >
        <Typography
          variant="overline"
          className="font-semibold"
        >
          Contact
        </Typography>
        <Box
          id="footer-col-contact-contacts"
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-1
          "
        >
          <Typography
            variant="body2"
            component="span"
          >
            ACME Inc.<br/>
            1234 Company Road<br/>
            Stockholm, Sweden<br/>
            +46-9-99-9999<br/>
            contact@briefbuddy.com<br/>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};