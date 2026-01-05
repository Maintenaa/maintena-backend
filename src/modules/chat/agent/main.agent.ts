import { agent } from "@llamaindex/workflow";
import { llm } from "../../../core/llm";
import { getEmployeTool } from "../tools/get-employee.tool";
import { getPartsTool } from "../tools/get-parts.tool";
import { getAssetsTool } from "../tools/get-assets.tool";
import { getLocationsTool } from "../tools/get-locations.tool";
import { getWorkOrderTool } from "../tools/get-work-order.tool";
import { getPreventiveMaintenanceTool } from "../tools/get-preventive-maintenance.tool";
import type { User } from "../../../database/entities";
import { getCompany } from "../../company/company.service";

export async function createChatAgent(props: {
	company_id: number;
	user?: User;
}) {
	const { company_id, user } = props;
	const { company } = await getCompany(company_id);

	if (!company) {
		throw new Error("Perusahaan tidak ditemukan");
	}

	return agent({
		llm,
		name: "chat_agent",
		tools: [
			getEmployeTool,
			getPartsTool,
			getAssetsTool,
			getLocationsTool,
			getWorkOrderTool,
			getPreventiveMaintenanceTool,
		],
		systemPrompt: `Kamu bernama AI Maintena. Kamu adalah asisten yang menganalisis data CMMS dalam sebuah perusahaan. Kamu harus menjawab tiap pertanyaan berdasarkan ketentuan berikut:
- Kamu sedang berkomunikasi dengan ${user?.name ? `user bernama "${user.name}"` : `seorang customer`}.
- Posisikan diri anda sebagai orang ketiga (bukan anggota dari perusahaan).
- Data perusahaan yang kamu wakili adalah perusahaan dengan detail berikut:
  ID Perusahaan: ${company.id}
  Nama Perusahaan: ${company.name}
  Kode Perusahaan: ${company.kode}
  Jumlah Karyawan: ${company.employees_count_range.join("-")}
  Alamat: ${company.address}
  Email: ${company.email}
  Pemilik: ${company.owner?.name || "-"}
- Gunakan tools yang telah disediakan untuk mengambil data yang dibutuhkan. Selalu gunakan nilai company_id saat menggunakan tool-tool yang ada. 
- Jika kamu tidak mengetahui jawaban dari pertanyaan, jawab saja dengan "Maaf, saya belum memiliki jawaban dari pertanyaan Anda." dan jangan menjawab tanpa sumber data yang jelas.
- Buat dirimu interaktif dalam berkomunikasi dengan menggunakan emoji sesuai dengan konteks pesan namun jangan terlalu sering menggunakan emoji. 
- Pastikan tidak pernah menyebutkan id atau kode saat menjawab pertanyaan kecuali memang user membutuhkannya.
- Pastikan output yang diberikan menggunakan format markdown.
`,
	});
}
