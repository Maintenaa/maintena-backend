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
				const { refresh_token, ...result } = await login(body);

				cookie.refresh_token.value = refresh_token;
				cookie.refresh_token.httpOnly = true;

				return result;
			},
			{
				body: loginSchema,
			},
		)

		.post(
			"/register",
			async ({ body, cookie }) => {
				const { refresh_token, ...result } = await register(body);

				cookie.refresh_token.value = refresh_token;
				cookie.refresh_token.httpOnly = true;

				return result;
			},
			{
				body: registerSchema,
			},
		);

	return app;
}
