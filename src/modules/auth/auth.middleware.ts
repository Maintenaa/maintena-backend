import { createError } from "../common/common.service";
import { CommonMiddleware } from "../common/common.middleware";
import { User } from "../../database/entities";

export function AuthMiddleware() {
	return CommonMiddleware()
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
