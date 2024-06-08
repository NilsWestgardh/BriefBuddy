"use client";

import React,
{
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { createClient } from '@/app/utils/supabase/client';
import { TeamType } from "@/app/utils/types/TeamType";
import { useUser } from '@/app/contexts/UserContext';

type TeamContextType = {
  selectedTeam: TeamType | null;
  teams: TeamType[];
  setSelectedTeam: (team: TeamType) => void;
};

const TeamContext = createContext<TeamContextType>({
  selectedTeam: null,
  teams: [],
  setSelectedTeam: () => {},
});

export default function TeamProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { user } = useUser();
  const supabase = createClient();
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [teams, setTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      if (user) {
        const { 
          data, 
          error 
        } = await supabase
          .from("team_members")
          .select(`
            team_id,
            teams (
              id,
              name,
              created_at,
              updated_at,
              user_id,
              plan,
              projects_limit,
              members_limit
            )
          `)
          .eq(
            "user_id", 
            user.id
          );

        if (error) {
          console.error(
            "Error fetching teams: ", 
            error
          );
        } else if (data) {
          const fetchedTeams: TeamType[] = data.flatMap(
            (item: { teams: TeamType[] }) => item.teams
          );
          const sortedTeams = fetchedTeams.sort(
            (a, b) => a.name.localeCompare(b.name)
          );

          setTeams(sortedTeams);
          if (sortedTeams.length > 0) {
            setSelectedTeam(sortedTeams[0]);
          }
        }
      };
    };

    if (user) {
      fetchTeams();
    };

    // Subscribe to changes
    const channel = supabase
      .channel("realtime team changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "teams",
        },
        (payload) => {
          // console.log("Team data change: ", payload);
          if (
            user && (
              payload.new as { 
                user_id: string 
              }
            ).user_id === user.id
          ) {
            fetchTeams();
          }
        }
      )
      .subscribe();

      return () => {
        channel.unsubscribe();
      };

  }, [
    user, 
    supabase
  ]);
  
  return (
    <TeamContext.Provider
      value={{ 
        selectedTeam, 
        teams, 
        setSelectedTeam 
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);