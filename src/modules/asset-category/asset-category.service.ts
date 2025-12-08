import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { AssetCategory } from "../../database/entities";
import { createAssetCategorySchema } from "./asset-category.schema";
import { createError } from "../common/common.service";

const categoryRepo = dataSource.getRepository(AssetCategory);

export async function createAssetCategory(
  body: Static<typeof createAssetCategorySchema>
) {
  return await categoryRepo.save(body);
}

export async function updateAssetCategory(
  id: number,
  body: Static<typeof createAssetCategorySchema>
) {
  const category = await categoryRepo.findOne({ where: { id } });

  if (!category) {
    throw createError("Category not found");
  }

  category.name = body.name;

  return await categoryRepo.save(category);
}

export async function deleteAssetCategory(id: number) {
  const category = await categoryRepo.findOne({ where: { id } });

  if (!category) {
    throw createError("Category not found");
  }

  return await categoryRepo.remove(category);
}
