import { t } from "elysia";

export const createLocationSchema = t.Object({
  name: t.String(),
  parent_id: t.Optional(t.Number()),
});

export const updateLocationSchema = createLocationSchema;
