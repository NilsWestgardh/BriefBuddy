import { z } from 'zod';

const ProjectFormSchema = z.object({
  id: z.number().optional(),
  team_id: z.number(),
  user_id: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  name: z.string().min(4, "Minimum 4 characters").max(50, "Maximum 50 characters"),
  client: z.string().optional(),
  details: z.string().optional(),
  ideas_limit: z.number().optional(),
});

export default ProjectFormSchema;