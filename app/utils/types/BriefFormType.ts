export type BriefFormType = {
  // Ids
  id: number;
  project_id: number;
  // Basics
  created_at: string;
  updated_at?: string;
  client_name?: string;
  // Background
  client_details?: string;
  project_details?: string;
  // Product
  product_details?: string;
  product_usp?: string;
  // Goals
  goals_details?: string;
  goals_objectives?: string[];
  // Brand
  brand_strategy?: string;
  brand_message?: string;
  brand_tone?: string;
  // Targets
  target_markets?: string[];
  target_genders?: string[];
  target_ages?: string[];
  target_description?: string;
  // Ideas
  ideas_medium?: string[];
  ideas_channels?: string[];
  ideas_quantity: number;
};