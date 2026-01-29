import Elysia, { t } from "elysia";
import { CompanyMiddleware } from "../../company/company.middleware";
import {
  addUsedPart,
  getUsedParts,
  removeUsedPart,
  updateUsedPart,
} from "./work-order-used-part.service";
import {
  addUsedPartSchema,
  updateUsedPartSchema,
} from "./work-order-used-part.schema";
import { paramsId } from "../../common/common.schema";

const paramsUsedPartId = t.Object({
  id: t.Number(),
  usedPartId: t.Number(),
});

export function createWorkOrderUsedPartRoute() {
  return new Elysia({
    prefix: "/:id/used-part",
  }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ params, body, company }) => {
          return addUsedPart(company.id, params.id, body);
        },
        {
          body: addUsedPartSchema,
          params: paramsId,
          detail: {
            summary: "Work Order - Add Used Part To Work Order",
          },
        }
      )
      .get(
        "/",
        async ({ params, company }) => {
          return getUsedParts(company.id, params.id);
        },
        {
          params: paramsId,
          detail: {
            summary: "Work Order - Get Used Parts From Work Order",
          },
        }
      )
      .put(
        "/:usedPartId/",
        async ({ params, body, company }) => {
          return updateUsedPart(company.id, params.id, params.usedPartId, body);
        },
        {
          body: updateUsedPartSchema,
          params: paramsUsedPartId,
          detail: {
            summary: "Work Order - Update Used Part From Work Order",
          },
        }
      )
      .delete(
        "/:usedPartId/",
        async ({ params, company }) => {
          return removeUsedPart(company.id, params.id, params.usedPartId);
        },
        {
          params: paramsUsedPartId,
          detail: {
            summary: "Work Order - Delete Used Part From Work Order",
          },
        }
      )
  );
}
