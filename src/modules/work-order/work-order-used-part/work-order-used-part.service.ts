import type { Static } from "elysia";
import {
  addUsedPartSchema,
  updateUsedPartSchema,
} from "./work-order-used-part.schema";
import { WorkOrderUsedPart } from "../../../database/entities";
import { dataSource } from "../../../database/data-source";
import { createError } from "../../common/common.service";
import { getWorkOrderById } from "../work-order.service";

const usedPartRepo = dataSource.getRepository(WorkOrderUsedPart);

export async function addUsedPart(
  companyId: number,
  workOrderId: number,
  body: Static<typeof addUsedPartSchema>
) {
  await getWorkOrderById(companyId, workOrderId);

  return await usedPartRepo.save({
    work_order_id: workOrderId,
    ...body,
  });
}

export async function getUsedParts(companyId: number, workOrderId: number) {
  await getWorkOrderById(companyId, workOrderId);

  return await usedPartRepo.find({
    where: { work_order_id: workOrderId },
    relations: ["part"],
  });
}

export async function updateUsedPart(
  companyId: number,
  workOrderId: number,
  usedPartId: number,
  body: Static<typeof updateUsedPartSchema>
) {
  await getWorkOrderById(companyId, workOrderId);

  const usedPart = await usedPartRepo.findOne({
    where: { id: usedPartId, work_order_id: workOrderId },
  });

  if (!usedPart) {
    throw createError("Used part not found");
  }

  Object.assign(usedPart, body);

  return await usedPartRepo.save(usedPart);
}

export async function removeUsedPart(
  companyId: number,
  workOrderId: number,
  usedPartId: number
) {
  await getWorkOrderById(companyId, workOrderId);

  const usedPart = await usedPartRepo.findOne({
    where: { id: usedPartId, work_order_id: workOrderId },
  });

  if (!usedPart) {
    throw createError("Used part not found");
  }

  return await usedPartRepo.remove(usedPart);
}
