import { tool } from "llamaindex";
import z from "zod";
import { getCompany } from "../../modules/company/company.service";

export const getCompanyTool = tool(
  async ({ company_id }) => {
    const { company } = await getCompany(company_id);

    if (!company) {
      return "Perusahaan tidak ditemukan";
    }

    return `## Perusahaan
Kode Perusahaan: ${company.code}
Nama Perusahaan: ${company.name}
Total Karyawan: ${company.employees_count_range.join("-")}
Email: ${company.email}
Alamat: ${company.address}
Pemilik: ${company.owner?.name || "-"}
`;
  },
  {
    name: "get_company_tool",
    description: `Tool ini digunakan untuk mengambil data perusahaan. Gunakan hanya jika user menanyaka terkait perusahaan atau pemiliknya.

Parameters:
- company_id: integer
`,
    parameters: z.object({
      company_id: z.number(),
    }),
  }
);
