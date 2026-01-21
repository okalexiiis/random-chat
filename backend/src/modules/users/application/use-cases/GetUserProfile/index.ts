//src/modules/users/application/use-cases/GetUserProfile/index.ts
import { Result } from "@core/types/Result";
import { UserRepository } from "../../repositories";
import { GetUserProfileRequest, GetUserProfileResponse } from "./dto";
import { UserNotFound } from "@modules/users/domain/errors/UserNotFound";

export class GetUserProfile {
  constructor(private readonly userRepo: UserReader) {}

  public async execute(
    dto: GetUserProfileRequest,
  ): Promise<Result<GetUserProfileResponse>> {
    const user = await this.userRepo.findOne({ id: dto.userId });
    if (!user) return { isOk: false, error: new UserNotFound() };

    return {
      isOk: true,
      value: { id: user.id, username: user.username.value },
    };
  }
}