//src/modules/users/container.ts

import { RegisterUserController } from "./infrastructure/http/v1/handlers/register-user.controller";
import { RegisterUser } from "./application/use-cases/RegisterUser";
import { LoginUserController } from "./infrastructure/http/v1/handlers/login-user.controller";
import { LoginUser } from "./application/use-cases/LoginUser";
import { GetUserProfileController } from "./infrastructure/http/v1/handlers/get-user-profile.controller";
import { GetUserProfile } from "./application/use-cases/GetUserProfile";
import { DrizzleUserRepository } from "./infrastructure/repositories/DrizzleUserRepository";
import { BcryptPassHasher } from "./infrastructure/repositories/BcryptPassHasher";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";

export interface IUserContainer {
  repo: DrizzleUserRepository;
  passHasher: BcryptPassHasher;
  tokenService: JwtTokenService;
  registerUserUC: RegisterUser;
  registerUserController: RegisterUserController;
  loginUserUC: LoginUser;
  loginUserController: LoginUserController;
  getUserProfileUC: GetUserProfile;
  getUserProfileController: GetUserProfileController;
}

export const createUserContainer = (): IUserContainer => {
  const jwtSecret = process.env.JWT_SECRET || "default-secret-change-in-prod";
  const repo = new DrizzleUserRepository();
  const passHasher = new BcryptPassHasher();
  const tokenService = new JwtTokenService(jwtSecret);
  const registerUserUC = new RegisterUser(repo, passHasher);
  const registerUserController = new RegisterUserController(registerUserUC);
  const loginUserUC = new LoginUser(repo, passHasher, tokenService);
  const loginUserController = new LoginUserController(loginUserUC);
  const getUserProfileUC = new GetUserProfile(repo);
  const getUserProfileController = new GetUserProfileController(getUserProfileUC);

  return {
    repo,
    passHasher,
    tokenService,
    registerUserUC,
    registerUserController,
    loginUserUC,
    loginUserController,
    getUserProfileUC,
    getUserProfileController,
  };
};