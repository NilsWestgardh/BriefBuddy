import { TeamMemberType } from "@/app/utils/types/TeamMemberType";

export type ProjectMemberType = {
  id: number;
  created_at: string;
  updated_at?: string;
  user_id: string;
  team_member?: TeamMemberType;
  project_role: string;
  project_id: number;
};