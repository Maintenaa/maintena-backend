import Elysia from "elysia";
import { checkHealth } from "./check-health.service";

export default function createCheckHealthRoute() {
	return new Elysia({ prefix: "/check-health", tags: ["Check Health"] }).get(
		"/",
		checkHealth,
	);
}
