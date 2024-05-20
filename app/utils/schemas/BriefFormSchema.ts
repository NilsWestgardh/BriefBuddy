import { z } from 'zod';

const BriefFormSchema = z.object({
  id: z.number().optional(),
  user_id: z.number().optional(), // TODO: Change to required
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  project_name: z.string().optional(),
  company_avatar: z.string().optional(),
  company_name: z.string().optional(),
  company_details: z.string().optional(),
  project_details: z.string().optional(),
  product_details: z.string().optional(),
  product_usp: z.string().optional(),
  project_goals: z.array(z.string()).optional(),
  project_goals_details: z.string().optional(),
  project_objectives: z.array(z.string()),
  brand_strategy: z.string().optional(),
  brand_message: z.string().optional(),
  brand_tone: z.string().optional(),
  target_markets: z.array(z.string()).optional(),
  target_genders: z.array(z.string()).optional(),
  target_ages: z.array(z.string()).optional(),
  target_description: z.string().optional(),
  ideas_medium: z.array(z.string()).optional(),
  ideas_channels: z.array(z.string()).optional(),
  ideas_quantity: z.number(),
  ideas_generated: z.array(z.string()).optional(),
});

export default BriefFormSchema;