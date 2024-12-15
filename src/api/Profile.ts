import API from "./API";
import { AxiosError } from "axios";

const updateProfile = async ({
  user_id,
  name,
  password,
  profile,
}: {
  user_id: number;
  name: string;
  password: string;
  profile: string;
}) => {
  try {
    const response = await API.put("/profile", {
      user_id: user_id,
      name: name,
      password: password,
      profile: profile,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed");
    }
    throw new Error("An unknown error occurred");
  }
};

export default updateProfile;
