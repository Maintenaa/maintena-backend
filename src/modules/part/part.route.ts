import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createPartSchema, updatePartSchema } from "./part.schema";
import {
  createPart,
  getParts,
  getPartByCode,
  updatePart,
  deletePart,
} from "./part.service";
import { paramsCode } from "../common/common.schema";

export default function createPartRoute() {
  return new Elysia({ prefix: "/part", tags: ["Part"] }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company }) => {
          return createPart(company.id, body);
        },
        {
          body: createPartSchema,
          detail: {
            summary: "Part - Create Part",
          },
        }
      )
      .get(
        "/",
        async ({ company }) => {
          return getParts(company.id);
        },
        {
          detail: {
            summary: "Part - Get Parts",
          },
        }
      )
      .get(
        "/:code",
        async ({ params, company }) => {
          return getPartByCode(company.id, params.code);
        },
        {
          params: paramsCode,
          detail: {
            summary: "Part - Get Part By Code",
          },
        }
      )
      .put(
        "/:code",
        async ({ params, body, company }) => {
          return updatePart(company.id, params.code, body);
        },
        {
          body: updatePartSchema,
          params: paramsCode,
          detail: {
            summary: "Part - Update Part",
          },
        }
      )
      .delete(
        "/:code",
        async ({ params, company }) => {
          return deletePart(company.id, params.code);
        },
        {
          params: paramsCode,
          detail: {
            summary: "Part - Delete Part",
          },
        }
      )
  );
}
