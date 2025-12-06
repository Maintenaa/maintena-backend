import Elysia, { t } from "elysia";
import { login } from "./auth.service";

export default function createAuthRoute() {
  const route = new Elysia({
    prefix: "/auth",
  });

  route.post(
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

  return route;
}
