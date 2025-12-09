import { t } from "elysia";

export const createWorkOrderSchema = t.Object({
  asset_id: t.String(),
  description: t.String(),
  priority: t.Optional(
    t.Union([t.Literal("low"), t.Literal("medium"), t.Literal("high")])
  ),
  type: t.Optional(t.Union([t.Literal("preventive"), t.Literal("corrective")])),
});

export const updateWorkOrderSchema = t.Object({
  assigned_to: t.Optional(t.Number()),
  due_at: t.Optional(t.Date()),
  status: t.Optional(
    t.Union([
      t.Literal("pending"),
      t.Literal("progress"),
      t.Literal("completed"),
      t.Literal("failed"),
    ])
  ),
  description: t.Optional(t.String()),
  priority: t.Optional(
    t.Union([t.Literal("low"), t.Literal("medium"), t.Literal("high")])
  ),
});

export const assignWorkOrderSchema = t.Object({
  assigned_to: t.Number(),
  due_at: t.Date(),
});

export const addUsedPartSchema = t.Object({
  part_id: t.Number(),
  quantity: t.Number(),
});

export const updateUsedPartSchema = t.Object({
  quantity: t.Optional(t.Number()),
});
