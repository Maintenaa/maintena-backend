import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import { createAssetSchema, updateAssetSchema } from "./asset.schema";
import {
  createAsset,
  getAssets,
  getAssetByCode,
  updateAsset,
  deleteAsset,
} from "./asset.service";
import { paramsCode } from "../common/common.schema";

export default function createAssetRoute() {
  return new Elysia({ prefix: "/asset", tags: ["Asset"] }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company }) => {
          return createAsset(company.id, body);
        },
        {
          body: createAssetSchema,
          detail: {
            summary: "Asset - Create Asset",
          },
        }
      )
      .get(
        "/",
        async ({ company }) => {
          return getAssets(company.id);
        },
        {
          detail: {
            summary: "Asset - Get Assets",
          },
        }
      )
      .get(
        "/:code",
        async ({ params, company }) => {
          return getAssetByCode(company.id, params.code);
        },
        {
          params: paramsCode,
          detail: {
            summary: "Asset - Get Asset By Code",
          },
        }
      )
      .put(
        "/:code",
        async ({ params, body, company }) => {
          return updateAsset(company.id, params.code, body);
        },
        {
          body: updateAssetSchema,
          params: paramsCode,
          detail: {
            summary: "Asset - Update Asset",
          },
        }
      )
      .delete(
        "/:code",
        async ({ params, company }) => {
          return deleteAsset(company.id, params.code);
        },
        {
          params: paramsCode,
          detail: {
            summary: "Asset - Delete Asset",
          },
        }
      )
  );
}
