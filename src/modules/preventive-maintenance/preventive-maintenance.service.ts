import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { PreventiveMaintenance } from "../../database/entities";
import {
  createPreventiveMaintenanceSchema,
  updatePreventiveMaintenanceSchema,
} from "./preventive-maintenance.schema";
import { createError } from "../common/common.service";

const preventiveMaintenanceRepo = dataSource.getRepository(
  PreventiveMaintenance
);

export async function createPreventiveMaintenance(
  companyId: number,
  body: Static<typeof createPreventiveMaintenanceSchema>
) {
  return await preventiveMaintenanceRepo.save({
    ...body,
    company_id: companyId,
  });
}

export async function getPreventiveMaintenances(companyId: number) {
  return await preventiveMaintenanceRepo.find({
    where: { company_id: companyId },
    relations: ["asset"],
  });
}

export async function getPreventiveMaintenanceById(
  companyId: number,
  id: number
) {
  const preventiveMaintenance = await preventiveMaintenanceRepo.findOne({
    where: { id, company_id: companyId },
    relations: ["asset"],
  });

  if (!preventiveMaintenance) {
    throw createError("Preventive maintenance not found");
  }

  return preventiveMaintenance;
}

export async function updatePreventiveMaintenance(
  companyId: number,
  id: number,
  body: Static<typeof updatePreventiveMaintenanceSchema>
) {
  const preventiveMaintenance = await getPreventiveMaintenanceById(
    companyId,
    id
  );

  Object.assign(preventiveMaintenance, body);

  return await preventiveMaintenanceRepo.save(preventiveMaintenance);
}

export async function deletePreventiveMaintenance(
  companyId: number,
  id: number
) {
  const preventiveMaintenance = await getPreventiveMaintenanceById(
    companyId,
    id
  );

  return await preventiveMaintenanceRepo.remove(preventiveMaintenance);
}
