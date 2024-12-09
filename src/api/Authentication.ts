import {
  FormDataRegister,
  LoginResponse,
  RegisterResponse,
} from "@/models/Authentication";
import API from "./API";
import { AxiosError } from "axios";

export const login = async (params: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>("/login", params);

    const { token } = response.data.result;

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unknown error occurred");
  }
};

export const register = async (
  formData: FormDataRegister
): Promise<RegisterResponse> => {
  try {
    const response = await API.post<RegisterResponse>("/register", formData);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("An unknown error occurred");
  }
};
