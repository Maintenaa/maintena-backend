import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { registerEmployeeSchema } from "./employee.schema";
import { registerEmployee } from "./employee.servive";

export default function createEmployeeRoute() {
  return new Elysia({ prefix: "/employee" }).use(
    CompanyMiddleware().post(
      "/",
      ({ body, company }) => {
        return registerEmployee({
          ...body,
          company_id: company.id,
        });
      },
      {
        body: registerEmployeeSchema,
      }
    )
  );
}
