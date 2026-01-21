//src/modules/users/application/use-cases/RegisterUser/index.ts
import { Log } from "@core/utils/logger";
import { Result } from "@core/types/Result";
import { UserRepository } from "../../repositories";
import { RegisterUserRequest, RegisterUserResponse } from "./dto";
import { Password } from "@modules/users/domain/value-objects/Password";
import { Username } from "@modules/users/domain/value-objects/Username";
import { UserAlreadyExists } from "@modules/users/domain/errors/UserAlreadyExists";
import { User } from "@modules/users/domain/User";
import { PasswordHasher } from "../../interfaces";

export class RegisterUser {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passHasher: PasswordHasher,
  ) {}

  public async execute(
    dto: RegisterUserRequest,
  ): Promise<Result<RegisterUserResponse>> {
    Log.info("Registering user", { username: dto.username });
    const password = Password.create(dto.password);
    if (!password.isOk) return { isOk: false, error: password.error };
    const username = Username.create(dto.username);
    if (!username.isOk) return { isOk: false, error: username.error };

    const userExists = await this.userRepo.findOne({ username: dto.username });
    if (userExists) return { isOk: false, error: new UserAlreadyExists() };

    try {
      const hashedPassword = await this.passHasher.hash(password.value.value);
      const hashedPasswordValidated = Password.fromPersistence(hashedPassword);

      const newUser = User.create(username.value, hashedPasswordValidated);

      const saved = await this.userRepo.save(newUser);
      return { isOk: true, value: { id: saved.id, username: saved.username.value } };
    } catch (error) {
      return { isOk: false, error: new Error("Failed to register user") };
    }
  }
}
