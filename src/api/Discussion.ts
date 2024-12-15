import API from "./API";
import { AxiosError } from "axios";

const sendDiscussion = async ({
  forum_id,
  body,
  user_id,
}: {
  forum_id: number;
  body: string;
  user_id: number;
}) => {
  try {
    const response = await API.post("/discussions", {
      forum_id: forum_id,
      body: body,
      user_id: user_id,
    });

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.message || "Failed");
    }
    throw new Error("An unknown error occurred");
  }
};

export default sendDiscussion;
