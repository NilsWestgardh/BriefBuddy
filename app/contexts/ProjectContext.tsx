"use client";

// Hooks
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { useUser } from '@/app/contexts/UserContext';
import { useTeam } from '@/app/contexts/TeamContext';
// Utils
import { createClient } from "@/app/utils/supabase/client";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
// Types
import { ProjectType } from "@/app/utils/types/ProjectType";
import { ProjectMemberType } from "@/app/utils/types/ProjectMemberType";

type ProjectContextType = {
  projects: ProjectType[];
  projectMembers: ProjectMemberType[];
  fetchProjects: (
    teamId: number, 
    userId: string
  ) => void;
  fetchProjectMembers: (
    projectId: number
  ) => void;
};

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  projectMembers: [],
  fetchProjects: () => {},
  fetchProjectMembers: () => {},
});

export default function ProjectProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { user } = useUser();
  const { selectedTeam } = useTeam();
  const supabase = createClient();

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [projectMembers, setProjectMembers] = useState<ProjectMemberType[]>([]);

  // Fetch projects
  async function fetchProjects(
    teamId: number,
    userId: string,
  ) {
    const { 
      data, 
      error 
    } = await supabase
      .from("projects")
      .select("*")
      .eq(
        "team_id", 
        teamId
      )
      .eq(
        "user_id",
        userId
      );

    if (error) {
      console.error(
        "Error fetching projects: ", 
        error
      );
    } else {
      setProjects(data);
    };
  };

  // Fetch project members
  async function fetchProjectMembers(
    projectId: number
  ) {
    const { 
      data, 
      error 
    } = await supabase
      .from("project_members")
      .select("*")
      .eq(
        "project_id", 
        projectId
      );

    if (error) {
      console.error(
        "Error fetching project members: ", 
        error
      );
    } else {
      setProjectMembers(data);
    };
  };

  // Fetch team projects on team selection
  useEffect(() => {
    if (
      selectedTeam && 
      user
    ) {
      fetchProjects(
        selectedTeam.id, 
        user.id
      );
    };
  }, [
    selectedTeam, 
    user
  ]);

  // Subscribe to project changes
  useEffect(() => {
    const channel = supabase
      .channel("realtime project changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        (payload: RealtimePostgresChangesPayload<ProjectType>) => {
          console.log("Project data change: ", payload)
          if (
            selectedTeam && 
            user
          ) {
            fetchProjects(
              selectedTeam.id,
              user.id
            )
          }
        }
      )
      .subscribe();

      return () => {
        channel.unsubscribe();
      };

  }, [
    selectedTeam, 
    user
  ]);

  // Subscribe to project changes
  useEffect(() => {
    const channel = supabase
      .channel("realtime project member changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_members",
        },
        (payload: RealtimePostgresChangesPayload<ProjectMemberType>) => {
          console.log(
            "Project members data change: ", 
            payload
          ); // Debugging
          if (
            selectedTeam && 
            user
          ) {
            fetchProjectMembers((payload.new as ProjectMemberType).project_id)
          }
        }
      )
      .subscribe();

      return () => {
        channel.unsubscribe();
      };

  }, [
    selectedTeam, 
    user
  ]);

  // Debug
  // useEffect(() => {
  //   console.log("projects", projects);
  //   console.log("projectMembers", projectMembers);
  // }, [projects, projectMembers])

  return (
    <ProjectContext.Provider
      value={{ 
        projects, 
        projectMembers, 
        fetchProjects, 
        fetchProjectMembers 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);