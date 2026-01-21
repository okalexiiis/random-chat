import { InvalidRequestError } from "@core/types/Errors";
import { Context, Next } from "hono";
import { RegisterUserRequest } from "@modules/users/application/use-cases/RegisterUser/dto";

export async function assertRegisterUserRequest(ctx: Context, next: Next) {
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
  ctx.set("validatedBody", input as RegisterUserRequest);

  await next();
}
