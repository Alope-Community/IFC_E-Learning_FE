import { BaseResponseAPI } from "./_BaseResponse";

export interface CourseBySlugResponse extends BaseResponseAPI {
  result: Course;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  body: string;
  user_id: string;
  category_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  category: CourseCategory;
  user: CourseUser;
}

export interface CourseCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}
export interface CourseUser {
  id: number;
  nuptk: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at?: string;
  updated_at?: string;
  otp?: string;
}
