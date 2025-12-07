import { t } from "elysia";

export const createCompanySchema = t.Object({
  name: t.String(),
  employees_count_range: t.Array(t.Number(), { minItems: 2, maxItems: 2 }),
  email: t.String(),
  address: t.String(),
});
