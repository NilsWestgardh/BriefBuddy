import { z } from 'zod';

const GenerateIdeasSchema = z.object({
  id: z.number(),
  name: z.string().describe("The name of the idea"),
  description: z.string().describe("The description of the idea"),
  problem: z.string().describe("The problem the idea solves"),
  insight: z.string().describe("The insight behind the idea"),
  solution: z.string().describe("The solution the idea provides"),
});

export default GenerateIdeasSchema;