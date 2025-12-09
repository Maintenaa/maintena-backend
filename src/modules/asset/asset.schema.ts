import { t } from "elysia";

export const createAssetSchema = t.Object({
  category_id: t.Number(),
  location_id: t.Number(),
  name: t.String(),
});

export const updateAssetSchema = t.Object({
  category_id: t.Optional(t.Number()),
  location_id: t.Optional(t.Number()),
  name: t.Optional(t.String()),
});
