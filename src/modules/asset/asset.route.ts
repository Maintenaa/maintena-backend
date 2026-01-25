import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createAssetSchema, updateAssetSchema } from "./asset.schema";
import {
	createAsset,
	getAssets,
	getAssetByCode,
	updateAsset,
	deleteAsset,
} from "./asset.service";
import { paramsCode } from "../common/common.schema";

export default function createAssetRoute() {
	return new Elysia({ prefix: "/asset", tags: ["Asset"] }).use(
		CompanyMiddleware()
			.post(
				"/",
				async ({ body, company }) => {
					return createAsset(company.id, body);
				},
				{
					body: createAssetSchema,
				},
			)
			.get("/", async ({ company }) => {
				return getAssets(company.id);
			})
			.get(
				"/:code",
				async ({ params, company }) => {
					return getAssetByCode(company.id, params.code);
				},
				{
					params: paramsCode,
				},
			)
			.put(
				"/:code",
				async ({ params, body, company }) => {
					return updateAsset(company.id, params.code, body);
				},
				{
					body: updateAssetSchema,
					params: paramsCode,
				},
			)
			.delete(
				"/:code",
				async ({ params, company }) => {
					return deleteAsset(company.id, params.code);
				},
				{
					params: paramsCode,
				},
			),
	);
}
