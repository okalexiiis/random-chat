//src/modules/users/application/use-cases/LoginUser/index.ts
import { Log } from "@core/utils/logger";
import { Result } from "@core/types/Result";
import { UserRepository } from "../../repositories";
import { LoginUserRequest, LoginUserResponse } from "./dto";
import { Password } from "@modules/users/domain/value-objects/Password";
import { Username } from "@modules/users/domain/value-objects/Username";
import { UserNotFound } from "@modules/users/domain/errors/UserNotFound";
import { InvalidCredentials } from "@modules/users/domain/errors/InvalidCredentials";
import { PasswordHasher } from "../../interfaces";
import { TokenService } from "../../interfaces";

export class LoginUser {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(
    dto: LoginUserRequest,
  ): Promise<Result<LoginUserResponse>> {
    Log.info("Logging in user", { username: dto.username });

    const username = Username.create(dto.username);
    if (!username.isOk) return { isOk: false, error: username.error };

    const user = await this.userRepo.findOne({ username: dto.username });
    if (!user) return { isOk: false, error: new UserNotFound() };

    const password = Password.create(dto.password);
    if (!password.isOk) return { isOk: false, error: password.error };

    const isPasswordValid = await this.passHasher.compare(
      password.value.value,
      user.password.value,
    );
    if (!isPasswordValid) {
      return { isOk: false, error: new InvalidCredentials() };
    }

    try {
      const token = await this.tokenService.generate({
        userId: user.id,
        username: user.username.value,
      });

      return {
        isOk: true,
        value: {
          token,
          user: { id: user.id, username: user.username.value },
        },
      };
    } catch (error) {
      return { isOk: false, error: new Error("Failed to generate token") };
    }
  }
}