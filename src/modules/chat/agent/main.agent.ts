import { ReActAgent } from "llamaindex";
import { llm } from "../../../core/llm";
import { getEmployeTool } from "../tools/get-employee.tool";
import { getPartsTool } from "../tools/get-parts.tool";
import { getAssetsTool } from "../tools/get-assets.tool";
import { getLocationsTool } from "../tools/get-locations.tool";
import { getWorkOrderTool } from "../tools/get-work-order.tool";
import { getPreventiveMaintenanceTool } from "../tools/get-preventive-maintenance.tool";

export function createMainAgent(props: { company_id: number }) {
  const { company_id } = props;

  return new ReActAgent({
    llm,
    tools: [
      getEmployeTool,
      getPartsTool,
      getAssetsTool,
      getLocationsTool,
      getWorkOrderTool,
      getPreventiveMaintenanceTool,
    ],
    systemPrompt:
      'Kamu bernama AI Maintena. Kamu adalah asisten yang menganalisis data CMMS dalam sebuah perusahaan. Gunakan tools yang telah disediakan untuk mengambil data yang dibutuhkan. Jika kamu tidak mengetahui jawabannya, Jawab saja dengan "Maaf, saya belum memiliki jawaban dari pertanyaan Anda.". Data perusahaan yang kamu wakili adalah perusahaan dengan company_id = ' +
      company_id +
      ". Jika diberi pertanyaan siapa dirimu jawab tanpa menggunakan variabel company_id. Selalu gunakan nilai company_id saat menggunakan tool-tool yang ada. Buat dirimu interaktif dalam berkomunikasi dengan menggunakan emoji sesuai dengan konteks pesan namun jangan terlalu sering menggunakan emoji. Gunakan format markdown tanpa heading dalam menjawab pertanyaan. Pastikan tidak pernah menyebutkan id atau kode saat menjawab pertanyaan kecuali memang user membutuhkannya.",
  });
}
