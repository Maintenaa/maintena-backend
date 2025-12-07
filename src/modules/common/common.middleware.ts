import { verify } from "jsonwebtoken";
import { Config, logger } from "../../core";
import Elysia from "elysia";
import { getProfile } from "../profile/profile.service";

export function CommonMiddleware() {
  return new Elysia().derive({ as: "global" }, async ({ headers }) => {
    const authorization = headers["authorization"];

    if (!authorization) {
      return;
    }

    const type = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (type !== "Bearer") {
      return;
    }

    try {
      const payload: any = verify(token, Config.JWT_SECRET_KEY);

      if (payload.id) {
        const user = await getProfile(payload.id);

        return {
          user,
        };
      }
    } catch (err) {
      logger.warn("No token found");
    }
  });
}

export function LoggerMiddleware() {
  let oldTime: Date;

  return new Elysia()
    .onBeforeHandle({ as: "global" }, ({ route, request: { method } }) => {
      oldTime = new Date();
      console.log("");
      logger.info(`🚀 [${method}] ${route} started`);
    })
    .onAfterResponse({ as: "global" }, (req) => {
      const {
        route,
        request: { method },
        responseValue,
      } = req;

      const time = new Date().getTime() - oldTime.getTime();
      const status = (responseValue as any)?.status || 200;

      const message = `🚀 [${method}] ${route} completed in ${time}ms with status ${status}`;

      if (status >= 500) {
        logger.error(message);
      } else if (status >= 400) {
        logger.warn(message);
      } else {
        logger.success(message);
      }
    });
}
