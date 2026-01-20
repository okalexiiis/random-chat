import { Hono } from "hono";
import { Log } from "@core/utils/logger";
import { NotFoundError } from "@core/types/Errors";
import { Result } from "@core/types/Result";
import { errorHandler } from "@core/middlewares/ErrorHandler";
import { Username } from "@modules/users/domain/value-objects/Username";
import { Password } from "@modules/users/domain/value-objects/Password";
const port = Bun.env.PORT;
const app = new Hono();

app.onError(errorHandler);

app.get("/user/:id", async (ctx) => {
  Log.info("Hello");
  const id = ctx.req.param("id");

  const result: Result<any> =
    id !== "123"
      ? { isOk: false, error: new NotFoundError("User not found") }
      : { isOk: true, value: { id, name: "Alice" } };

  if (!result.isOk) throw result.error;

  return ctx.json(result.value, 200); // solo el valor exitoso
});

app.get("/error", (c) => {
  Log.error("[REGISTER USER] [PATH]: /register-user BODY: {}");
  return c.json({ error: "Algo salió mal" }, 500);
});

app.get("/test-validation", async (ctx) => {
  // Test valid username
  const invalidUsername = Username.create("user");
  if (!invalidUsername.isOk) throw invalidUsername.error;

  // Test invalid password (too short, no letters)
  const invalidPassword = Password.create("123");
  if (!invalidPassword.isOk) throw invalidPassword.error;

  return ctx.json({ success: true });
});

export default {
  port: port,
  fetch: app.fetch,
};
