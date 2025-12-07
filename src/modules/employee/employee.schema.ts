import { t } from "elysia";

export const createEmployeeSchema = t.Object({
  role: t.String(),
  user_id: t.Number(),
  company_id: t.Number(),
  is_active: t.Optional(t.Boolean()),
});

export const registerEmployeeSchema = t.Object({
  name: t.String({ minLength: 5 }),
  email: t.String({ format: "email" }),
  role: t.String({ minLength: 5 }),
});
