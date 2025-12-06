import Elysia, { t } from "elysia";
import { login } from "./auth.service";
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
    );

  return app;
}
