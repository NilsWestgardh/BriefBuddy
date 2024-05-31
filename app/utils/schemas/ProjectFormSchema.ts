import { z } from 'zod';

const ProjectFormSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  team_id: z.number(),
  user_id: z.number(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  name: z.string(),
  client: z.string().optional(),
  ideas_limit: z.number(),
});

export default ProjectFormSchema;