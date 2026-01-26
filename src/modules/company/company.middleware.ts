import { dataSource } from "../../database/data-source";
import { Company, Employee } from "../../database/entities";
import { createError } from "../common/common.service";
import { AuthMiddleware } from "../auth/auth.middleware";
import z from "zod";

export function CompanyMiddleware() {
	return AuthMiddleware()
		.derive(async ({ headers, company: oldCompany }: any) => {
			if (oldCompany) {
				return {
					company: oldCompany as Company,
				};
			}

			const companyCode =
				headers["company-code"] || headers["Company-code"] || "";

			const company = await dataSource
				.getRepository(Company)
				.findOne({ where: { code: companyCode }, relations: { owner: true } });

			return {
				company: company as Company,
			};
		})
		.onBeforeHandle(({ company }) => {
			if (!company) {
				throw createError("Tidak dapat menemukan perusahaan", 401);
			}
		});
}

export function IsCompanyOwnerMiddleware() {
	return CompanyMiddleware().onBeforeHandle(async ({ user, company }) => {
		const employee = await dataSource.getRepository(Employee).findOne({
			where: { user: { id: user.id }, company: { id: company.id } },
		});

		if (!employee?.is_owner) {
			throw createError("Anda bukan pemilik perusahaan", 401);
		}
	});
}
