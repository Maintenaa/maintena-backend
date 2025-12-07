import Elysia from "elysia";
import { createError } from "../common/common.service";
import type { User } from "../../database/entities";

export function AuthMiddleware() {
  return new Elysia()
    .derive({ as: "scoped" }, ({ user }: any) => {
      return {
        user: user as User,
      };
    })
    .onBeforeHandle({ as: "scoped" }, ({ user }) => {
      if (!user) {
        throw createError("Silahkan login terlebih dahulu", 401);
      }
    });
}
