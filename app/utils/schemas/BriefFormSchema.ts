import { z } from 'zod';

const BriefFormSchema = z.object({
  // Ids
  id: z.number(),
  project_id: z.number(),
  // Basics
  created_at: z.string(),
  updated_at: z.string().optional(),
  project_name: z.string(),
  client_name: z.string().optional(),
  // Background
  client_details: z.string().optional(),
  project_details: z.string().optional(),
  // Product
  product_details: z.string().optional(),
  product_usp: z.string().optional(),
  // Goals
  goals_details: z.string().optional(),
  goals_objectives: z.array(z.string()).optional(),
  // Brand
  brand_strategy: z.string().optional(),
  brand_message: z.string().optional(),
  brand_tone: z.string().optional(),
  // Targets
  target_markets: z.array(z.string()).optional(),
  target_genders: z.array(z.string()).optional(),
  target_ages: z.array(z.string()).optional(),
  target_description: z.string().optional(),
  // Ideas
  ideas_medium: z.array(z.string()).optional(),
  ideas_channels: z.array(z.string()).optional(),
  ideas_quantity: z.number(),
});

export default BriefFormSchema;
