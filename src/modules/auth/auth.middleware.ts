import Elysia from "elysia";
import { createError } from "../common/common.service";

export function AuthMiddleware() {
  return new Elysia().onBeforeHandle({ as: "scoped" }, ({ user }: any) => {
    if (!user) {
      throw createError("Silahkan login terlebih dahulu", 401);
    }
  });
}
