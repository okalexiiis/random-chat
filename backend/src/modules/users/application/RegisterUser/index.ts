import { Log } from "@core/utils/logger";
import { UserRepository } from "../user.repository";
import { RegisterUserRequest, RegisterUserResponse } from "./dto";
import { Password } from "@modules/users/domain/value-objects/Password";
import { Username } from "@modules/users/domain/value-objects/Username";
import { UserAlreadyExists } from "@modules/users/domain/errors/UserAlreadyExists";
import { User } from "@modules/users/domain/User";

export class RegisterUser {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passHasher: PasswordHasher,
  ) {}

  public async execute(
    dto: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    Log.info("Registering user", { username: dto.username });
    const password = Password.create(dto.password);
    if (!password.isOk) throw password.error;
    const username = Username.create(dto.username);
    if (!username.isOk) throw username.error;

    const userExists = await this.userRepo.findOne({ username: dto.username });
    if (userExists) throw new UserAlreadyExists();

    const hashedPassword = await this.passHasher.hash(password.value.value);
    const hashedPasswordValidated = Password.fromPersistence(hashedPassword);

    const newUser = User.create(username.value, hashedPasswordValidated);

    const saved = await this.userRepo.save(newUser);
    return { id: saved.id, username: saved.username.value };
  }
}
