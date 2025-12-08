import { t } from "elysia";

export const createAssetCategorySchema = t.Object({
  name: t.String(),
});

export const updateAssetCategorySchema = createAssetCategorySchema;
