import type { Context } from "hono";
import { Log } from "@core/utils/logger";
import {
  DomainError,
  InfrastructureError,
  ConflictError,
  UnauthorizedError,
  DatabaseError,
  ExternalServiceError,
} from "../types/Errors";
import { env } from "bun";

const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const errorHandler = (err: Error, ctx: Context): Response => {
  const requestId = generateRequestId();
  ctx.header("X-Request-ID", requestId);

  const isDev = env.NODE_ENV !== "production";

  if (err instanceof DomainError) {
    // Status based on error type
    const status =
      err instanceof UnauthorizedError
        ? 401
        : err.name === "NotFoundError"
          ? 404
          : err.name === "ValidationError"
            ? 422
            : err instanceof ConflictError
              ? 409
              : 400;

    // Logging with request ID
    Log.error(
      `[DOMAIN ERROR] [REQ: ${requestId}] [PATH: ${ctx.req.path}] ${err.name}: ${err.message}`,
    );
    if ("details" in err) {
      Log.warn(`Details: ${JSON.stringify((err as any).details, null, 2)}`);
    }

    // Response to client
    const payload: any = {
      error: err.message,
      code: err.name,
      requestId,
    };
    if ("details" in err) payload.details = (err as any).details;

    return ctx.json(payload, status);
  }

  if (err instanceof InfrastructureError) {
    const status =
      err instanceof DatabaseError || err instanceof ExternalServiceError
        ? 503
        : 500;
    Log.error(
      `[INFRA ERROR] [REQ: ${requestId}] [PATH: ${ctx.req.path}] ${err.name}: ${err.message}`,
    );

    const payload: any = {
      error: isDev ? err.message : "Internal Server Error",
      code: err.name,
      requestId,
    };

    return ctx.json(payload, status);
  }

  // Other unexpected errors
  Log.error(
    `[UNHANDLED ERROR] [REQ: ${requestId}] [PATH: ${ctx.req.path}] ${err.name || "Error"}: ${(err as Error).message}`,
  );

  const payload: any = {
    error: isDev ? err.message : "Internal Server Error",
    code: "UnhandledError",
    requestId,
  };

  return ctx.json(payload, 500);
};
