import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createPartSchema, updatePartSchema } from "./part.schema";
import {
	createPart,
	getParts,
	getPartByCode,
	updatePart,
	deletePart,
} from "./part.service";
import { paramsCode } from "../common/common.schema";

export default function createPartRoute() {
	return new Elysia({ prefix: "/part", tags: ["Part"] }).use(
		CompanyMiddleware()
			.post(
				"/",
				async ({ body, company }) => {
					return createPart(company.id, body);
				},
				{
					body: createPartSchema,
				},
			)
			.get("/", async ({ company }) => {
				return getParts(company.id);
			})
			.get(
				"/:code",
				async ({ params, company }) => {
					return getPartByCode(company.id, params.code);
				},
				{
					params: paramsCode,
				},
			)
			.put(
				"/:code",
				async ({ params, body, company }) => {
					return updatePart(company.id, params.code, body);
				},
				{
					body: updatePartSchema,
					params: paramsCode,
				},
			)
			.delete(
				"/:code",
				async ({ params, company }) => {
					return deletePart(company.id, params.code);
				},
				{
					params: paramsCode,
				},
			),
	);
}
