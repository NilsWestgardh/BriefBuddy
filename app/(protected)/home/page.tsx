"use client";

// Hooks
import React, { 
  useState,
  useEffect,
} from "react";
import { useTeam } from "@/app/contexts/TeamContext";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Types
import { ProjectCardType } from "@/app/utils/types/ProjectCardType";
// Custom Components
import ProjectCard from "@/app/components/ProjectCard";
import CreateProjectButton from "@/app/components/project/CreateProjectButton";
// Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const sortByOptions = {
  latest: "latest",
  oldest: "oldest",
};

export default function Home() {
  const supabase = createClient();
  const { selectedTeam } = useTeam();

  const [projectCards, setProjectCards] = useState<ProjectCardType[]>([]);
  const [sortBy, setSortBy] = useState<string>(sortByOptions.latest);

  // TODO: Sort by logic
  useEffect(() => {
    if (!selectedTeam) return;

    async function fetchprojects() {
      const { 
        data, 
        error 
      } = await supabase
        .from("projects")
        .select(`
          id,
          created_at,
          updated_at,
          team_id,
          user_id,
          name,
          client,
          ideas_limit,
          details,
          team_members ( id, created_at, updated_at, team_id, user_id, role, status, users )
        `)
        .eq(
          "team_id", 
          selectedTeam?.id
        )
        .order("created_at", { 
          ascending: sortBy === sortByOptions.oldest 
        });
      
      if (error) {
        console.log(
          "Error fetching projects: ", 
          error
        );
      } else if (data) {
        console.log("Projects fetched: ", data)
        setProjectCards(data);
      };
    };
    fetchprojects();
  }, [
    supabase, 
    selectedTeam, 
    sortBy
  ]);

  return (
    <Box
      id="home-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
        p-6
      "
    >
      <Box
        id="home-header"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
        <Typography
          variant="h4"
          className="
            text-black
            font-semibold
            mb-2
          "
        >
          My home
        </Typography>
        <CreateProjectButton />
      </Box>
      
      <Box
        id="sort-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          gap-1
        "
      >
        <Typography
          variant="overline"
          className="
            text-neutral-500
          "
        >
          Sort by
        </Typography>
        <Button
          size="small"
          color={sortBy === sortByOptions.latest ? "primary" : "secondary"}
          onClick={() => setSortBy(sortByOptions.latest)}
        >
          Latest
        </Button>
        <Button
          size="small"
          color={sortBy === sortByOptions.oldest ? "primary" : "secondary"}
          onClick={() => setSortBy(sortByOptions.oldest)}
        >
          Oldest
        </Button>
      </Box>
      {projectCards.length > 0 && (
        <Box
          id="projects-container"
          className="
            flex
            flex-col
            flex-wrap
            justify-start
            items-start
            w-full
            gap-4
          "
        >
          {projectCards.map((projectCard) => (
            <Box
              key={projectCard.id}
              id={`project-${projectCard.id}-card`}
              className="
                flex
                flex-col
                justify-start
                items-start
                max-w-[300px]
                min-w-[200px]
                w-full
                gap-4
                p-4
                rounded-lg
                border
                border-black
                hover:border-neutral-500
                hover:bg-neutral-50
              "
            >
              <ProjectCard
                id={projectCard.id}
                created_at={projectCard.created_at}
                updated_at={projectCard.updated_at}
                name={projectCard.name}
                client={projectCard?.client ?? 'ACME Inc.'}
                details={projectCard.details}
                ideas_limit={projectCard.ideas_limit}
                ideas_count={projectCard.ideas_count}
                team_members={projectCard.team_members}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};