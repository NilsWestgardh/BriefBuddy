"use server";

// AI SDK
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
// Validation
import GenerateIdeasSchema from "@/app/utils/schemas/GenerateIdeasSchema";
import { IdeaType } from "@/app/utils/types/IdeaType";

const intro = {
  role: "Role: You are an expert marketing and advertising creative. ",
  goal: "Goal: Generate 1 advertising campaign idea based on the brief. ", 
  format: "Use the following format for each idea: ",
  parts: "Title, Description, Problem, Insight, and Solution. "
};

export async function generateIdeas(
  prompt: string, 
  quantity: number, 
  project_id: number, 
  brief_id: number
) {
  const ideas: IdeaType[] = [];

  for (let i = 0; i < quantity; i++) {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: GenerateIdeasSchema,
      prompt: `${intro.role}${intro.goal}${intro.format}${intro.parts}Here's the brief: \n${prompt}`,
    });

    const idea: IdeaType = {
      name: object.name,
      description: object.description,
      problem: object.problem,
      insight: object.insight,
      solution: object.solution,
      project_id: project_id,
      brief_id: brief_id,
      archived: false,
    };

    ideas.push(idea);
  }

  return ideas;
};