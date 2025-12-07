import Elysia from "elysia";
import { login, register } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

export default function createAuthRoute() {
  const app = new Elysia({
    prefix: "/auth",
  })

    .post(
      "/login",
      async ({ body, cookie }) => {
        const result = await login(body);

        cookie.refresh_token.value = result.refresh_token;
        cookie.refresh_token.httpOnly = true;

        return {
          ...result,
          refresh_token: undefined,
        };
      },
      {
        body: loginSchema,
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
        body: registerSchema,
      }
    );

  return app;
}
