import API from "./API";
import { AxiosError } from "axios";
import { DashboardResponse } from "@/models/Dashboard";

type DashboardParams = {
  user_id?: number;
};

const getDashboard = async (
  params?: DashboardParams
): Promise<DashboardResponse["result"]> => {
  try {
    const response = await API.get<DashboardResponse>("/dashboard/", {
      params,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to fetch dashboard"
      );
    }
    throw new Error("An unknown error occurred");
  }
};

export default getDashboard;
