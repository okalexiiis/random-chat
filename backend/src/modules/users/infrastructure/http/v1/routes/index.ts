//src/modules/users/infrastructure/http/v1/routes/index.ts

import { Hono } from "hono";
import { IUserContainer } from "@modules/users/container";
import { assertRegisterUserRequest } from "../middlewares/validate-register-user-controller.middleware";

export default function createUserRoutes(container: IUserContainer) {
  const C_UserRegister = container.registerUserController;

  const router = new Hono();

  router.post("/register", assertRegisterUserRequest, (ctx) =>
    C_UserRegister.execute(ctx),
  );

  return router;
}
