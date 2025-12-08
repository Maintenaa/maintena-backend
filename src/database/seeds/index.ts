import { logger } from "../../core";
import { dataSource } from "../data-source";
import { AssetCategorySeeder } from "./asset_category.seeder";
import type { BaseSeeder } from "./base.seeder";
import { UserSeeder } from "./user.seeder";

async function main() {
  logger.success("🌱 Start seeding database");

  try {
    await dataSource.initialize();
  } catch (err) {
    logger.error("Failed to connect database");
    return;
  }

  const seeders: BaseSeeder[] = [new UserSeeder(), new AssetCategorySeeder()];

  for (const seeder of seeders) {
    let oldTime = new Date().getTime();

    console.log("");
    logger.info(`Running seeder ${seeder.name}`);

    try {
      await seeder.run();

      const time = new Date().getTime() - oldTime;
      logger.info(`Seeder ${seeder.name} completed in ${time}ms`);
    } catch (err) {
      logger.error(`Failed to run seeder ${seeder.name}\n`);
      console.log(err);
    }
  }

  console.log("");
  logger.success("💉 All seeders completed");

  process.exit(0);
}

main();
