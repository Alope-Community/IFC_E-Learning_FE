import { Course, CourseBySlugResponse, CourseResponse } from "@/models/Course";
import API from "./API";
import { AxiosError } from "axios";
import { Category, CategoryResponse } from "@/models/Category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await API.get<CategoryResponse>("/categories");

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch courses");
    }
    throw new Error("An unknown error occurred");
  }
};
