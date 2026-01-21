//src/modules/users/infrastructure/http/v1/routes/index.ts

import { Hono } from "hono";
import { RegisterUserController } from "../handlers/register-user.controller";

const router = new Hono()

router.post("/register", RegisterUserController)

export default router 