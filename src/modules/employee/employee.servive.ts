import type { Static } from "elysia";
import { createEmployeeSchema } from "./employee.schema";
import { dataSource } from "../../database/data-source";
import { Employee } from "../../database/entities";

const employeeRepo = dataSource.getRepository(Employee);

export async function createEmployee(
  body: Static<typeof createEmployeeSchema> & { is_owner?: boolean }
) {
  return await employeeRepo.save({
    role: body.role,
    user: {
      id: body.user_id,
    },
    company: {
      id: body.company_id,
    },
    is_active: body.is_active,
  });
}
