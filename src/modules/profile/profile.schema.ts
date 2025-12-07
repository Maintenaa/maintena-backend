import { t } from "elysia";

export const authHeaderSchema = t.Object({
  Authorization: t.String({
    description: "Bearer <token>",
    default: "",
  }),
});

export const updateProfileSchema = t.Object({
  name: t.String(),
  password: t.Optional(t.String({ minLength: 8 })),
  password_confirmation: t.Optional(t.String()),
});
