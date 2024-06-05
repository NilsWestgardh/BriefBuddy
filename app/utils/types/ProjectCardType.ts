import { TeamMemberType } from './TeamMemberType';

export type ProjectCardType = {
  id: number;
  created_at: string;
  updated_at?: string;
  project_id?: number;
  team_id?: number;
  user_id?: string;
  name: string;
  client?: string;
  details?: string;
  ideas_limit: number;
  ideas_count?: number;
  team_members?: TeamMemberType[];
};