import Elysia, { t } from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  assignWorkOrderSchema,
  addUsedPartSchema,
  updateUsedPartSchema,
} from "./work-order.schema";
import {
  createWorkOrder,
  getWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  assignWorkOrder,
  deleteWorkOrder,
  addUsedPart,
  getUsedParts,
  updateUsedPart,
  removeUsedPart,
} from "./work-order.service";
import { paramsId } from "../common/common.schema";

const paramsUsedPartId = t.Object({
  id: t.Number(),
  usedPartId: t.Number(),
});

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
      // Used Parts
      .post(
        "/:id/used-parts",
        async ({ params, body, company }) => {
          return addUsedPart(company.id, params.id, body);
        },
        {
          body: addUsedPartSchema,
          params: paramsId,
        }
      )
      .get(
        "/:id/used-parts",
        async ({ params, company }) => {
          return getUsedParts(company.id, params.id);
        },
        {
          params: paramsId,
        }
      )
      .put(
        "/:id/used-parts/:usedPartId",
        async ({ params, body, company }) => {
          return updateUsedPart(company.id, params.id, params.usedPartId, body);
        },
        {
          body: updateUsedPartSchema,
          params: t.Object({
            id: t.Number(),
            usedPartId: t.Number(),
          }),
        }
      )
      .delete(
        "/:id/used-parts/:usedPartId",
        async ({ params, company }) => {
          return removeUsedPart(company.id, params.id, params.usedPartId);
        },
        {
          params: paramsUsedPartId,
        }
      )
  );
}
