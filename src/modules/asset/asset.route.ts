import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createAssetSchema, updateAssetSchema } from "./asset.schema";
import {
  createAsset,
  getAssets,
  getAssetByKode,
  updateAsset,
  deleteAsset,
} from "./asset.service";

export default function createAssetRoute() {
  return new Elysia({ prefix: "/assets" }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company }) => {
          return createAsset(company.id, body);
        },
        {
          body: createAssetSchema,
        }
      )
      .get("/", async ({ company }) => {
        return getAssets(company.id);
      })
      .get("/:kode", async ({ params, company }) => {
        return getAssetByKode(company.id, params.kode);
      })
      .put(
        "/:kode",
        async ({ params, body, company }) => {
          return updateAsset(company.id, params.kode, body);
        },
        {
          body: updateAssetSchema,
        }
      )
      .delete("/:kode", async ({ params, company }) => {
        return deleteAsset(company.id, params.kode);
      })
  );
}
