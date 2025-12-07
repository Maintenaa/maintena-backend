import { dataSource } from "../../database/data-source";
import { Company } from "../../database/entities";
import { createError } from "../common/common.service";
import { AuthMiddleware } from "../auth/auth.middleware";

export function CompanyMiddleware() {
  return AuthMiddleware()
    .derive(async ({ headers }) => {
      const companyKode = headers["company-kode"] || "";

      const company = await dataSource
        .getRepository(Company)
        .findOneBy({ kode: companyKode });

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
