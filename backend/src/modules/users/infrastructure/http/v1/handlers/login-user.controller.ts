//src/modules/users/infrastructure/http/v1/handlers/login-user.controller.ts
import { LoginUser } from "@modules/users/application/use-cases/LoginUser";
import { LoginUserRequest } from "@modules/users/application/use-cases/LoginUser/dto";
import { Context } from "hono";

export class LoginUserController {
  constructor(private readonly uc: LoginUser) {}

  public async execute(ctx: Context) {
    const body = ctx.get("validatedBody") as LoginUserRequest;

    const result = await this.uc.execute(body);

    if (!result.isOk) throw result.error;

    return ctx.json(result.value);
  }
}