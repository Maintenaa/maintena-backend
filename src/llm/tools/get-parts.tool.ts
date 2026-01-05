import { tool } from "llamaindex";
import z from "zod";
import { getParts } from "../../modules/part/part.service";

export const getPartsTool = tool(
	async ({ company_id }) => {
		const result = await getParts(company_id);
		let text = "Part di perusahaan adalah: \n";
		text += result
			.map((p) => {
				return `- ${p.name} (Kode: ${p.code}) di lokasi ${p.location?.name || "Tidak diketahui"}`;
			})
			.join("\n");

		return text;
	},
	{
		name: "get_parts_tool",
		description:
			"Tool ini digunakan untuk mengambil data part dari sebuah perusahaan. Gunakan hanya jika pertanyaan membutuhkan data part. Input yang digunakan adalah company_id dengan tipe data integer. Jangan gunakan untuk pertanyaan-pertanyaan umum.",
		parameters: z.object({
			company_id: z.number(),
		}),
	},
);
