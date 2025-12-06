import "reflect-metadata";
import "dotenv/config";
import { buildServer } from "./server";

async function main() {
  await buildServer();
}

main();
