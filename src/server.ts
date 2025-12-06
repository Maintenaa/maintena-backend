import { dataSource } from "./database/data-source";

export async function buildServer() {
  try {
    await dataSource.initialize();
  } catch (err) {
    console.log("Gagal memulai server", err);
  }
}
