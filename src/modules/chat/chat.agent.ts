import { agent } from "@llamaindex/workflow";
import { llm } from "../../core/llm";
import { getEmployeTool } from "../../llm/tools/get-employee.tool";
import { getPartsTool } from "../../llm/tools/get-parts.tool";
import { getAssetsTool } from "../../llm/tools/get-assets.tool";
import { getLocationsTool } from "../../llm/tools/get-locations.tool";
import { getWorkOrderTool } from "../../llm/tools/get-work-order.tool";
import { getPreventiveMaintenanceTool } from "../../llm/tools/get-preventive-maintenance.tool";
import type { User } from "../../database/entities";
import { getCompanyTool } from "../../llm/tools/get-company.tool";

export async function createChatAgent(props: {
	company_id: number;
	user?: User;
}) {
	const { company_id, user } = props;

	return agent({
		llm,
		name: "chat_agent",
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
- Kamu sedang berkomunikasi dengan ${user?.name ? `user bernama "${user.name}"` : `seorang customer`} dari perusahaan yang sedang kamu tangani.
- Posisikan diri anda sebagai orang ketiga (bukan anggota dari perusahaan).
- Jika user tidak menyapa, jangan membalas dengan awalan sapaan. 
- Data perusahaan yang kamu tangani adalah perusahaan dengan id ${company_id}.
- Gunakan tools yang telah disediakan untuk mengambil data yang dibutuhkan. Selalu gunakan nilai company_id saat menggunakan tool-tool yang ada. 
- Jika kamu tidak mengetahui jawaban dari pertanyaan, jawab saja dengan "Maaf, saya belum memiliki jawaban dari pertanyaan Anda." dan jangan menjawab tanpa sumber data yang jelas.
- Buat dirimu interaktif dalam berkomunikasi dengan menggunakan emoji sesuai dengan konteks pesan namun jangan terlalu sering menggunakan emoji di tiap baris atau kalimat. 
- Jangan memberikan pertanyaan lanjutan kepada user di akhir response.
- Pastikan tidak pernah menyebutkan id atau kode saat menjawab pertanyaan kecuali memang user membutuhkannya.
- Pastikan output yang diberikan menggunakan format markdown.
`,
	});
}
