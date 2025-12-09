import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { Asset } from "../../database/entities";
import { createAssetSchema, updateAssetSchema } from "./asset.schema";
import { createError } from "../common/common.service";

const assetRepo = dataSource.getRepository(Asset);

export async function createAsset(
  companyId: number,
  body: Static<typeof createAssetSchema>
) {
  return await assetRepo.save({ ...body, company_id: companyId });
}

export async function getAssets(companyId: number) {
  return await assetRepo.find({
    where: { company_id: companyId },
    relations: ["category", "location"],
  });
}

export async function getAssetByKode(companyId: number, kode: string) {
  const asset = await assetRepo.findOne({
    where: { kode, company_id: companyId },
    relations: ["category", "location"],
  });

  if (!asset) {
    throw createError("Asset not found");
  }

  return asset;
}

export async function updateAsset(
  companyId: number,
  kode: string,
  body: Static<typeof updateAssetSchema>
) {
  const asset = await getAssetByKode(companyId, kode);

  Object.assign(asset, body);

  return await assetRepo.save(asset);
}

export async function deleteAsset(companyId: number, kode: string) {
  const asset = await getAssetByKode(companyId, kode);

  return await assetRepo.remove(asset);
}
