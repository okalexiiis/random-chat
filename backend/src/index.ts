//src/index.ts
import { Hono } from "hono";
import { errorHandler } from "@core/middlewares/ErrorHandler";
import { createUserContainer } from "@modules/users/container";

// Routers
import createUserRoutes from "@modules/users/infrastructure/http/v1/routes/";

const port = Bun.env.PORT;
const app = new Hono();

app.onError(errorHandler);

// Initialize container once at startup
const userContainer = createUserContainer();

app.route("/api/v1/users", createUserRoutes(userContainer));

app.all("*", (ctx) => {
  return ctx.json(
    {
      message: "Route Not Found",
      statusCode: 404,
      name: "NotFound",
      details: {
        route: ctx.req.path,
      },
    },
    404,
  );
});

export default {
  port: port,
  fetch: app.fetch,
};
