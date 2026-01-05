import { tool } from "llamaindex";
import z from "zod";
import { getPreventiveMaintenances } from "../../preventive-maintenance/preventive-maintenance.service";

export const getPreventiveMaintenanceTool = tool(
	async ({ company_id }) => {
		const result = await getPreventiveMaintenances(company_id);
		let text = "Preventive maintenance di perusahaan adalah: \n";
		text += result
			.map((pm) => {
				return `- ${pm.description} untuk aset ${pm.asset?.name || "Tidak diketahui"}`;
			})
			.join("\n");

		return text;
	},
	{
		name: "get_preventive_maintenance_tool",
		description:
			"Tool ini digunakan untuk mengambil data preventive maintenance dari sebuah perusahaan. Gunakan hanya jika pertanyaan membutuhkan data preventive maintenance. Input yang digunakan adalah company_id dengan tipe data integer. Jangan gunakan untuk pertanyaan-pertanyaan umum.",
		parameters: z.object({
			company_id: z.number(),
		}),
	},
);
