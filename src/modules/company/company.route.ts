import Elysia, { t } from "elysia";
import { AuthMiddleware } from "../auth/auth.middleware";
import { createCompanySchema } from "./company.schema";
import { createCompany } from "./company.service";

export default function createCompanyRoute() {
  return new Elysia({ prefix: "/company", tags: ["Company"] }).use(
    AuthMiddleware().post(
      "/",
      async ({ body, user }) => {
        return createCompany({
          ...body,
          owner: user!,
        });
      },
      {
        body: createCompanySchema,
        detail: {
          summary: "Company - Create Company",
        },
      }
    )
  );
}
