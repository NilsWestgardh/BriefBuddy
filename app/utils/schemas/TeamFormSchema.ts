import { z } from 'zod';

const TeamFormSchema = z.object({
  id: z.number(),
  user_id: z.number().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  name: z.string().min(4, "Minimum 3 characters").max(20, "Maximum 20 characters"),
  plan: z.string().optional(),
  project_limit: z.number().optional(),
  members_limit: z.number().optional(),
});

export default TeamFormSchema;