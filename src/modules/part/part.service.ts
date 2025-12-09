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

export async function getPartById(companyId: number, id: number) {
  const part = await partRepo.findOne({
    where: { id, company_id: companyId },
    relations: ["location"],
  });

  if (!part) {
    throw createError("Part not found");
  }

  return part;
}

export async function updatePart(
  companyId: number,
  id: number,
  body: Static<typeof updatePartSchema>
) {
  const part = await getPartById(companyId, id);

  Object.assign(part, body);

  return await partRepo.save(part);
}

export async function deletePart(companyId: number, id: number) {
  const part = await getPartById(companyId, id);

  return await partRepo.remove(part);
}
