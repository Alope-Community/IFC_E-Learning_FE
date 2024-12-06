import { Course, CourseBySlugResponse, CourseResponse } from "@/models/Course";
import API from "./API";
import { AxiosError } from "axios";

type CourseParams = {
  limit?: number;
  page?: number;
  search?: string;
};

export const getCourses = async (
  params?: CourseParams
): Promise<CourseResponse["result"]> => {
  try {
    const response = await API.get<CourseResponse>("/courses/", {
      params,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch courses");
    }
    throw new Error("An unknown error occurred");
  }
};

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    const response = await API.get<CourseBySlugResponse>(`/courses/${slug}`);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch course");
    }
    throw new Error("An unknown error occurred");
  }
};
