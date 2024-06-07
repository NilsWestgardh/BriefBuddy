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