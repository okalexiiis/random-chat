import { post } from "./http";

const USER_URL = "/users";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: { id: string; username: string };
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  username: string;
}

export const Login = async (data: LoginRequest) => {
  const res = await post<LoginResponse, LoginRequest>(
    `${USER_URL}/login`,
    data,
  );

  return res;
};

export const Register = async (data: LoginRequest) => {
  const res = await post<RegisterResponse, RegisterRequest>(
    `${USER_URL}/register`,
    data,
  );

  return res;
};
