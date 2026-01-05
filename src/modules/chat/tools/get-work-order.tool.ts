import { tool } from "llamaindex";
import z from "zod";
import { getWorkOrders } from "../../work-order/work-order.service";

export const getWorkOrderTool = tool(
	async ({ company_id }) => {
		const result = await getWorkOrders(company_id);
		let text = "Work order di perusahaan adalah: \n";
		text += result
			.map((wo) => {
				return `- ${wo.description} (Status: ${wo.status}, Prioritas: ${wo.priority}) untuk aset ${wo.asset?.name || "Tidak diketahui"}`;
			})
			.join("\n");

		return text;
	},
	{
		name: "get_work_order_tool",
		description:
			"Tool ini digunakan untuk mengambil data work order dari sebuah perusahaan. Gunakan hanya jika pertanyaan membutuhkan data work order. Input yang digunakan adalah company_id dengan tipe data integer. Jangan gunakan untuk pertanyaan-pertanyaan umum.",
		parameters: z.object({
			company_id: z.number(),
		}),
	},
);
