import { Elysia } from "elysia";
import { createLocationSchema, updateLocationSchema } from "./location.schema";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "./location.service";
import { CompanyMiddleware } from "../company/company.middleware";

export default function createLocationRoute() {
  return new Elysia({ prefix: "/location" }).use(
    CompanyMiddleware()
      .get("/", async ({ company }) => {
        return await getLocations(company.id);
      })
      .post(
        "/",
        async ({ body, company }) => {
          return await createLocation({ ...body, company_id: company.id });
        },
        {
          body: createLocationSchema,
        }
      )
      .get("/:id", async ({ params, company }) => {
        return await getLocationById(Number(params.id), company.id);
      })
      .put(
        "/:id",
        async ({ params, body, company }) => {
          return await updateLocation(Number(params.id), body, company.id);
        },
        {
          body: updateLocationSchema,
        }
      )
      .delete("/:id", async ({ params, company }) => {
        return await deleteLocation(Number(params.id), company.id);
      })
  );
}
