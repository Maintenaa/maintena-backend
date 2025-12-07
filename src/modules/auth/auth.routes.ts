import Elysia, { t } from "elysia";
import { login, register, updateProfile } from "./auth.service";
import { createError } from "../common/common.service";

export default function createAuthRoute() {
  const app = new Elysia({
    prefix: "/auth",
  })

    .get(
      "/",
      async ({ user }: any) => {
        if (!user) {
          throw createError("Unauthorized", 401);
        }

        return {
          profile: user,
        };
      },
      {
        headers: t.Object({
          Authorization: t.String({
            description: "Bearer <token>",
            default: "",
          }),
        }),
      }
    )

    .put(
      "/",
      async ({ user, body }: any) => {
        if (!user) {
          throw createError("Unauthorized", 401);
        }

        return updateProfile({
          ...body,
          id: user.id,
        });
      },
      {
        headers: t.Object({
          Authorization: t.String({
            description: "Bearer <token>",
            default: "",
          }),
        }),
        body: t.Object({
          name: t.String(),
          password: t.Optional(t.String({ minLength: 8 })),
          password_confirmation: t.Optional(t.String()),
        }),
      }
    )

    .post(
      "/login",
      async ({ body, cookie }) => {
        const { email, password } = body;
        const result = await login(email, password);

        cookie.refresh_token.value = result.refresh_token;
        cookie.refresh_token.httpOnly = true;

        return {
          ...result,
          refresh_token: undefined,
        };
      },
      {
        body: t.Object({
          email: t.String({
            format: "email",
          }),
          password: t.String(),
        }),
      }
    )

    .post(
      "/register",
      async ({ body, cookie }) => {
        const result = await register(body);

        cookie.refresh_token.value = result.refresh_token;
        cookie.refresh_token.httpOnly = true;

        return {
          ...result,
          refresh_token: undefined,
        };
      },
      {
        body: t.Object({
          email: t.String({
            format: "email",
          }),
          password: t.String({ minLength: 8 }),
          password_confirmation: t.String(),
          name: t.String(),
        }),
      }
    );

  return app;
}
