"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
import { z } from "zod";

export async function POST(
  req: NextRequest
) {
  try {
    const briefData = BriefFormSchema.parse(await req.json());
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase
        .from("briefs")
        .insert([{ ...briefData, user_id: user.id }])
        .select();

      if (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (data && data.length > 0) {
        console.log("Brief data uploaded successfully!");
        return new Response(JSON.stringify({ data: data[0] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      console.error("User not found");
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return new Response(JSON.stringify({ error: error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  };
};