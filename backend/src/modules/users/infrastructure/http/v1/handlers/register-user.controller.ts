//src/modules/users/infrastructure/http/v1/handlers/register-user.controller.ts
import { RegisterUser } from "@modules/users/application/use-cases/RegisterUser";
import { RegisterUserRequest } from "@modules/users/application/use-cases/RegisterUser/dto";
import { Context } from "hono";

export class RegisterUserController {
  constructor(private readonly uc: RegisterUser) {}

  public async execute(ctx: Context) {
    const body = ctx.get("validatedBody") as RegisterUserRequest;

    const result = await this.uc.execute(body);

    if (!result.isOk) throw result.error;

    return ctx.json(result.value);
  }
}
