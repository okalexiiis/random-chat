//src/modules/users/infrastructure/http/v1/middlewares/validate-login-user-controller.middleware.ts
import { InvalidRequestError } from "@core/types/Errors";
import { Context, Next } from "hono";
import { LoginUserRequest } from "@modules/users/application/use-cases/LoginUser/dto";

export async function assertLoginUserRequest(ctx: Context, next: Next) {
  let input: unknown;
  try {
    input = await ctx.req.json();
  } catch {
    throw new InvalidRequestError(
      "Request body must be valid JSON with 'username' and 'password' as strings",
    );
  }

  if (
    typeof input !== "object" ||
    input === null ||
    !("username" in input) ||
    !("password" in input) ||
    typeof input.username !== "string" ||
    typeof input.password !== "string"
  ) {
    throw new InvalidRequestError(
      "Request body must contain 'username' and 'password' as strings",
    );
  }

  // Store validated body for controller use
  ctx.set("validatedBody", input as LoginUserRequest);

  await next();
}