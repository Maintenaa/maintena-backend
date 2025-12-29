import { Config, logger } from "../core";
import { checkHealth } from "../modules/check-health/check-health.service";
import buildElysiaServer from "./elysia";
export async function buildServer() {
  try {
    await checkHealth();
    buildElysiaServer();

    logger.debug(
      `🚀 Application is running at http://localhost:${Config.APP_PORT}`
    );
  } catch (err) {
    logger.error("Gagal memulai server", { error: err });
  }
}
