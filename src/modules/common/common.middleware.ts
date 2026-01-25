import { verify } from "jsonwebtoken";
import { Config } from "../../core";
import Elysia from "elysia";
import { getProfile } from "../profile/profile.service";
import { securityAuth } from "../../constant";

export * from "./logger.middleware";
export * from "./error.middleware";

export function CommonMiddleware() {
	return new Elysia({ detail: { security: securityAuth } }).derive(
		{ as: "global" },
		async ({ headers, cookie }) => {
			let authorization = headers["authorization"];

			if (!authorization) {
				return;
			}

			const type = authorization.split(" ")[0];
			const token = authorization.split(" ")[1];

			if (type !== "Bearer") {
				return;
			}

			try {
				const payload: any = verify(token, Config.JWT_SECRET_KEY);

				if (payload.id) {
					const user = await getProfile(payload.id);

					return {
						user,
					};
				}
			} catch (err) {
				//
			}
		},
	);
}
