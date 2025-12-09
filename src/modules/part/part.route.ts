import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createPartSchema, updatePartSchema } from "./part.schema";
import {
  createPart,
  getParts,
  getPartById,
  updatePart,
  deletePart,
} from "./part.service";

export default function createPartRoute() {
  return new Elysia({ prefix: "/parts" }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company }) => {
          return createPart(company.id, body);
        },
        {
          body: createPartSchema,
        }
      )
      .get("/", async ({ company }) => {
        return getParts(company.id);
      })
      .get("/:id", async ({ params, company }) => {
        return getPartById(company.id, parseInt(params.id));
      })
      .put(
        "/:id",
        async ({ params, body, company }) => {
          return updatePart(company.id, parseInt(params.id), body);
        },
        {
          body: updatePartSchema,
        }
      )
      .delete("/:id", async ({ params, company }) => {
        return deletePart(company.id, parseInt(params.id));
      })
  );
}
