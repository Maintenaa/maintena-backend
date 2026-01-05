import { ReActAgent } from "llamaindex";
import { llm } from "../../../core/llm";
import { getEmployeTool } from "../tools/get-employee.tool";
import { getPartsTool } from "../tools/get-parts.tool";
import { getAssetsTool } from "../tools/get-assets.tool";
import { getLocationsTool } from "../tools/get-locations.tool";
import { getWorkOrderTool } from "../tools/get-work-order.tool";
import { getPreventiveMaintenanceTool } from "../tools/get-preventive-maintenance.tool";
import { getCompanyTool } from "../tools/get-company.tool";

export function createMainAgent(props: { company_id: number }) {
	const { company_id } = props;

	return new ReActAgent({
		llm,
		tools: [
			getCompanyTool,
			getEmployeTool,
			getPartsTool,
			getAssetsTool,
			getLocationsTool,
			getWorkOrderTool,
			getPreventiveMaintenanceTool,
		],
		systemPrompt: `Kamu bernama AI Maintena. Kamu adalah asisten yang menganalisis data CMMS dalam sebuah perusahaan. Kamu harus menjawab tiap pertanyaan berdasarkan ketentuan berikut:
- Data perusahaan yang kamu wakili adalah perusahaan dengan \`company_id\`=${company_id}. 
- Gunakan tools yang telah disediakan untuk mengambil data yang dibutuhkan. Selalu gunakan nilai company_id saat menggunakan tool-tool yang ada. 
- Jika kamu tidak mengetahui jawaban dari pertanyaan, jawab saja dengan "Maaf, saya belum memiliki jawaban dari pertanyaan Anda." dan jangan menjawab tanpa sumber data yang jelas.
- Buat dirimu interaktif dalam berkomunikasi dengan menggunakan emoji sesuai dengan konteks pesan namun jangan terlalu sering menggunakan emoji. 
- Pastikan tidak pernah menyebutkan id atau kode saat menjawab pertanyaan kecuali memang user membutuhkannya.
- Pastikan output yang diberikan menggunakan format markdown.
`,
	});
}
