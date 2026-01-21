//src/modules/users/infrastructure/http/v1/routes/index.ts

import { Hono } from "hono";
import { IUserContainer } from "@modules/users/container";
import { assertRegisterUserRequest } from "../middlewares/validate-register-user-controller.middleware";
import { assertLoginUserRequest } from "../middlewares/validate-login-user-controller.middleware";
import { createAuthMiddleware } from "../middlewares/auth.middleware";

export default function createUserRoutes(container: IUserContainer) {
  const C_UserRegister = container.registerUserController;
  const C_UserLogin = container.loginUserController;
  const C_GetUserProfile = container.getUserProfileController;
  const authMiddleware = createAuthMiddleware(container.tokenService);

  const router = new Hono();

  router.post("/register", assertRegisterUserRequest, (ctx) =>
    C_UserRegister.execute(ctx),
  );

  router.post("/login", assertLoginUserRequest, (ctx) =>
    C_UserLogin.execute(ctx),
  );

  router.get("/me", authMiddleware, (ctx) => C_GetUserProfile.execute(ctx));

  return router;
}
