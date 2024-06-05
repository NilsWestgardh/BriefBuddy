export type TeamFormType = {
  id: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  plan?: string;
  projects_limit?: number;
  members_limit?: number;
};