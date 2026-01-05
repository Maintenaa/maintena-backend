import { tool } from "llamaindex";
import z from "zod";
import { getCompany } from "../../company/company.service";

export const getCompanyTool = tool(
	async ({ company_id }) => {
		const { company } = await getCompany(company_id);

		if (!company) {
			return "Perusahaan tidak ditemukan";
		}

		return `## Perusahaan
Nama Perusahaan: ${company.name}
Total Karyawan: ${company.employees_count_range.join("-")}
Email: ${company.email}
Alamat: ${company.address}
Pemilik: ${company.owner?.name || "-"}
`;
	},
	{
		name: "get_company_tool",
		description: `Tool ini digunakan untuk mengambil data perusahaan. Gunakan hanya jika pertanyaan menanyakan perusahaan.

Parameters:
- company_id: integer
`,
		parameters: z.object({
			company_id: z.number(),
		}),
	},
);
