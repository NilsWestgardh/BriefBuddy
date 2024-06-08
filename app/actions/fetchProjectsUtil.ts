"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { ProjectType } from "@/app/utils/types/ProjectType";

export async function fetchProjectsUtil(
  teamId: number,
  userId: string,
  sortBy: "latest" | "oldest" = "latest",
): Promise<ProjectType[]> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
    )
    .order(
      "created_at", { 
      ascending: sortBy === "oldest" 
    });

  if (error) {
    console.error(
      "Error fetching projects: ", 
      error
    );
    throw error;
  }
  return data as ProjectType[];
}