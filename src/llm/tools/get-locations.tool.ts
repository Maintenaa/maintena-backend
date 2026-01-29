import { tool } from "llamaindex";
import z from "zod";
import { getLocations } from "../../modules/location/location.service";

export const getLocationsTool = tool(
  async ({ company_id }) => {
    const result = await getLocations(company_id);
    let text = "Lokasi di perusahaan adalah: \n";
    text += result
      .map((l) => {
        return `- ${l.name}`;
      })
      .join("\n");

    return text;
  },
  {
    name: "get_locations_tool",
    description:
      "Tool ini digunakan untuk mengambil data lokasi dari sebuah perusahaan. Gunakan hanya jika pertanyaan membutuhkan data lokasi. Input yang digunakan adalah company_id dengan tipe data integer. Jangan gunakan untuk pertanyaan-pertanyaan umum.",
    parameters: z.object({
      company_id: z.number(),
    }),
  }
);
