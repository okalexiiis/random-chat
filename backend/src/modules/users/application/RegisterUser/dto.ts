export interface RegisterUserRequest {
  username: string;
  password: string;
}

export interface RegisterUserResponse {
  id: string;
  username: string;
}
