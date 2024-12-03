import {
  FormDataRegister,
  LoginResponse,
  RegisterResponse,
} from "@/models/Authentication";
import API from "./API";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>("/login", {
      email,
      password,
    });

    const { token } = response.data.result;

    localStorage.setItem("token", token);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
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
  } catch (error: any) {
    // Validasi error dan pastikan tipe error yang diharapkan
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unknown error occurred");
  }
};
