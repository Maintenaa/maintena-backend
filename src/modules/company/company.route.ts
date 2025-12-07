import Elysia, { t } from "elysia";
import { AuthMiddleware } from "../auth/auth.middleware";

export default function createCompanyRoute() {
  return new Elysia({ prefix: "/company" })
    .use(AuthMiddleware())

    .post("/", async ({ body }) => {}, {
      body: t.Object({
        name: t.String(),
        employees_count: t.Number(),
        email: t.String(),
        address: t.String(),
      }),
    });
}
