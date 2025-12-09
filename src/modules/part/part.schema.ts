import { t } from "elysia";

export const createPartSchema = t.Object({
  name: t.String(),
  quantity: t.Number(),
  price: t.Number(),
  location_id: t.Number(),
});

export const updatePartSchema = t.Object({
  name: t.Optional(t.String()),
  quantity: t.Optional(t.Number()),
  price: t.Optional(t.Number()),
  location_id: t.Optional(t.Number()),
});
