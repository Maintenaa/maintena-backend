import { dataSource } from "../database/data-source";
import { Config, logger } from "../core";
import buildElysiaServer from "./elysia";
export async function buildServer() {
  try {
    logger.info("Connecting to database...");
    await dataSource.initialize();
    logger.info(`📀 Database connected`);

    buildElysiaServer();

    logger.debug(
      `🚀 Application is running at http://localhost:${Config.APP_PORT}`
    );
  } catch (err) {
    logger.error("Gagal memulai server");
    console.log(err);
  }
}
