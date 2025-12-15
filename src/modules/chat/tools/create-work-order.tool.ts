import { tool } from "llamaindex";
import z from "zod";
import { createWorkOrder } from "../../work-order/work-order.service";
import { logger } from "../../../core";

export const createWorkOrderTool = tool(
  async ({ company_id, user_id, asset_id, description, priority, type }) => {
    logger.info("Using create work order tool");

    const result = await createWorkOrder(company_id, user_id, {
      asset_id,
      description,
      priority,
      type,
    });

    return `Work order berhasil dibuat dengan ID ${result.id} untuk aset ${asset_id} dengan deskripsi: ${description}`;
  },
  {
    name: "create_work_order_tool",
    description:
      "Tool ini digunakan untuk membuat work order baru. Gunakan hanya jika pengguna meminta untuk membuat work order. Input yang digunakan adalah company_id (integer), user_id (integer), asset_id (string), description (string), priority (optional: low/medium/high), type (optional: preventive/corrective).",
    parameters: z.object({
      company_id: z.number(),
      user_id: z.number(),
      asset_id: z.string(),
      description: z.string(),
      priority: z.enum(["low", "medium", "high"]).optional(),
      type: z.enum(["preventive", "corrective"]).optional(),
    }),
  }
);
