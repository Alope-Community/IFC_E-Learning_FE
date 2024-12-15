import API from "./API";
import { AxiosError } from "axios";

const getSubmitSubmission = async ({
  user_id,
  course_slug,
}: {
  user_id: number;
  course_slug: string;
}) => {
  try {
    const response = await API.get("/submit-submission", {
      params: {
        user_id: user_id,
        course_slug: course_slug,
      },
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed");
    }
    throw new Error("An unknown error occurred");
  }
};

const submitSubmission = async (formData: FormData) => {
  try {
    const response = await API.post("/submit-submission", formData);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed");
    }
    throw new Error("An unknown error occurred");
  }
};

export { submitSubmission, getSubmitSubmission };
