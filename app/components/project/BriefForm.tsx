"use client";

// Hooks
import React from "react";
import { 
  useFormContext, 
  Controller, 
} from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Utils
// import PostHogClient from "@/app/utils/posthog/posthog";
// Custom components
import SectionTitle from "@/app/components/project/SectionTitle";
import CustomTextInput from "@/app/components/CustomTextInput";
import MultipleSelectChip from "@/app/components/project/MultipleSelectChip";
// Components
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from '@mui/material/FormHelperText';

type BriefFormProps = {
  isGuest: boolean;
};

export default function BriefForm({ 
  isGuest 
}: BriefFormProps) {
  const {
    watch,
    control
  } = useFormContext<BriefFormType>();
  const form = watch();

  return (
    <Box
      id="brief-form-sections"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
        p-4
        overflow-y-auto
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
          disabled={isGuest}
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
          disabled={isGuest}
          fieldName="product_details"
          label="Product details"
          placeholder="Product name, features, etc."
          helperText="A short description of the product. (Optional)"
          rows={2}
          multiline={true}
          required={false}
        />
        <CustomTextInput
          disabled={isGuest}
          fieldName="product_usp"
          label="Unique selling point"
          placeholder="What makes the product unique?"
          helperText="The product's unique selling point. (Optional)"
          rows={2}
          multiline={true}
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
          disabled={isGuest}
          fieldName="goals_details"
          label="Goals details"
          placeholder="Increase sales by 20%.."
          helperText="A short description of the goals. (Optional)"
          rows={2}
          multiline={true}
          required={false}
        />
        {/* OBJECTIVES */}
        <MultipleSelectChip
          disabled={isGuest}
          name="goals_objectives"
          label="Objectives"
          helperText="Select all objectives that apply. (Optional)"
          options={[
            "Brand Awareness",
            "Customer Acquisition",
            "Customer Loyalty",
            "Customer Retention",
            "Engagement",
            "Event Promotion",
            "Increase Website Traffic",
            "Lead Generation",
            "Product Launch",
            "Social Media Following",
          ]} 
          control={control}
        />
        <SectionTitle
          title="Targets"
          subtitle="Who the brief is targeting, and where they are."
        />
        {/* GENDERS */}
        <MultipleSelectChip
          disabled={isGuest}
          name="target_genders"
          label="Genders"
          helperText="Select all genders that apply. (Optional)"
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
          disabled={isGuest}
          name="target_ages"
          label="Age ranges"
          helperText="Select all age ranges that apply. (Optional)"
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
        {/* MARKETS */}
        <MultipleSelectChip
          disabled={isGuest}
          name="target_markets"
          label="Markets"
          helperText="Select all markets that apply. (Optional)"
          options={[
            "🌍 Global",
            "🇪🇺 European Union",
            "🇸🇪 Sweden", 
            "🇳🇴 Norway", 
            "🇩🇰 Denmark", 
            "🇫🇮 Finland",
            "🇺🇸 United States",
            "🇨🇦 Canada",
            "🇦🇺 Australia",
            "🇬🇧 United Kingdom",
            "🇩🇪 Germany",
            "🇫🇷 France",
            "🇪🇸 Spain",
            "🇮🇹 Italy",
            "🇯🇵 Japan",
            "🇮🇳 India",
            "🇳🇱 Netherlands",
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
          title="Output"
          subtitle="What you need from the brief."
        />
        {/* MEDIUMS */}
        <MultipleSelectChip
          disabled={isGuest}
          name="ideas_medium"
          label="Medium"
          helperText="Select all mediums that apply. (Optional)"
          options={[
            "Digital",
            "Social",
            "Influencer",
            "Film",
            "Print",
            "Audio",
            "Integrated",
            "Outdoor",
            "Activation",
          ]} 
          control={control}
        />
        {/* CHANNELS */}
        {
          Array.isArray(form.ideas_medium) && (
          form.ideas_medium
            .join()
            .toLowerCase()
            .includes("social") || 
          form.ideas_medium
            .join()
            .toLowerCase()
            .includes("influencer") 
          ) && (
          <MultipleSelectChip
            disabled={isGuest}
            name="ideas_channels"
            label="Channels"
            helperText="Select all channels that apply. (Optional)"
            options={[
              "Instagram",
              "Facebook",
              "X (Twitter)",
              "LinkedIn",
              "TikTok",
              "YouTube",
              "Twitch",
            ]} 
            control={control}
          />
        )}
        <FormControl fullWidth>
          <InputLabel
            id="ideas-quantity-label"
          >
            Ideas
          </InputLabel>
          <Controller
            name="ideas_quantity"
            disabled={isGuest}
            control={control}
            render={({ field }) => (
              <Select
                labelId="ideas-quantity-label"
                id="ideas-quantity-select"
                {...field}
                label="Ideas"
              >
                {[5, 10, 15, 20, 25].map((quantity) => (
                  <MenuItem key={quantity} value={quantity}>
                    {quantity}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            Select the amount of ideas you need.
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};