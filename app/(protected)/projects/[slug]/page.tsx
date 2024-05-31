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
import ProjectHeader from "@/app/components/project/ProjectHeader";
import BriefForm from "@/app/components/project/BriefForm";
import SubmitButton from "@/app/components/project/SubmitButton";
import ProjectTabsMenu from "@/app/components/project/ProjectTabsMenu";
import ProjectTabContent from "@/app/components/project/ProjectTabContent";
import IdeaContainer from "@/app/components/project/IdeaContainer";
import TeamTable from "@/app/components/TeamTable";
import TeamTableHeader from "@/app/components/TeamTableHeader";
import IdeasPlaceholder from "@/app/components/project/IdeasPlaceholder";
// Components
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

// TODO: Replace with fetched ideas data
const placeholderIdeas = [
  {
    title: "Amazing idea",
    description: "Amazing idea for a campaign",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
  {
    title: "Astonishing idea",
    description: "Astonishing idea for a campaign",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
  {
    title: "Superb idea",
    description: "Superb idea for a campaign",
    problem: "Problem lorem ipsum dolor sit amet.",
    insight: "Insight lorem ipsum dolor sit amet.",
    idea: "Idea lorem ipsum dolor sit amet.",
  },
];

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

export default function ProjectPage() {
  const methods = useForm<BriefFormType>({
    defaultValues: {
      // Ids
      id: 0,
      project_id: 0,
      // Basics
      created_at: "",
      updated_at: "",
      project_name: "",
      client_name: "",
      // Background
      client_details: "",
      project_details: "",
      // Product
      product_details: "",
      product_usp: "",
      // Goals
      goals_details: "",
      goals_objectives: [],
      // Brand
      brand_strategy: "",
      brand_message: "",
      brand_tone: "",
      // Targets
      target_markets: [],
      target_genders: [],
      target_ages: [],
      target_description: "",
      // Ideas
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

  const [tab, setTab] = useState(0);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Tab change handler
  function handleTabChange(
    event: React.SyntheticEvent, 
    newTab: number
  ) {
    setTab(newTab);
  };

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
      };
    };
  };

  // Construct OpenAI prompt
  async function constructPrompt(data: BriefFormType): Promise<string> {
    const promptParts: { [key: string]: string } = {
      role: "You are a marketing and advertising expert.",
      client: data.client_name ? `Client: ${data.client_name}. ${data.client_details ?? ''}` : '',
      product: data.product_details ? `Product Details: ${data.product_details}` : '',
      context: `Context: Your task is to generate marketing ideas.`,
      targets: data.target_markets?.length ? `Targets: ${data.target_genders?.join(", ") || 'all genders'} aged ${data.target_ages?.join(", ") || 'all ages'} in ${data.target_markets.join(", ")}. ${data.target_description ?? ''}` : '',
      usp: data.product_usp ? `USP: ${data.product_usp}` : '',
      goals_details: data.goals_details ? `Goals Details: ${data.goals_details}` : '',
      goals_objectives: data.goals_objectives?.length ? `Objectives: ${data.goals_objectives.join(", ")}` : '',
      strategy: data.brand_strategy ? `Brand Strategy: ${data.brand_strategy}` : '',
      message: data.brand_message ? `Brand Message: ${data.brand_message}` : '',
      tone: data.brand_tone ? `Brand Tone: ${data.brand_tone}` : '',
      mediums: data.ideas_medium?.length ? `Mediums: ${data.ideas_medium.join(", ")}` : '',
      channels: data.ideas_channels?.length ? `Channels: ${data.ideas_channels.join(", ")}` : '',
    };

    const prompt = Object.values(promptParts).filter(part => part).join("\n");

    return `Please generate ${data.ideas_quantity} advertising campaign ideas base on this brief:\n${prompt}, using this format:\n\nIdea Name #1\nProblem: [Problem statement]\nInsight: [Unique insight]\nIdea: [Big idea description]`;
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
        const openAiResponse: OpenAiResponseType = await fetchWithRetry(
          "/api/data/generate-ideas", {
          prompt: constructedPrompt,
        });

        if (
          openAiResponse && 
          openAiResponse.choices
        ) {
          const ideas = openAiResponse.choices.map((choice) => choice.message.content);

          const supabaseResponse = await fetch(
            "/api/data/submit-brief-form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              ideas_generated: ideas,
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
              relative
            "
          >
            <Box
              id="project-header-container"
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                sticky
                top-0
                z-10
              "
            >
              <ProjectHeader />
              <ProjectTabsMenu
                tab={tab}
                handleTabChange={handleTabChange}
              />
            </Box>
            {/* BRIEF TAB */}
            <ProjectTabContent
              value={tab}
              index={0}
            >
              <BriefForm />
              <Box
                id="submit-button-container"
                className="
                  bottom-0
                  sticky
                  z-10
                  w-full
                  bg-white
                  border-t
                  border-neutral-300
                  p-4
                  pb-8
                "
              >
                <SubmitButton 
                  onClick={() => (setTab(1))}
                  cta="Generate ideas" 
                  feedback="Generating ideas..."
                  // TODO: Logic to call OpenAI API & switch to Ideas tab on success
                />
              </Box>
            </ProjectTabContent>
            {/* IDEAS TAB */}
            <ProjectTabContent value={tab} index={1}>
              <Box
                id="ideas-tab-container"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  gap-4
                  p-4
                "
              >
                {/* TODO: Replace with real data */}
                {
                  placeholderIdeas.length > 0 ? 
                    <>
                      {placeholderIdeas.map((idea, index) => (
                        <IdeaContainer
                          key={index}
                          id={index + 1}
                          title={idea.title}
                          description={idea.description}
                          problem={idea.problem}
                          insight={idea.insight}
                          idea={idea.idea}
                          idea_quantity={placeholderIdeas.length}
                        />
                      ))}
                    </>
                  :
                    <IdeasPlaceholder
                      onClick={() => (setTab(0))}
                    />
                }
              </Box>
            </ProjectTabContent>
            {/* TEAM TAB */}
            <ProjectTabContent value={tab} index={2}>
              <Box
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  p-4
                  gap-4
                "
              >
                <TeamTableHeader />
                <TeamTable />
              </Box>
            </ProjectTabContent>
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
};