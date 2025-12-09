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
        }
      )
      .get(
        "/",
        async ({ params, company }) => {
          return getUsedParts(company.id, params.id);
        },
        {
          params: paramsId,
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
        }
      )
      .delete(
        "/:usedPartId/",
        async ({ params, company }) => {
          return removeUsedPart(company.id, params.id, params.usedPartId);
        },
        {
          params: paramsUsedPartId,
        }
      )
  );
}
