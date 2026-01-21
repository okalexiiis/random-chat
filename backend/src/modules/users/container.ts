//src/modules/users/container.ts

import { RegisterUserController } from "./infrastructure/http/v1/handlers/register-user.controller";
import { RegisterUser } from "./application/use-cases/RegisterUser";
import { DrizzleUserRepository } from "./infrastructure/repositories/DrizzleUserRepository";
import { BcryptPassHasher } from "./infrastructure/repositories/BcryptPassHasher";

export interface IUserContainer {
  repo: DrizzleUserRepository;
  passHasher: BcryptPassHasher;
  registerUserUC: RegisterUser;
  registerUserController: RegisterUserController;
}

export const createUserContainer = (): IUserContainer => {
  const repo = new DrizzleUserRepository();
  const passHasher = new BcryptPassHasher();
  const registerUserUC = new RegisterUser(repo, passHasher);
  const registerUserController = new RegisterUserController(registerUserUC);

  return {
    repo,
    passHasher,
    registerUserUC,
    registerUserController,
  };
};