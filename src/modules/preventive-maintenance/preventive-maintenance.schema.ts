import { t } from "elysia";

export const createPreventiveMaintenanceSchema = t.Object({
  frequency: t.Union([
    t.Literal("daily"),
    t.Literal("weekly"),
    t.Literal("monthly"),
    t.Literal("yearly"),
  ]),
  asset_id: t.String(),
  description: t.String(),
  last_service_at: t.Optional(t.Date()),
  next_service_at: t.Optional(t.Date()),
});

export const updatePreventiveMaintenanceSchema = t.Object({
  frequency: t.Optional(
    t.Union([
      t.Literal("daily"),
      t.Literal("weekly"),
      t.Literal("monthly"),
      t.Literal("yearly"),
    ])
  ),
  asset_id: t.Optional(t.String()),
  description: t.Optional(t.String()),
  last_service_at: t.Optional(t.Date()),
  next_service_at: t.Optional(t.Date()),
});
