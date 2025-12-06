import { DataSource } from "typeorm";
import { Config } from "../core";

export const dataSource = new DataSource({
  type: "mysql",
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  username: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/database/entities/**/*.entity.ts"],
  subscribers: [],
  migrations: [],
});
