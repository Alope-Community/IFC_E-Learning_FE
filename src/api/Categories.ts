import API from "./API";
import { AxiosError } from "axios";
import { Category, CategoryResponse } from "@/models/Category";

type CategoryParams = {
  limit?: number;
};

export const getCategories = async (
  params?: CategoryParams
): Promise<Category[]> => {
  try {
    const response = await API.get<CategoryResponse>("/categories", {
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
