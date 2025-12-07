import openapi, { fromTypes } from "@elysiajs/openapi";
import Elysia from "elysia";
import { Config } from "../core";

import cors from "@elysiajs/cors";
import {
  CommonMiddleware,
  ErrorMiddleware,
  LoggerMiddleware,
} from "../modules/common/common.middleware";

import createCheckHealthRoute from "../modules/check-health/check-health.route";
import createAuthRoute from "../modules/auth/auth.route";
import createProfileRoute from "../modules/profile/profile.route";
import createCompanyRoute from "../modules/company/company.route";
import createEmployeeRoute from "../modules/employee/employee.route";

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
      .use(ErrorMiddleware())

      // routes
      .use(createCheckHealthRoute())
      .use(createAuthRoute())
      .use(createProfileRoute())
      .use(createCompanyRoute())
      .use(createEmployeeRoute())

      // run server
      .listen(Config.APP_PORT)
  );
}
