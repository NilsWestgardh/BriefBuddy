"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import BriefFormSchema from "@/app/utils/schemas/BriefFormSchema";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const briefData = BriefFormSchema.parse(await req.json());
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if the user is part of the project
      const { 
        data: projectMember, 
        error: memberError 
      } = await supabase
        .from("project_members")
        .select("*")
        .eq(
          "project_id", 
          briefData.project_id
        )
        .eq("user_id", user.id)
        .single();

      if (
        memberError || 
        !projectMember
      ) {
        console.error("User is not a member of the project");
        return new NextResponse(
          JSON.stringify({ 
            error: "User is not a member of the project" 
          }),
          { 
            status: 403, 
            headers: { 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      const { data, error } = await supabase
        .from("briefs")
        .insert([briefData])
        .select()
        .single();

      if (error) {
        console.error(
          "Error inserting brief:", 
          error
        );
        return new NextResponse(
          JSON.stringify({ 
            error: error.message 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      console.log("Brief data uploaded successfully!");
      return new NextResponse(
        JSON.stringify({ brief: data }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json' 
          } 
        }
      );

    } else {
      console.error("User not found");
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return new NextResponse(
        JSON.stringify({ error: error.flatten() }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
};