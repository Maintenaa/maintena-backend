import { tool } from "llamaindex";
import z from "zod";
import { getAssets } from "../../modules/asset/asset.service";

export const getAssetsTool = tool(
  async ({ company_id }) => {
    const result = await getAssets(company_id);
    let text = "Aset di perusahaan adalah: \n";
    text += result
      .map((a) => {
        return `- ${a.name} (Code: ${a.code}) di lokasi ${a.location?.name || "Tidak diketahui"}`;
      })
      .join("\n");

    return text;
  },
  {
    name: "get_assets_tool",
    description:
      "Tool ini digunakan untuk mengambil data aset dari sebuah perusahaan. Gunakan hanya jika pertanyaan membutuhkan data aset. Input yang digunakan adalah company_id dengan tipe data integer. Jangan gunakan untuk pertanyaan-pertanyaan umum.",
    parameters: z.object({
      company_id: z.number(),
    }),
  }
);
