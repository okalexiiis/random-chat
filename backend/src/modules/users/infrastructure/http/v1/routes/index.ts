//src/modules/users/infrastructure/http/v1/routes/index.ts

import { Hono } from "hono";
import { RegisterUserController } from "../handlers/register-user.controller";
import { RegisterUser } from "@modules/users/application/RegisterUser";
import { DrizzleUserRepository } from "@modules/users/infrastructure/repositories/DrizzleUserRepository";
import { BcryptPassHasher } from "@modules/users/infrastructure/repositories/BcryptPassHasher";

const repo = new DrizzleUserRepository();

const UC_RegisterUser = new RegisterUser(repo, new BcryptPassHasher());
const C_UserRegister = new RegisterUserController(UC_RegisterUser);

const router = new Hono();

router.post("/register", (ctx) => C_UserRegister.execute(ctx));

export default router;
