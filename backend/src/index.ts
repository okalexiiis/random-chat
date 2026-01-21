//src/index.ts
import { Hono } from "hono";
import { errorHandler } from "@core/middlewares/ErrorHandler";

// Routers
import UserV1 from "@modules/users/infrastructure/http/v1/routes/";

const port = Bun.env.PORT;
const app = new Hono();

app.onError(errorHandler);

app.route("/api/v1/users", UserV1);

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
