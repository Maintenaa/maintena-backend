import { t } from "elysia";

export const createEmployeeSchema = t.Object({
  role: t.String(),
  user_id: t.Number(),
  company_id: t.Number(),
  is_active: t.Optional(t.Boolean()),
});
