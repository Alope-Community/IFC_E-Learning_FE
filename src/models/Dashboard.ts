import { BaseResponseAPI } from "./_BaseResponse";
import { Course } from "./Course";

export interface DashboardResponse extends BaseResponseAPI {
  result: {
    courses: Course[];
  };
}
