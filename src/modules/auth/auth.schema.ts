import { t } from "elysia";

export const loginSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});

export const registerSchema = t.Object({
  email: t.String({
    format: "email",
  }),
  password: t.String({ minLength: 8 }),
  password_confirmation: t.String(),
  name: t.String(),
});
