import openapi, { fromTypes } from "@elysiajs/openapi";
import Elysia from "elysia";
import { Config } from "../core";

import createCheckHealthRoute from "../modules/check-health/check-health.routes";
import createAuthRoute from "../modules/auth/auth.routes";

export default function buildElysiaServer() {
  const app = new Elysia({
    prefix: "/api/v1",
  });

  app.onError(({ error, code }) => {
    console.log(error, code);
  });

  app.use(
    openapi({
      references: fromTypes(),
    })
  );

  app.use(createCheckHealthRoute());
  app.use(createAuthRoute());

  app.listen(Config.APP_PORT);
}
