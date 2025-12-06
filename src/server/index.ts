import { dataSource } from "../database/data-source";
import { Config, logger } from "../core";
import buildElysiaServer from "./elysia";
export async function buildServer() {
  try {
    await dataSource.initialize();
    logger.success(`📀 Database connected`);

    buildElysiaServer();

    logger.success(
      `🚀 Application is running at http://localhost:${Config.APP_PORT}`
    );
  } catch (err) {
    logger.error("Gagal memulai server");
    console.log(err);
  }
}
