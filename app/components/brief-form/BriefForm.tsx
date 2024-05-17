"use client";

// Hooks
import React from "react";
import { 
  useFormContext, 
  // Controller, 
} from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Utils
// import PostHogClient from "@/app/utils/posthog/posthog";
// Custom components
import SectionTitle from "@/app/components/brief-form/SectionTitle";
import CustomTextInput from "@/app/components/CustomTextInput";
import MultipleSelectChip from "@/app/components/brief-form/MultipleSelectChip";
// Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BriefForm() {
  const {
    control,
    formState: { 
      isSubmitting, 
      isSubmitted,
      isValid,
  },
  } = useFormContext<BriefFormType>();

  return (
    <Box
      id="brief-form-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        p-4
        gap-4
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
          subtitle="Information about the brief."
        />
        <CustomTextInput
          fieldName="project_name"
          label="Project name"
          placeholder="My new campaign"
          helperText="The name of the brief."
          required={true}
        />
        <CustomTextInput
          fieldName="company_name"
          label="Company name"
          placeholder="ACME Inc."
          helperText="The name of the company the brief is for."
          required={true}
        />
        <CustomTextInput
          fieldName="company_details"
          label="Company details"
          placeholder="ACME Inc. makes.."
          helperText="A short description of the company. (Optional)"
          rows={2}
          multiline={true}
          required={false}
        />
        <CustomTextInput
          fieldName="project_details"
          label="Brief details"
          placeholder="A campaign to.."
          helperText="A short description of the brief. (Optional)"
          rows={2}
          multiline={true}
          required={false}
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
          subtitle="Information about the product."
        />
        <CustomTextInput
          fieldName="product_details"
          label="Product details"
          placeholder="Product name, features, etc."
          helperText="A short description of the product. (Optional)"
          rows={2}
          multiline={true}
          required={false}
        />
        <CustomTextInput
          fieldName="product_usp"
          label="Unique selling point"
          placeholder="What makes the product unique?"
          helperText="The product's unique selling point. (Optional)"
          required={false}
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
        <CustomTextInput
          fieldName="project_goals_details"
          label="Goals details"
          placeholder="Increase sales by 20%.."
          helperText="A short description of the goals. (Optional)"
          required={false}
        />
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
          >
            Objectives
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={"Brand Awareness"}
            label="Objectives"
            // onChange={handleChange}
          >
            <MenuItem
              value={"Brand Awareness"}
            >
              Brand Awareness
            </MenuItem>
            <MenuItem
              value={"Increase Sales"}
            >
              Increase Sales
            </MenuItem>
            <MenuItem 
              value={"Increase Conversion"}
            >
              Increase Conversion
            </MenuItem>
          </Select>
        </FormControl>
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
        <CustomTextInput
          fieldName="brand_strategy"
          label="Strategy"
          placeholder="e.g. Increase sales by 20%"
          helperText=""
          required={false}
        />
        <CustomTextInput
          fieldName="brand_message"
          label="Message"
          placeholder="e.g. Increase sales by 20%"
          helperText=""
          required={false}
        />
        <CustomTextInput
          fieldName="brand_tone"
          label="Tone of voice"
          placeholder="e.g. Increase sales by 20%"
          helperText=""
          required={false}
        />
      </Box>
      <Box
        id="section-audience-container"
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
          title="Audience"
          subtitle="Lorem ipsum dolor sit amet"
        />
        {/* MARKETS */}
        <MultipleSelectChip
          name="target_markets"
          label="Markets"
          helperText="Select all that apply."
          options={[
            "Global 🌍",
            "European Union 🇪🇺",
            "Sweden 🇸🇪", 
            "Norway 🇳🇴", 
            "Denmark 🇩🇰", 
            "Finland 🇫🇮",
            "United States 🇺🇸",
            "Canada 🇨🇦",
            "Australia 🇦🇺",
            "United Kingdom 🇬🇧",
            "Germany 🇩🇪",
            "France 🇫🇷",
            "Spain 🇪🇸",
            "Italy 🇮🇹",
            "Japan 🇯🇵",
            "India 🇮🇳",
            "Netherlands 🇳🇱",
          ]} 
          control={control}
        />
        {/* GENDERS */}
        <MultipleSelectChip
          name="target_genders"
          label="Genders"
          helperText="Select all that apply."
          options={[
            "All", 
            "Men", 
            "Women", 
            "Non-binary"
          ]} 
          control={control}
        />
        {/* AGES */}
        <MultipleSelectChip
          name="target_ages"
          label="Age ranges"
          helperText="Select all that apply."
          options={[
            "All", 
            "18-24", 
            "25-34", 
            "35-44", 
            "45-54", 
            "55-64", 
            "65+"
          ]} 
          control={control}
        />
      </Box>
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
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
          >
            Ideas
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={5} // TODO: Dynamic
            label="Ideas"
            // onChange={handleChange}
          >
            {/* TODO: Import object data */}
            {[
              5, 
              10, 
              15, 
              20, 
              25,
            ].map((ideas, index) => (
              <MenuItem
                key={index}
                value={ideas}
              >
                {ideas}
              </MenuItem>
            ))};
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        size="large"
        disabled={!isValid || isSubmitting || isSubmitted}
        color={isValid ? "primary" : "secondary"}
        endIcon={<ArrowForwardIcon />}
        className="
          w-full
          hover:cursor-pointer
          justify-between
          px-4
        "
      >
        Generate ideas
      </Button>
    </Box>
  );
};