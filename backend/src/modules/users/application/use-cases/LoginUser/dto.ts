//src/modules/users/application/use-cases/LoginUser/dto.ts
export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}