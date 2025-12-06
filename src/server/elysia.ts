import openapi, { fromTypes } from "@elysiajs/openapi";
import Elysia from "elysia";
import createCheckHealthRoute from "../modules/check-health/check-health.routes";
import { Config } from "../core";

export default function buildElysiaServer() {
  const app = new Elysia({
    prefix: "/api/v1",
  });

  app.use(
    openapi({
      references: fromTypes(),
    })
  );

  app.use(createCheckHealthRoute());

  app.listen(Config.APP_PORT);
}
