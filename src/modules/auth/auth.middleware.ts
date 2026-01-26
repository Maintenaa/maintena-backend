import { createError } from "../common/common.service";
import {
	CommonMiddleware,
	type MiddlewareProps,
} from "../common/common.middleware";
import { User } from "../../database/entities";
import { SecurityScheme } from "../../constant";

export function AuthMiddleware(props?: MiddlewareProps) {
	let security = { [SecurityScheme.BearerAuth]: [] };

	if (props?.security) {
		security = { ...security, ...props.security } as any;
	}

	return CommonMiddleware({
		security,
	})
		.derive(({ user }) => {
			return {
				user: user as User,
			};
		})
		.onBeforeHandle({ as: "scoped" }, ({ user }) => {
			if (!user) {
				throw createError("Silahkan login terlebih dahulu", 401);
			}
		});
}
