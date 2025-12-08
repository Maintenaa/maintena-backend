import { t } from "elysia";
import { EmployeeRole } from "../../database/entities";

export const createEmployeeSchema = t.Object({
  role: t.Enum(EmployeeRole),
  user_id: t.Number(),
  company_id: t.Number(),
  is_active: t.Optional(t.Boolean()),
});

export const registerEmployeeSchema = t.Object({
  name: t.String({ minLength: 5 }),
  email: t.String({ format: "email" }),
  role: t.Enum(EmployeeRole),
});

export const updateEmployeeSchema = t.Object({
  role: t.String(),
});
