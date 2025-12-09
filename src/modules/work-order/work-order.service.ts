import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { WorkOrder, WorkOrderUsedPart } from "../../database/entities";
import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  assignWorkOrderSchema,
  addUsedPartSchema,
  updateUsedPartSchema,
} from "./work-order.schema";
import { createError } from "../common/common.service";

const workOrderRepo = dataSource.getRepository(WorkOrder);
const usedPartRepo = dataSource.getRepository(WorkOrderUsedPart);

export async function createWorkOrder(
  companyId: number,
  userId: number,
  body: Static<typeof createWorkOrderSchema>
) {
  const { type = "corrective", priority = "medium", ...rest } = body;
  return await workOrderRepo.save({
    ...rest,
    company_id: companyId,
    created_by: userId,
    type,
    priority,
    status: "pending",
    requested_at: new Date(),
  });
}

export async function getWorkOrders(companyId: number) {
  return await workOrderRepo.find({
    where: { company_id: companyId },
    relations: ["asset", "creator", "assignee"],
  });
}

export async function getWorkOrderById(companyId: number, id: number) {
  const workOrder = await workOrderRepo.findOne({
    where: { id, company_id: companyId },
    relations: ["asset", "creator", "assignee"],
  });

  if (!workOrder) {
    throw createError("Work order not found");
  }

  return workOrder;
}

export async function updateWorkOrder(
  companyId: number,
  id: number,
  body: Static<typeof updateWorkOrderSchema>
) {
  const workOrder = await getWorkOrderById(companyId, id);

  Object.assign(workOrder, body);

  return await workOrderRepo.save(workOrder);
}

export async function assignWorkOrder(
  companyId: number,
  id: number,
  body: Static<typeof assignWorkOrderSchema>
) {
  return await updateWorkOrder(companyId, id, body);
}

export async function deleteWorkOrder(companyId: number, id: number) {
  const workOrder = await getWorkOrderById(companyId, id);

  return await workOrderRepo.remove(workOrder);
}

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
