import { RegisterUser } from "@modules/users/application/RegisterUser";
import { RegisterUserRequest } from "@modules/users/application/RegisterUser/dto";
import { Context } from "hono";


export class RegisterUserController {
  constructor(private readonly uc: RegisterUser) {}

  public async execute(ctx: Context) {
    const body: RegisterUserRequest = await ctx.req.json()

    const result = await this.uc.execute(body)

    return ctx.json(result)
  }
}
