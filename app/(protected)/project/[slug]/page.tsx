"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProject } from "@/app/contexts/ProjectContext";
import { useUser } from "@/app/contexts/UserContext";
import { BriefFormType } from "@/app/utils/types/BriefFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
import { IdeaType } from "@/app/utils/types/IdeaType";
import { createClient } from "@/app/utils/supabase/client";
import ProjectHeader from "@/app/components/project/ProjectHeader";
import BriefForm from "@/app/components/project/BriefForm";
import SubmitButton from "@/app/components/project/SubmitButton";
import ProjectTabsMenu from "@/app/components/project/ProjectTabsMenu";
import ProjectTabContent from "@/app/components/project/ProjectTabContent";
import TeamTable from "@/app/components/team/TeamTable";
import TeamTableHeader from "@/app/components/team/TeamTableHeader";
import IdeaContainer from "@/app/components/project/idea/IdeaContainer";
import IdeasPlaceholder from "@/app/components/project/idea/IdeasPlaceholder";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

export default function ProjectIdPage({ params }: { params: { slug: string } }) {
  const projectId = parseInt(params.slug);
  const router = useRouter();
  const initialRender = useRef(true);
  const supabase = createClient();
  const { projects, projectMembers, fetchProjectMembers } = useProject();
  const { user } = useUser();

  const methods = useForm<BriefFormType>({
    defaultValues: {
      project_id: projectId,
      project_name: projects.find((project) => project.id === projectId)?.name || "",
      client_name: "",
      project_details: "",
      product_details: "",
      product_usp: "",
      goals_details: "",
      goals_objectives: [],
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

  const { watch, handleSubmit } = methods;
  const form = watch();

  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState(0);
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Fetch project members on mount
  useEffect(() => {
    if (projectId) {
      fetchProjectMembers(projectId);
    }
  }, [projectId]);

  // Log project members
  useEffect(() => {
    console.log("Project Members:", projectMembers); // Debug log
  }, [projectMembers]);

  // Tab change handler
  function handleTabChange(event: React.SyntheticEvent, newTab: number) {
    setTab(newTab);
  }

  // Construct OpenAI prompt
  async function constructPrompt(
    data: BriefFormType
  ): Promise<string> {
    const promptParts: { [key: string]: string } = {
      client: data.client_name ? `Client: ${data.client_name}.` : '',
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
  }

  // Submit form
  async function onSubmit(data: BriefFormType) {
    setAlertInfo({
      type: 'info',
      icon: <InfoIcon />,
      message: 'Submitting brief...',
    });
    setShowAlertInfo(true);

    console.log('Submitting brief:', data);

    try {
      if (!user) return;

      const isProjectMember = projectMembers.some(
        member => member.project_id === data.project_id && 
        member.user_id === user.id
      );

      if (!isProjectMember) {
        throw new Error('User is not a member of the project');
      }

      if (
        isProjectMember && 
        data.ideas_quantity > 0
      ) {
        // Check if the user is part of the project
        const constructedPrompt = await constructPrompt(data);

        // Insert brief
        const briefResponse = await fetch('/api/data/insert-brief', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
          }),
        });

        const briefData = await briefResponse.json();

        if (!briefResponse.ok) {
          throw new Error(briefData.error);
        }

        // Insert ideas
        const response = await fetch('/api/data/insert-ideas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: constructedPrompt,
            ideas_quantity: data.ideas_quantity,
            project_id: data.project_id,
            brief_id: briefData.brief.id,
          }),
        });

        const responseData = await response.json();

        if (response.ok && responseData.ideas) {
          setAlertInfo({
            type: 'success',
            icon: <CheckIcon />,
            message: 'Brief form submitted successfully!',
          });

          // Fetch ideas from Supabase
          fetchIdeas(data.project_id);

          setTab(1);
        } else {
          throw new Error(responseData.error);
        }
      }
    } catch (error) {
      console.log('Error submitting brief:', error);
      setAlertInfo({
        type: 'error',
        icon: <ErrorIcon />,
        message: `Error submitting brief: ${(error as Error).message}`,
      });
    }

    setTimeout(() => {
      setShowAlertInfo(false);
    }, 5000);
  }

  // Fetch ideas
  async function fetchIdeas(projectId: number) {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching ideas:", error);
      return null;
    } else {
      setIdeas(data);
    }
  }

  // Fetch user's project role
  useEffect(() => {
    async function getUserRole() {
      if (!user) return;

      if (!user.id || !projectId) {
        console.log("Profile ID or Project ID is missing");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("project_members")
          .select("project_role")
          .eq("project_id", projectId)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching user role:", error);
          return;
        }

        if (data && data.length > 0 && data[0].project_role === "viewer") {
          console.log("User is a viewer.");
          setIsGuest(true);
        } else {
          setIsGuest(false);
        }
      } catch (error) {
        console.error("Unexpected error fetching user role:", error);
      }
    }

    getUserRole();
  }, [user, supabase]);

  // Fetch project ideas
  useEffect(() => {
    if (ideas === null) {
      fetchIdeas(parseInt(params.slug));
    }
  }, [ideas]);

  // Redirect to home if project isn't found in ProjectContext
  useEffect(() => {
    if (!projects) return;

    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const projectExists = projects.some(
      (project) => project.id.toString() === params.slug
    );

    if (!projectExists) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [projects, params.slug, router]);

  console.log("Form validity:", methods.formState.isValid);
  console.log("Form: ", form);

  return (
    <>
      <FormProvider {...methods}>
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
            id="project-page-container"
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
              <ProjectHeader
                loading={loading}
                project_id={projectId}
              />
              <ProjectTabsMenu
                tab={tab}
                handleTabChange={handleTabChange}
              />
            </Box>
            <ProjectTabContent value={tab} index={0}>
              <BriefForm isGuest={isGuest} />
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
                  isGuest={isGuest}
                />
              </Box>
            </ProjectTabContent>
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

            {showAlertInfo && (
              <Alert
                severity={alertInfo?.type}
                icon={alertInfo ? alertInfo.icon : undefined}
              >
                {alertInfo ? alertInfo.message : "Error"}
              </Alert>
            )}
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
