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

type OpenAiMessageType = {
  role: string;
  content: string;
};

type OpenAiChoiceType = {
  message: OpenAiMessageType;
  logprobs: null | object;
  finish_reason: string;
  index: number;
};

type OpenAiResponseType = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: OpenAiChoiceType[];
};

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
  async function fetchWithRetry(
    url: string, 
    body: Record<string, unknown>, 
    retries = 3, 
    delay = 1000
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Attempt ${attempt}: Server responded with status ${response.status}`);
        }

        return response.json();
      } catch (error) {
        console.error(`Attempt ${attempt}:`, error);

        if (attempt === retries) {
          throw new Error(`Failed after ${retries} attempts.`);
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  // Construct OpenAI prompt
  async function constructPrompt(data: BriefFormType): Promise<string> {
    const promptParts: { [key: string]: string } = {
      role: "You are a marketing and advertising expert.",
      client: data.company_name ? `Client: ${data.company_name}. ${data.company_details ?? ''}` : '',
      product: data.product_details ? `Product Details: ${data.product_details}` : '',
      context: `Context: Your task is to generate marketing ideas.`,
      targets: data.target_markets?.length ? `Targets: ${data.target_genders?.join(", ") || 'all genders'} aged ${data.target_ages?.join(", ") || 'all ages'} in ${data.target_markets.join(", ")}. ${data.target_description ?? ''}` : '',
      usp: data.product_usp ? `USP: ${data.product_usp}` : '',
      goals: data.project_goals?.length ? `Goals: ${data.project_goals.join(", ")}` : '',
      goals_details: data.project_goals_details ? `Goals Details: ${data.project_goals_details}` : '',
      objectives: data.project_objectives?.length ? `Objectives: ${data.project_objectives.join(", ")}` : '',
      strategy: data.brand_strategy ? `Brand Strategy: ${data.brand_strategy}` : '',
      message: data.brand_message ? `Brand Message: ${data.brand_message}` : '',
      tone: data.brand_tone ? `Brand Tone: ${data.brand_tone}` : '',
      mediums: data.ideas_medium?.length ? `Mediums: ${data.ideas_medium.join(", ")}` : '',
      channels: data.ideas_channels?.length ? `Channels: ${data.ideas_channels.join(", ")}` : '',
    };

    const prompt = Object.values(promptParts).filter(part => part).join("\n");

    return `${prompt}\nPlease generate marketing ideas in the following format:\n\nIdea Name #1\nProblem: [Problem statement]\nInsight: [Unique insight]\nIdea: [Big idea description]\n`;
  };

  // Submit form
  async function onSubmit(data: BriefFormType) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Submitting brief...",
    });
    setShowAlertInfo(true);

    try {
      const constructedPrompt = await constructPrompt(data);

      if (constructedPrompt) {
        const openAiResponse: OpenAiResponseType = await fetchWithRetry("/api/data/generate-ideas", {
          prompt: constructedPrompt,
        });

        if (openAiResponse && openAiResponse.choices) {
          const ideas = openAiResponse.choices.map((choice) => choice.message.content);

          const supabaseResponse = await fetch("/api/data/submit-brief-form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              ideas,
            }),
          });

          const responseData = await supabaseResponse.json();

          if (supabaseResponse.ok && responseData.data) {
            setAlertInfo({
              type: "success",
              icon: <CheckIcon />,
              message: "Brief form submitted successfully! Redirecting...",
            });

            setTimeout(() => {
              setShowAlertInfo(false);
              router.push(`/briefs/${responseData.data.id}`);
            }, 5000);
          } else {
            throw new Error(responseData.error);
          }
        } else {
          throw new Error("Error generating ideas");
        }
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: `Error submitting brief: ${(error as Error).message}`,
      });
    }

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