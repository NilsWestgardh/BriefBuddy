import { TeamType } from '@/app/utils/types/TeamType';
import { UserProfileType } from '@/app/utils/types/UserProfileType';

export type TeamMemberType = {
  id: number;
  created_at: string;
  updated_at?: string;
  team_id: number;
  user_id: string;
  role: string;
  status: string;
  users: UserProfileType;
  teams?: TeamType[];
};