import { Course, CourseBySlugResponse, CourseResponse } from "@/models/Course";
import API from "./API";

type CourseParams = {
  limit?: number;
};

export const getCourses = async (params?: CourseParams) => {
  try {
    const response = await API.get<CourseResponse>(`/courses/`, {
      params: params,
    });

    return response.data.result;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unknown error occurred");
  }
};

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    const response = await API.get<CourseBySlugResponse>(`/courses/${slug}`);

    return response.data.result;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unknown error occurred");
  }
};
