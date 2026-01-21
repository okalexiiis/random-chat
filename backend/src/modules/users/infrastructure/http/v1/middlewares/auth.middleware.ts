//src/modules/users/infrastructure/http/v1/middlewares/auth.middleware.ts
import { InvalidRequestError } from "@core/types/Errors";
import { Context, Next } from "hono";
import { JwtTokenService } from "../../services/JwtTokenService";

export function createAuthMiddleware(tokenService: JwtTokenService) {
  return async (ctx: Context, next: Next) => {
    const authHeader = ctx.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new InvalidRequestError("Authorization header missing or invalid");
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    try {
      const payload = await tokenService.verify(token);
      ctx.set("user", payload); // Set user in context
      await next();
    } catch {
      throw new InvalidRequestError("Invalid or expired token");
    }
  };
}