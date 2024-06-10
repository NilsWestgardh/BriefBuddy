"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { BriefFormType } from "@/app/utils/types/BriefFormType";

export async function fetchBriefUtil(
  projectId: number,
): Promise<BriefFormType> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { 
    data, 
    error 
  } = await supabase
    .from("briefs")
    .select("*")
    .eq(
      "project_id", 
      projectId
    )
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error(
      "Error fetching brief: ", 
      error
    );
    throw error;
  }
  return data[0] as BriefFormType;
}