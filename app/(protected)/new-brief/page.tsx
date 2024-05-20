"use client";

import React, { useState } from "react";
import { 
  useForm, 
  FormProvider 
} from "react-hook-form";
import { useRouter } from "next/navigation";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
// Utils
// import PostHogClient from "@/app/lib/posthog/posthog";
// Custom Components
import ProjectHeader from "@/app/components/brief-form/ProjectHeader";
import BriefForm from "@/app/components/brief-form/BriefForm";
// Components
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

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

  // Utils
  // const form = watch();
  // const posthog = PostHogClient();
  const router = useRouter();

  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // OpenAI API fetch with retry
  // async function fetchIdeasWithRetry(
  //   url: string, 
  //   body: Record<string, unknown>, 
  //   retries = 3, 
  //   delay = 1000
  // ) {
  //   for (let attempt = 1; attempt <= retries; attempt++) {
  //     try {
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(body),
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`Attempt ${attempt}: Server responded with status ${response.status}`);
  //       }
  
  //       return response;
  //     } catch (error) {
  //       console.error(`Attempt ${attempt}:`, error);
  
  //       if (attempt === retries) {
  //         throw new Error(`Failed after ${retries} attempts.`);
  //       }
  
  //       await new Promise(resolve => setTimeout(resolve, delay));
  //       delay *= 2;
  //     }
  //   }
  // }

  async function onSubmit(
    data: BriefFormType
  ) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Submitting card..."
    });
    setShowAlertInfo(true);

    try {
      // Fetch ideas
      const openAiResponse = await fetchWithRetry(
        "/api/data/generate-ideas", {
        prompt: constructedPrompt,
      });
      
      if (openAiResponse.ok && onAiResponse.data) {

      }

      // Submit brief + ideas
      const supabaseResponse = await fetch("/api/submit-brief-form", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ideas: re
        }),
      });
      
      const responseData = await response.json();

      if (
        response.ok && 
        responseData.data
      ) {
        setAlertInfo({
          type: "success",
          icon: <CheckIcon />,
          message: "Card submitted successfully! Redirecting..."
        });

        // if (responseData.data) {
        //   posthog.capture({
        //     distinctId: responseData.data.id,
        //     event: "🎉 New Brief Submitted"
        //   });
        // };

        // Redirect
        setTimeout(() => {
          setShowAlertInfo(false);
          router.push(`/briefs/${responseData.data.id}`);
        }, 5000);
      } else {
        console.log("Form submit error:", responseData.error);
        setAlertInfo({
          type: "error",
          icon: <ErrorIcon />,
          message: "Error submitting brief!"
        });
      };

    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: `Error submitting brief: ${error}`
      });
    };
    setTimeout(() => {
      setShowAlertInfo(false);
    }, 5000);
  };

  return (
    <>
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

      {showAlertInfo && (
        <Alert
          severity={alertInfo?.type}
          icon={
            alertInfo ? 
            alertInfo.icon : 
            undefined
          }
          >
          {
            alertInfo ? 
            alertInfo.message : 
            "Error"
          }
        </Alert>
      )}
    </>
  );
}