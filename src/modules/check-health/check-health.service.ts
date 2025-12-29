import { logger } from "../../core";
import { dataSource } from "../../database/data-source";

export async function checkHealth() {
  let errors: string[] = [];

  try {
    if (!dataSource.isInitialized) {
      logger.info("Connecting to database...");
      await dataSource.initialize();
    }

    logger.info("Database connected");
  } catch (err) {
    errors = [...errors, "Database not connected"];
    logger.error("Database not connected", { error: err });
  }

  if (errors.length > 0) {
    return Response.json(
      {
        errors,
      },
      {
        status: 500,
      }
    );
  }

  return {
    status: "OK",
  };
}
