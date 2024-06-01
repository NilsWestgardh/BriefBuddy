import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { ideaType } from "@/app/utils/types/IdeaType";

export async function POST(req: NextRequest) {
  const { ideas, project_id, brief_id } = await req.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const ideasWithProjectId = ideas.map((idea: ideaType) => ({
      project_id,
      brief_id,
      name: idea.name,
      description: idea.description,
      problem: idea.problem,
      insight: idea.insight,
      solution: idea.solution,
      archived: false,
    }));

    const { data, error } = await supabase
      .from("ideas")
      .insert(ideasWithProjectId)
      .select()

    if (error) {
      console.error("Error inserting ideas:", error);
      return new NextResponse(JSON.stringify({ 
        error: error.message 
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json" 
        },
      });
    } else if (data && data.length > 0) {
      return new NextResponse(JSON.stringify({ 
        ideas: data 
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        },
      });
    };

  } catch (error) {
    console.error("Error inserting ideas:", error);
    return new NextResponse(JSON.stringify({ 
      error: "Error inserting ideas" 
    }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json" 
      },
    });
  };
};