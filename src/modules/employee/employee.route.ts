import Elysia from "elysia";
import {
  CompanyMiddleware,
  IsCompanyOwnerMiddleware,
} from "../company/company.middleware";
import {
  registerEmployeeSchema,
  updateEmployeeSchema,
} from "./employee.schema";
import {
  deleteEmployee,
  getEmployees,
  registerEmployee,
  updateEmployee,
} from "./employee.service";
import { paramsId } from "../common/common.schema";

export default function createEmployeeRoute() {
  return new Elysia({ prefix: "/employee", tags: ["Employee"] }).use(
    CompanyMiddleware()
      .get(
        "/",
        ({ company }) => {
          return getEmployees({ company_id: company.id });
        },
        {
          detail: {
            summary: "Employee - Get Employees",
          },
        }
      )

      .use(
        IsCompanyOwnerMiddleware()
          .post(
            "/",
            ({ body, company }) => {
              return registerEmployee({
                ...body,
                company_id: company.id,
              });
            },
            {
              body: registerEmployeeSchema,
              detail: {
                summary: "Employee - Register Employee",
              },
            }
          )
          .put(
            "/:id",
            ({ body, params }) => {
              return updateEmployee(params.id, body);
            },
            {
              params: paramsId,
              body: updateEmployeeSchema,
              detail: {
                summary: "Employee - Update Employee",
              },
            }
          )
          .delete(
            "/:id",
            ({ params }) => {
              return deleteEmployee(params.id);
            },
            {
              params: paramsId,
              detail: {
                summary: "Employee - Delete Employee",
              },
            }
          )
      )
  );
}
