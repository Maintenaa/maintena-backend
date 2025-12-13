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
import createLocationRoute from "../modules/location/location.route";
import createAssetRoute from "../modules/asset/asset.route";
import createPartRoute from "../modules/part/part.route";
import createPreventiveMaintenanceRoute from "../modules/preventive-maintenance/preventive-maintenance.route";
import createWorkOrderRoute from "../modules/work-order/work-order.route";
import { createChatRoute } from "../modules/chat/chat.route";

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
      .use(createLocationRoute())
      .use(createAssetRoute())
      .use(createPartRoute())
      .use(createPreventiveMaintenanceRoute())
      .use(createWorkOrderRoute())
      .use(createChatRoute())

      // run server
      .listen(Config.APP_PORT)
  );
}
