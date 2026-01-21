//src/modules/users/infrastructure/http/v1/handlers/get-user-profile.controller.ts
import { GetUserProfile } from "@modules/users/application/use-cases/GetUserProfile";
import { Context } from "hono";

export class GetUserProfileController {
  constructor(private readonly uc: GetUserProfile) {}

  public async execute(ctx: Context) {
    const user = ctx.get("user") as { userId: string; username: string };

    const result = await this.uc.execute({ userId: user.userId });

    if (!result.isOk) throw result.error;

    return ctx.json(result.value);
  }
}