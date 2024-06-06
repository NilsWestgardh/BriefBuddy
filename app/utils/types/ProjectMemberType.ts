import { TeamMemberType } from "@/app/utils/types/TeamMemberType";

export type ProjectMemberType = {
  id: number;
  created_at: string;
  updated_at?: string;
  project_id: number;
  user_id: string;
  project_role: string;
  team_member?: TeamMemberType;
};