export type TeamType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  plan?: string;
  project_limit?: number;
  members_limit?: number;
};