import { Course, CourseResponse } from "@/models/Course";
import API from "./API";
import { AxiosError } from "axios";

type CourseParams = {
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
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

export const getCourseBySlug = async (slug: string, user_id: number) => {
  try {
    const response = await API.get(`/courses/${slug}?user_id=${user_id}`);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch course");
    }
    throw new Error("An unknown error occurred");
  }
};

export const joinCourse = async ({
  user_id,
  course_id,
}: {
  user_id: number;
  course_id: number;
}): Promise<Course> => {
  try {
    const response = await API.post(`/join-course`, {
      user_id: user_id,
      course_id: course_id,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch course");
    }
    throw new Error("An unknown error occurred");
  }
};

export const leaveCourse = async ({
  user_id,
  course_id,
}: {
  user_id: number;
  course_id: number;
}): Promise<Course> => {
  try {
    const response = await API.post(`/leave-course`, {
      user_id: user_id,
      course_id: course_id,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch course");
    }
    throw new Error("An unknown error occurred");
  }
};
