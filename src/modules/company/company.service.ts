import type { Static } from "elysia";
import { createCompanySchema } from "./company.schema";
import { dataSource } from "../../database/data-source";
import { Company, User } from "../../database/entities";
import { createEmployee } from "../employee/employee.service";
import { v4 as uuidv4 } from "uuid";

const companyRepo = dataSource.getRepository(Company);

interface CreateCompany extends Static<typeof createCompanySchema> {
  owner: User;
}

export async function createCompany(body: CreateCompany) {
  const company = await companyRepo.save({
    ...body,
    kode: uuidv4(),
  });

  await createEmployee({
    user_id: body.owner.id,
    role: "Owner",
    company_id: company.id,
    is_owner: true,
  });

  return {
    message: "Berhasil membuat perusahaan",
    company,
  };
}
