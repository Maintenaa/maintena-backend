import type { Static } from "elysia";
import {
  createEmployeeSchema,
  registerEmployeeSchema,
} from "./employee.schema";
import { dataSource } from "../../database/data-source";
import { Employee, User } from "../../database/entities";

const userRepo = dataSource.getRepository(User);
const employeeRepo = dataSource.getRepository(Employee);

export async function createEmployee(
  body: Static<typeof createEmployeeSchema> & { is_owner?: boolean }
) {
  const employee = await employeeRepo.save({
    role: body.role,
    user: {
      id: body.user_id,
    },
    company: {
      id: body.company_id,
    },
    is_active: body.is_active,
    is_owner: body.is_owner,
  });

  return {
    message: "Berhasil menambahkan karyawan",
    employee,
  };
}

export async function registerEmployee(
  body: Static<typeof registerEmployeeSchema> & { company_id: number }
) {
  const user = await userRepo.save({
    email: body.email,
    name: body.name,
  });

  const result = await createEmployee({
    role: body.role,
    company_id: body.company_id,
    user_id: user.id,
  });

  return {
    ...result,
    message: "Berhasil mendaftarkan karyawan",
    user,
  };
}
