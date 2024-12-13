import API from "./API";
import { AxiosError } from "axios";
import { DashboardResponse } from "@/models/Dashboard";

const submitSubmission = async (formData: FormData) => {
  console.log("test");
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

export default submitSubmission;
