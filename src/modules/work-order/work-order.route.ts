import Elysia, { t } from "elysia";
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
  return new Elysia({ prefix: "/work-order" }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company, user }) => {
          return createWorkOrder(company.id, user.id, body);
        },
        {
          body: createWorkOrderSchema,
        }
      )
      .get("/", async ({ company }) => {
        return getWorkOrders(company.id);
      })
      .get(
        "/:id",
        async ({ params, company }) => {
          return getWorkOrderById(company.id, params.id);
        },
        {
          params: paramsId,
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
        }
      )
      .delete(
        "/:id",
        async ({ params, company }) => {
          return deleteWorkOrder(company.id, params.id);
        },
        {
          params: paramsId,
        }
      )
      .use(createWorkOrderUsedPartRoute())
  );
}
