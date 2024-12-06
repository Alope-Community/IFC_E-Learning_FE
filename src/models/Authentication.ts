import { BaseResponseAPI } from "./_BaseResponse";

export interface LoginResponse extends BaseResponseAPI {
  result: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface RegisterResponse extends BaseResponseAPI {
  errors?: Record<string, string>;
  result: [];
}

export type FormDataRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
