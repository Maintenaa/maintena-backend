import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { Part } from "../../database/entities";
import { createPartSchema, updatePartSchema } from "./part.schema";
import { createError } from "../common/common.service";

const partRepo = dataSource.getRepository(Part);

export async function createPart(
  companyId: number,
  body: Static<typeof createPartSchema>
) {
  return await partRepo.save({ ...body, company_id: companyId });
}

export async function getParts(companyId: number) {
  return await partRepo.find({
    where: { company_id: companyId },
    relations: ["location"],
  });
}

export async function getPartByCode(companyId: number, code: string) {
  const part = await partRepo.findOne({
    where: { code, company_id: companyId },
    relations: ["location"],
  });

  if (!part) {
    throw createError("Part not found");
  }

  return part;
}

export async function updatePart(
  companyId: number,
  code: string,
  body: Static<typeof updatePartSchema>
) {
  const part = await getPartByCode(companyId, code);

  Object.assign(part, body);

  return await partRepo.save(part);
}

export async function deletePart(companyId: number, code: string) {
  const part = await getPartByCode(companyId, code);

  return await partRepo.remove(part);
}
