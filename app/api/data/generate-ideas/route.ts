import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
// Validation
import { z } from "zod";
import GenerateIdeasSchema from "@/app/utils/schemas/GenerateIdeasSchema";

const model = "gpt-4o";

export async function POST(req: NextRequest) {
  const { prompt, ideas_quantity } = await req.json();

  try {
    const { object } = await generateObject({
      model: openai(model),
      schema : z.object({
        ideas: GenerateIdeasSchema.array().length(ideas_quantity),
      }),
      prompt: `You are an expert marketing and advertising creative. Generate ${ideas_quantity} advertising campaign ideas. Use the following format for each idea: Title, Description, Problem, Insight, and Solution.\n${prompt}`,
    });

    const ideas = object.ideas;

    return NextResponse.json({ ideas });

  } catch (error) {
    console.error("Error generating ideas:", error);
    return new NextResponse(JSON.stringify({ 
      error: "Error generating ideas" 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  };
};