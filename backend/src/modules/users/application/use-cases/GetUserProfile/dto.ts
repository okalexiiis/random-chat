//src/modules/users/application/use-cases/GetUserProfile/dto.ts
export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  id: string;
  username: string;
}