"use client";

// Hooks
import React, { 
  useEffect, 
  useRef 
} from "react";
import { useRouter } from "next/navigation";
import { useTeam } from "@/app/contexts/TeamContext";
// Custom components
import TeamHeader from "@/app/components/team/TeamHeader";
import TeamTable from "@/app/components/team/TeamTable";
import TeamTableHeader from "@/app/components/team/TeamTableHeader";
// Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function TeamIdPage({ 
  params 
}: { params: { 
  slug: string 
}}) {
  const { 
    selectedTeam, 
    setSelectedTeam, 
    teams 
  } = useTeam();
  const router = useRouter();
  const initialRender = useRef(true);

  // Redirect to selected team page if
  // slug doesn't match selected team id
  useEffect(() => {
    if (!selectedTeam) return;

    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (
      params.slug !== selectedTeam.id.toString()
    ) {
      const matchingTeam = teams
        .find(team => team.id.toString() === params.slug);
      if (matchingTeam) {
        setSelectedTeam(matchingTeam);
      } else {
        router.push(`/team/${selectedTeam.id}`);
      }
    }
  }, [
    selectedTeam, 
    params.slug, 
    teams, 
    router, 
    setSelectedTeam
  ]);

  return selectedTeam && 
    params.slug === selectedTeam.id.toString() ? (
    <Box
      id={`team-${params.slug}-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
      "
    >
      <TeamHeader />
      <Box
        id="team-table-container"
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
        <TeamTableHeader />
        <TeamTable />
      </Box>
    </Box>
  ) : (
    <Box
      id="loading-skeleton-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
      "
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        animation="wave"
      />
      <Box
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
        <Skeleton
          variant="rectangular"
          width="100%"
          height={72}
          animation="wave"
          className="rounded-md"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={240}
          animation="wave"
          className="rounded-md"
        />
      </Box>
    </Box>
  );
};