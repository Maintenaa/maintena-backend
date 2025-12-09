import { t } from "elysia";
import { PreventiveMaintenanceFrequency } from "../../database/entities";

export const createPreventiveMaintenanceSchema = t.Object({
  frequency: t.Enum(PreventiveMaintenanceFrequency),
  asset_id: t.String(),
  description: t.String(),
  last_service_at: t.Optional(t.Date()),
  next_service_at: t.Optional(t.Date()),
});

export const updatePreventiveMaintenanceSchema = t.Object({
  frequency: t.Enum(PreventiveMaintenanceFrequency),
  asset_id: t.Optional(t.String()),
  description: t.Optional(t.String()),
  last_service_at: t.Optional(t.Date()),
  next_service_at: t.Optional(t.Date()),
});
