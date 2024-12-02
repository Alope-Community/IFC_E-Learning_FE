import API from "./API";

interface LoginResponse {
  code: string;
  message: string;
  success: boolean;
  result: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

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

    // Simpan token di localStorage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error: any) {
    // Validasi error dan pastikan tipe error yang diharapkan
    if (error.response && error.response.data) {
      console.log(error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unknown error occurred");
  }
};
