import Elysia from "elysia";
import { logger } from "../../core";

export function LoggerMiddleware() {
	return new Elysia()
		.derive(() => {
			const oldTime = new Date();
			return {
				oldTime,
			};
		})
		.onBeforeHandle({ as: "global" }, ({ oldTime }) => {
			oldTime = new Date();
		})
		.onAfterResponse({ as: "global" }, (req) => {
			const {
				route,
				request: { method },
				set,
				oldTime,
			} = req;

			if (!route) {
				return;
			}

			const time = new Date().getTime() - (oldTime || new Date()).getTime();
			const status = (set.status as number) || 200;

			const methodColor =
				{
					GET: "blue",
					POST: "cyan",
					PUT: "yellow",
					DELETE: "red",
				}[method] || "cyan";

			const methodFormated = method[methodColor as any];
			const routeFormated = route[methodColor as any];
			const statusFormated =
				status >= 400 ? status.toString().red : status.toString().cyan;

			const message = `[${methodFormated}] ${routeFormated} completed in ${time}ms with status ${statusFormated}`;

			if (status >= 500) {
				logger.error(message);
			} else if (status >= 400) {
				logger.warn(message);
			} else {
				logger.info(message);
			}
		});
}
