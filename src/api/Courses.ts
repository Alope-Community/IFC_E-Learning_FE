import { Course, CourseBySlugResponse } from "@/models/Course";
import API from "./API";

// export const getCourse = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }): Promise<LoginResponse> => {
//   try {
//     const response = await API.post<LoginResponse>("/login", {
//       email,
//       password,
//     });

//     const { token } = response.data.result;

//     localStorage.setItem("token", token);

//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.data) {
//       throw new Error(error.response.data.message || "Login failed");
//     }
//     throw new Error("An unknown error occurred");
//   }
// };

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
