import type { Static } from "elysia";
import {
  createEmployeeSchema,
  registerEmployeeSchema,
  updateEmployeeSchema,
} from "./employee.schema";
import { dataSource } from "../../database/data-source";
import { Employee, User } from "../../database/entities";
import { createError } from "../common/common.service";

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

export async function getEmployees({ company_id }: { company_id: number }) {
  const employees = await employeeRepo.find({
    where: { company: { id: company_id } },
    relations: {
      user: true,
    },
    order: { created_at: "ASC" },
  });

  return {
    employees,
  };
}

export async function updateEmployee(
  id: number,
  body: Static<typeof updateEmployeeSchema>
) {
  const employee = await employeeRepo.findOne({ where: { id } });

  if (!employee) {
    throw createError("Karyawan tidak ditemukan", 401);
  }

  employee.role = body.role;

  await employeeRepo.save(employee);

  return {
    message: "Berhasil mengupdate karyawan",
    employee,
  };
}

export async function deleteEmployee(id: number) {
  await employeeRepo.delete({ id });

  return {
    message: "Karyawan berhasil dihapus",
  };
}
