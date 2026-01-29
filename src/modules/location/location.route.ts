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
  return new Elysia({ prefix: "/location", tags: ["Location"] }).use(
    CompanyMiddleware()
      .get(
        "/",
        async ({ company }) => {
          return await getLocations(company.id);
        },
        {
          detail: {
            summary: "Location - Get Locations",
          },
        }
      )
      .post(
        "/",
        async ({ body, company }) => {
          return await createLocation({ ...body, company_id: company.id });
        },
        {
          body: createLocationSchema,
          detail: {
            summary: "Location - Create Location",
          },
        }
      )
      .get(
        "/:id",
        async ({ params, company }) => {
          return await getLocationById(Number(params.id), company.id);
        },
        {
          detail: {
            summary: "Location - Get Location By Id",
          },
        }
      )
      .put(
        "/:id",
        async ({ params, body, company }) => {
          return await updateLocation(Number(params.id), body, company.id);
        },
        {
          body: updateLocationSchema,
          detail: {
            summary: "Location - Update Location",
          },
        }
      )
      .delete(
        "/:id",
        async ({ params, company }) => {
          return await deleteLocation(Number(params.id), company.id);
        },
        {
          detail: {
            summary: "Location - Delete Location",
          },
        }
      )
  );
}
