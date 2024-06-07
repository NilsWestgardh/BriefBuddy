"use client";

import React, { 
  useState, 
  useEffect,
  useRef,
} from "react";
import { 
  useForm, 
  FormProvider 
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProject } from "@/app/contexts/ProjectContext";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
// Types
import { IdeaType } from "@/app/utils/types/IdeaType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// import PostHogClient from "@/app/utils/posthog/posthog";
// Custom Components
import ProjectHeader from "@/app/components/project/ProjectHeader";
import BriefForm from "@/app/components/project/BriefForm";
import SubmitButton from "@/app/components/project/SubmitButton";
import ProjectTabsMenu from "@/app/components/project/ProjectTabsMenu";
import ProjectTabContent from "@/app/components/project/ProjectTabContent";
import IdeaContainer from "@/app/components/project/IdeaContainer";
import TeamTable from "@/app/components/team/TeamTable";
import TeamTableHeader from "@/app/components/team/TeamTableHeader";
import IdeasPlaceholder from "@/app/components/project/IdeasPlaceholder";
// Components
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

// TODO: Replace with fetched ideas data
// const placeholderIdeas = [
//   {
//     title: "Amazing idea",
//     description: "Amazing idea for a campaign",
//     problem: "Problem lorem ipsum dolor sit amet.",
//     insight: "Insight lorem ipsum dolor sit amet.",
//     idea: "Idea lorem ipsum dolor sit amet.",
//   },
//   {
//     title: "Astonishing idea",
//     description: "Astonishing idea for a campaign",
//     problem: "Problem lorem ipsum dolor sit amet.",
//     insight: "Insight lorem ipsum dolor sit amet.",
//     idea: "Idea lorem ipsum dolor sit amet.",
//   },
//   {
//     title: "Superb idea",
//     description: "Superb idea for a campaign",
//     problem: "Problem lorem ipsum dolor sit amet.",
//     insight: "Insight lorem ipsum dolor sit amet.",
//     idea: "Idea lorem ipsum dolor sit amet.",
//   },
// ];

export default function ProjectIdPage({ 
  params 
}: { params: { 
  slug: string 
}}) {
  const projectId = parseInt(params.slug);
  const methods = useForm<BriefFormType>({
    defaultValues: {
      // Ids
      id: 0,
      project_id: projectId,
      // Basics
      created_at: "",
      updated_at: "",
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
  const initialRender = useRef(true);
  const supabase = createClient();
  const { projects} = useProject();

  const [loading, setloading] = useState<boolean>(false);
  const [tab, setTab] = useState(0);
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Fetch ideas
  async function fetchIdeas(
    projectId: number
  ) {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching ideas:", error);
      return null;
    } else (
      setIdeas(data)
    );
  };

  // Tab change handler
  function handleTabChange(
    event: React.SyntheticEvent, 
    newTab: number
  ) {
    setTab(newTab);
  };

  // Construct OpenAI prompt
  async function constructPrompt(
    data: BriefFormType
  ): Promise<string> {
    const promptParts: { 
      [key: string]: string 
    } = {
      client: data.client_name ? `Client: ${data.client_name}. ${data.client_details ?? ''}` : '',
      product: data.product_details ? `Product Details: ${data.product_details}` : '',
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
    return prompt;
  };

  // Submit form
  async function onSubmit(
    data: BriefFormType
  ) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Submitting brief...",
    });
    setShowAlertInfo(true);

    try {
      const constructedPrompt = await constructPrompt(data);

      if (constructedPrompt) {
        const response = await fetch("/api/data/generate-ideas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: constructedPrompt,
            ideas_quantity: data.ideas_quantity,
          }),
        });

        const generatedIdeas = await response.json();

        if (generatedIdeas) {
          const supabaseResponse = await fetch("/api/data/insert-ideas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ideas: generatedIdeas.ideas,
              project_id: data.project_id,
              brief_id: data.id,
            }),
          });

          const responseData = await supabaseResponse.json();

          if (
            supabaseResponse.ok && 
            responseData.data
          ) {
            setAlertInfo({
              type: "success",
              icon: <CheckIcon />,
              message: "Brief form submitted successfully!",
            });

            // TODO: Register event in posthog

            // Switch to ideas tab
            setTab(1);

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

  // Fetch project ideas
  useEffect(() => {
    if (ideas === null) {
      fetchIdeas(parseInt(params.slug))
    };
  }, [ideas]);

  // Redirect to home if project 
  // isn't found in ProjectContext
  useEffect(() => {
    if (!projects) return;

    if (initialRender.current) {
      initialRender.current = false;
      return;
    };

    const projectExists = projects.some(
      (project) => project.id.toString() === params.slug
    );
  
    if (!projectExists) {
      router.push("/home");
    } else {
      setloading(true);
    };
  }, [
    projects,
    params.slug,
    router,
  ]);

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
              <ProjectHeader loading={loading} project_id={projectId} />
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
                  cta="Generate ideas" 
                  feedback="Generating ideas..."
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
                {
                  ideas.length > 0 ? ideas.map((idea, index) => (
                    <IdeaContainer
                      key={index}
                      id={idea.id}
                      title={idea.name}
                      description={idea.description}
                      problem={idea.problem}
                      insight={idea.insight}
                      idea={idea.solution}
                      idea_quantity={ideas.length}
                    />
                  )) : <IdeasPlaceholder onClick={() => setTab(0)} />
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