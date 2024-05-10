import { z } from 'zod';

const BriefFormSchema = z.object({
  id: z.number(),
  user_id: z.number().min(1),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string().min(1),
  brief_details: z.string().min(1),
  company: z.string().min(1),
  company_details: z.string().min(1),
  company_avatar: z.string().min(1),
  product_details: z.string().min(1),
  usp: z.string().min(1),
  goals: z.array(z.string()).min(1),
});

export default BriefFormSchema;