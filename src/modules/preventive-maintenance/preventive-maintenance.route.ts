import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import {
	createPreventiveMaintenanceSchema,
	updatePreventiveMaintenanceSchema,
} from "./preventive-maintenance.schema";
import {
	createPreventiveMaintenance,
	getPreventiveMaintenances,
	getPreventiveMaintenanceById,
	updatePreventiveMaintenance,
	deletePreventiveMaintenance,
} from "./preventive-maintenance.service";
import { paramsId } from "../common/common.schema";

export default function createPreventiveMaintenanceRoute() {
	return new Elysia({
		prefix: "/preventive-maintenance",
		tags: ["Preventive Maintenance"],
	}).use(
		CompanyMiddleware()
			.post(
				"/",
				async ({ body, company }) => {
					return createPreventiveMaintenance(company.id, body);
				},
				{
					body: createPreventiveMaintenanceSchema,
				},
			)
			.get("/", async ({ company }) => {
				return getPreventiveMaintenances(company.id);
			})
			.get(
				"/:id",
				async ({ params, company }) => {
					return getPreventiveMaintenanceById(company.id, params.id);
				},
				{
					params: paramsId,
				},
			)
			.put(
				"/:id",
				async ({ params, body, company }) => {
					return updatePreventiveMaintenance(company.id, params.id, body);
				},
				{
					body: updatePreventiveMaintenanceSchema,
					params: paramsId,
				},
			)
			.delete(
				"/:id",
				async ({ params, company }) => {
					return deletePreventiveMaintenance(company.id, params.id);
				},
				{
					params: paramsId,
				},
			),
	);
}
