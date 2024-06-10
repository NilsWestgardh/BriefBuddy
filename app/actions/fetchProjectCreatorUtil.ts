"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function fetchProjectCreatorUtil(
  user_id: string,
) {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let projectCreator: string | null = null;

  const { 
    data, 
    error 
  } = await supabase
  .from("users")
  .select("first_name, last_name")
  .eq("id", user_id)
  .single();

  if (error) {
    console.error("Error fetching project creator: ", error);
    return null;
  }

  if (data) {
    projectCreator = `${data.first_name} ${data.last_name}`;
  }

  return projectCreator;
};