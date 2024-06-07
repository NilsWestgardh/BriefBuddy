export type ProjectType = {
  id: number;
  team_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  client?: string;
  details?: string;
  ideas_limit?: number;
};