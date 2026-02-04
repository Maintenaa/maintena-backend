import Elysia, { t } from "elysia";
import { AuthMiddleware } from "../auth/auth.middleware";
import { createCompanySchema, updateCompanySchema } from "./company.schema";
import { createCompany, getCompany, updateCompany } from "./company.service";
import {
  CompanyMiddleware,
  IsCompanyOwnerMiddleware,
} from "./company.middleware";

export default function createCompanyRoute() {
  return new Elysia({ prefix: "/company", tags: ["Company"] }).use(
    AuthMiddleware()
      .post(
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
      .use(
        CompanyMiddleware().get(
          "/",
          ({ company }) => {
            return getCompany(company.id);
          },
          { detail: { summary: "Company - Get Company" } }
        )
      )
      .use(
        IsCompanyOwnerMiddleware().put(
          "/",
          ({ body, company }) => {
            return updateCompany(company.id, body);
          },
          {
            body: updateCompanySchema,
            detail: { summary: "Company - Update Company" },
          }
        )
      )
  );
}
