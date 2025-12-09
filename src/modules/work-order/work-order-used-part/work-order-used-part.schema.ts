import { t } from "elysia";

export const addUsedPartSchema = t.Object({
  part_id: t.Number(),
  quantity: t.Number(),
});

export const updateUsedPartSchema = t.Object({
  quantity: t.Optional(t.Number()),
});
