import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { WorkOrder } from "../../database/entities";
import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  assignWorkOrderSchema,
} from "./work-order.schema";
import { createError } from "../common/common.service";

const workOrderRepo = dataSource.getRepository(WorkOrder);

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
