import React from "react";
// Custom components
import SectionTitle from "@/app/components/SectionTitle";
import InputField from "@/app/components/InputField";
// Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BriefForm() {
  return (
    <form
      // onSubmit={onSubmit}
      id="brief-form"
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
      <Box
        id="section-basics-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SectionTitle
          title="Basics"
          subtitle="Lorem ipsum dolor sit amet"
        />
        <InputField
          label="Company name"
          helperText="Lorem ipsum dolor sit amet"
          required={true}
          error={false}
        />
        <InputField
          label="Company details"
          helperText=""
          required={false}
          error={false}
        />
        <InputField
          label="Background"
          helperText=""
          required={false}
          error={false}
        />
      </Box>
      <Box
        id="section-product-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SectionTitle
          title="Product"
          subtitle="Lorem ipsum dolor sit amet"
        />
        <InputField
          label="Description"
          helperText="Lorem ipsum dolor sit amet"
          required={true}
          error={false}
        />
        <InputField
          label="Unique selling point"
          helperText=""
          required={false}
          error={false}
        />
      </Box>
      <Box
        id="section-goals-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SectionTitle
          title="Goals"
          subtitle="Lorem ipsum dolor sit amet"
        />
        {/* Select */}
        <InputField
          label="Goals details"
          helperText=""
          required={false}
          error={false}
        />
      </Box>
      <Box
        id="section-strategy-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SectionTitle
          title="Strategy"
          subtitle="Lorem ipsum dolor sit amet"
        />
        <InputField
          label="Strategy"
          helperText="Lorem ipsum dolor sit amet"
          required={true}
          error={false}
        />
        <InputField
          label="Message"
          helperText=""
          required={false}
          error={false}
        />
        <InputField
          label="Tone of voice"
          helperText=""
          required={false}
          error={false}
        />
      </Box>
      {/* Audience */}
      {/* Medium */}
      <Box
        id="section-ideas-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-4
        "
      >
        <SectionTitle
          title="Ideas"
          subtitle="Lorem ipsum dolor sit amet"
        />
        <InputField
          label="Ideas"
          helperText="Lorem ipsum dolor sit amet"
          required={true}
          error={false}
        />
      </Box>
      <Button
        type="submit"
        variant="outlined"
        color="primary" // TODO: Dynamic
        endIcon={<ArrowForwardIcon />}
        className="
          w-full
          justify-between
        "
      >
        Generate ideas
      </Button>
    </form>
  );
};