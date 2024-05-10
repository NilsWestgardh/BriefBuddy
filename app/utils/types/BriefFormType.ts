export type BriefFormType = {
  id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  title: string;
  brief_details: string;
  company: string;
  company_details: string;
  company_avatar: string;
  product_details: string;
  usp: string;
  goals: string[];
};