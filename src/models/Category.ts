import { BaseResponseAPI } from "./_BaseResponse";

export interface CategoryResponse extends BaseResponseAPI {
  result: Category[];
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}
