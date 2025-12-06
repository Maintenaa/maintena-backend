import "reflect-metadata";
import "dotenv/config";
import { Elysia } from "elysia";
import { buildServer } from "./server";

async function main() {
  await buildServer();
  const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

main();
