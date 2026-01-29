import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  assignWorkOrderSchema,
} from "./work-order.schema";
import {
  createWorkOrder,
  getWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  assignWorkOrder,
  deleteWorkOrder,
} from "./work-order.service";
import { paramsId } from "../common/common.schema";
import { createWorkOrderUsedPartRoute } from "./work-order-used-part/work-order-used-part.route";

export default function createWorkOrderRoute() {
  return new Elysia({ prefix: "/work-order", tags: ["Work Order"] }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company, user }) => {
          return createWorkOrder(company.id, user.id, body);
        },
        {
          body: createWorkOrderSchema,
          detail: {
            summary: "Work Order - Create Work Order",
          },
        }
      )
      .get(
        "/",
        async ({ company }) => {
          return getWorkOrders(company.id);
        },
        {
          detail: {
            summary: "Work Order - Get Work Orders",
          },
        }
      )
      .get(
        "/:id",
        async ({ params, company }) => {
          return getWorkOrderById(company.id, params.id);
        },
        {
          params: paramsId,
          detail: {
            summary: "Work Order - Get Work Order By Id",
          },
        }
      )
      .put(
        "/:id",
        async ({ params, body, company }) => {
          return updateWorkOrder(company.id, params.id, body);
        },
        {
          body: updateWorkOrderSchema,
          params: paramsId,
          detail: {
            summary: "Work Order - Update Work Order",
          },
        }
      )
      .put(
        "/:id/assign",
        async ({ params, body, company }) => {
          return assignWorkOrder(company.id, params.id, body);
        },
        {
          body: assignWorkOrderSchema,
          params: paramsId,
          detail: {
            summary: "Work Order - Assign Work Order",
          },
        }
      )
      .delete(
        "/:id",
        async ({ params, company }) => {
          return deleteWorkOrder(company.id, params.id);
        },
        {
          params: paramsId,
          detail: {
            summary: "Work Order - Delete Work Order",
          },
        }
      )
      .use(createWorkOrderUsedPartRoute())
  );
}
