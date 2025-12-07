import { t } from "elysia";

export const createUserSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
  password_confirmation: t.String(),
  name: t.String(),
  is_superadmin: t.Optional(t.Boolean()),
});

export const updateUserSchema = t.Object({
  password: t.Optional(t.String({ minLength: 8 })),
  password_confirmation: t.Optional(t.String()),
  name: t.String(),
});
