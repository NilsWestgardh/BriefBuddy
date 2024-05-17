"use client";

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
// Custom Components
import ProjectHeader from "@/app/components/brief-form/ProjectHeader";
import BriefForm from "@/app/components/brief-form/BriefForm";
// Components
import Box from "@mui/material/Box";
// Icons

export default function NewBriefPage() {
  const methods = useForm<BriefFormType>({
    defaultValues: {
      id: 0,
      user_id: 0,
      created_at: "",
      updated_at: "",
      project_name: "",
      company_avatar: "",
      company_name: "",
      company_details: "",
      project_details: "",
      product_details: "",
      product_usp: "",
      project_goals: [],
      project_goals_details: "",
      project_objectives: [],
      brand_strategy: "",
      brand_message: "",
      brand_tone: "",
      target_markets: [],
      target_genders: [],
      target_ages: [],
      target_description: "",
      ideas_medium: [],
      ideas_channels: [],
      ideas_quantity: 5,
    },
    resolver: zodResolver(BriefFormSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    // watch,
    // formState: { 
    //   isValid,
    //  },
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
        "
      >
        <Box
          id="new-brief-page-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            h-full
            mb-8
          "
        >
          <ProjectHeader />
          {/* DELETE: Display Form Data */}
          {/* {JSON.stringify(form, null, 2)} */}
          <BriefForm />
        </Box>
      </form>
    </FormProvider>
  );
}