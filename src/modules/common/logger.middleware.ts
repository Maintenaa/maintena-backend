import Elysia from "elysia";
import { logger } from "../../core";

export function LoggerMiddleware() {
  return new Elysia()
    .derive(() => {
      const oldTime = new Date();
      return {
        oldTime,
      };
    })
    .onBeforeHandle(
      { as: "global" },
      ({ route, request: { method }, oldTime }) => {
        oldTime = new Date();
        console.log("");
        logger.info(`💧 [${method}] ${route} started`);
      }
    )
    .onAfterResponse({ as: "global" }, (req) => {
      const {
        route,
        request: { method },
        set,
        oldTime,
      } = req;

      const time = new Date().getTime() - (oldTime || new Date()).getTime();
      const status = (set.status as number) || 200;

      const message = `🌊 [${method}] ${route} completed in ${time}ms with status ${status}`;

      if (status >= 500) {
        logger.error(message);
      } else if (status >= 400) {
        logger.warn(message);
      } else {
        logger.info(message);
      }
    });
}
