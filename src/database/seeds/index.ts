import { logger } from "../../core";
import { dataSource } from "../data-source";
import type { BaseSeeder } from "./base.seeder";
import { UserSeeder } from "./user.seeder";

async function main() {
  logger.info("Mulai menjalankan seed");

  try {
    await dataSource.initialize();
  } catch (err) {
    logger.error("Gagal melakukan seed");
    return;
  }

  const seeders: BaseSeeder[] = [new UserSeeder()];

  for (const seeder of seeders) {
    logger.info(`Running seeder ${seeder.name}`);

    try {
      await seeder.run();
      logger.success(`Seeder ${seeder.name} berhasil dijalankan`);
    } catch (err) {
      logger.error(`Gagal menjalankan seeder ${seeder.name}\n`);
      console.log(err);
    }
  }

  logger.success("Semua seed berhasil dijalankan");

  process.exit(0);
}

main();
