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
  limit: "Limit: 100 words. ",
  format: "Use the following format for each idea: ",
  parts: "Title, Description, Problem, Insight, and Solution. "
};

export const maxDuration = 15;

export async function generateIdeas(
  prompt: string, 
  quantity: number, 
  project_id: number, 
  brief_id: number
) {
  const ideas: IdeaType[] = []; 

  const generateIdea = async (index: number) => {
    try {
      const { 
        object 
      } = await generateObject({
        model: openai('gpt-4o'),
        maxTokens: 200,
        schema: GenerateIdeasSchema,
        prompt: `${intro.role}${intro.goal}${intro.limit}${intro.format}${intro.parts}Here's the brief: \n${prompt}`,
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

      GenerateIdeasSchema.parse(idea);

      ideas.push(idea);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        `Error generating idea ${index + 1}: ${error.message}`
      );
    }
  };

  // Generate ideas concurrently
  const generateIdeaPromises = Array
    .from({ length: quantity }, (_, index) => generateIdea(index));
  await Promise.all(generateIdeaPromises);

  return ideas;
};