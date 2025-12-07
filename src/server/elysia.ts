import openapi, { fromTypes } from "@elysiajs/openapi";
import Elysia from "elysia";
import { Config } from "../core";

import createCheckHealthRoute from "../modules/check-health/check-health.route";
import createAuthRoute from "../modules/auth/auth.route";
import cors from "@elysiajs/cors";
import {
  CommonMiddleware,
  LoggerMiddleware,
} from "../modules/common/common.middleware";
import createProfileRoute from "../modules/profile/profile.route";

export default function buildElysiaServer() {
  return (
    new Elysia({
      prefix: "/api/v1",
    })
      // integrations
      .use(cors({ origin: Config.CLIENT_URL.split(",") }))
      .use(
        openapi({
          references: fromTypes(),
        })
      )

      // middleware
      .use(CommonMiddleware())
      .use(LoggerMiddleware())

      // routes
      .use(createCheckHealthRoute())
      .use(createAuthRoute())
      .use(createProfileRoute())

      // run server
      .listen(Config.APP_PORT)
  );
}
