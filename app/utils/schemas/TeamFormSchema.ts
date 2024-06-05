import { z } from "zod";

const TeamFormSchema = z.object({
  id: z.number(),
  user_id: z.string().optional().or(z.literal("")),
  created_at: z.string().optional().or(z.literal("")),
  updated_at: z.string().optional().or(z.literal("")),
  name: z.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters"),
  plan: z.string().optional().or(z.literal("")),
  projects_limit: z.number().optional(),
  members_limit: z.number().optional(),
});

export default TeamFormSchema;