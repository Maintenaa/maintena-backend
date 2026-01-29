import Elysia from "elysia";
import { CompanyMiddleware } from "../company/company.middleware";
import {
  createPreventiveMaintenanceSchema,
  updatePreventiveMaintenanceSchema,
} from "./preventive-maintenance.schema";
import {
  createPreventiveMaintenance,
  getPreventiveMaintenances,
  getPreventiveMaintenanceById,
  updatePreventiveMaintenance,
  deletePreventiveMaintenance,
} from "./preventive-maintenance.service";
import { paramsId } from "../common/common.schema";

export default function createPreventiveMaintenanceRoute() {
  return new Elysia({
    prefix: "/preventive-maintenance",
    tags: ["Preventive Maintenance"],
  }).use(
    CompanyMiddleware()
      .post(
        "/",
        async ({ body, company }) => {
          return createPreventiveMaintenance(company.id, body);
        },
        {
          body: createPreventiveMaintenanceSchema,
          detail: {
            summary: "Preventive Maintenance - Create Preventive Maintenance",
          },
        }
      )
      .get(
        "/",
        async ({ company }) => {
          return getPreventiveMaintenances(company.id);
        },
        {
          detail: {
            summary: "Preventive Maintenance - Get Preventive Maintenances",
          },
        }
      )
      .get(
        "/:id",
        async ({ params, company }) => {
          return getPreventiveMaintenanceById(company.id, params.id);
        },
        {
          params: paramsId,
          detail: {
            summary:
              "Preventive Maintenance - Get Preventive Maintenance By Id",
          },
        }
      )
      .put(
        "/:id",
        async ({ params, body, company }) => {
          return updatePreventiveMaintenance(company.id, params.id, body);
        },
        {
          body: updatePreventiveMaintenanceSchema,
          params: paramsId,
          detail: {
            summary: "Preventive Maintenance - Update Preventive Maintenance",
          },
        }
      )
      .delete(
        "/:id",
        async ({ params, company }) => {
          return deletePreventiveMaintenance(company.id, params.id);
        },
        {
          params: paramsId,
          detail: {
            summary: "Preventive Maintenance - Delete Preventive Maintenance",
          },
        }
      )
  );
}
