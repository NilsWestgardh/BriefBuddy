"use client";

// Hooks
import React from "react";
import { 
  useForm, 
  FormProvider 
} from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
// Utils
// import PostHogClient from "@/app/utils/posthog/posthog";
// Custom components
import SectionTitle from "@/app/components/brief-form/SectionTitle";
import CustomInputField from "@/app/components/CustomInputField";
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
  const methods = useForm<BriefFormType>({
    defaultValues: {
      id: 0,
      user_id: 0,
      created_at: "",
      updated_at: "",
      title: "",
      brief_details: "",
      company: "",
      company_details: "",
      company_avatar: "",
      product_details: "",
      usp: "",
      goals: [],
    },
    resolver: zodResolver(BriefFormSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    // setValue,
    // watch,
    formState: {
      isValid,
      isSubmitting,
      isSubmitted,
    },
  } = methods;

  // const form = watch();
  // const posthog = PostHogClient();

  async function onSubmit(data: BriefFormType) {
    console.log("Form data", data);
    // posthog.capture({
    //   distinctId: "123456",
    //   event: "🎉 New Brief Form Submitted"
    // })
  };

  return (
    <FormProvider
      {...methods}
    >
      <form
        id="brief-form"
        onSubmit={handleSubmit(onSubmit)}
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
          <CustomInputField
            label="Company name"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            required={true}
            error={false}
          />
          <CustomInputField
            label="Company details"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            rows={2}
            multiline={true}
            required={false}
            error={false}
          />
          <CustomInputField
            label="Brief details"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            rows={2}
            multiline={true}
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
          <CustomInputField
            label="Product details"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            rows={2}
            multiline={true}
            required={false}
            error={false}
          />
          <CustomInputField
            label="Unique selling point"
            placeholder="e.g. Increase sales by 20%"
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
          <CustomInputField
            label="Goals details"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            required={false}
            error={false}
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
              value={10}
              label="Objectives"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
          <CustomInputField
            label="Strategy"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            required={true}
            error={false}
          />
          <CustomInputField
            label="Message"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            required={false}
            error={false}
          />
          <CustomInputField
            label="Tone of voice"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            required={false}
            error={false}
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
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
            >
              Markets
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value="Sweden" // TODO: Dynamic
              label="Markets"
              // onChange={handleChange}
            >
              {/* TODO: Import object with countries */}
              {[
                "Sweden", 
                "Norway", 
                "Denmark", 
                "Finland", 
                "United States"
              ].map((market, index) => (
                <MenuItem
                  key={index}
                  value={market}
                >
                  {market}
                </MenuItem>
              ))};
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
            >
              Genders
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value="All" // TODO: Dynamic
              label="Genders"
              // onChange={handleChange}
            >
              {[
                "All", 
                "Unisex", 
                "Men", 
                "Women", 
                "Non-binary"
              ].map((gender, index) => (
                <MenuItem
                  key={index}
                  value={gender}
                >
                  {gender}
                </MenuItem>
              ))};
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
            >
              Age ranges
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value="18-24" // TODO: Dynamic
              label="Age ranges"
              // onChange={handleChange}
            >
              {[
                "18-24", 
                "25-34", 
                "35-44", 
                "45-54", 
                "55-64",
                "65+"
              ].map((ageRange, index) => (
                <MenuItem
                  key={index}
                  value={ageRange}
                >
                  {ageRange}
                </MenuItem>
              ))};
            </Select>
          </FormControl>
          <CustomInputField
            label="Description"
            placeholder="e.g. Increase sales by 20%"
            helperText=""
            rows={4}
            multiline={true}
            required={false}
            error={false}
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
              label="Ideass"
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
          color={isValid ? "success" : "secondary"}
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
      </form>
    </FormProvider>
  );
};