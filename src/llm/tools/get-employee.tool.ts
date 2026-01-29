import { tool } from "llamaindex";
import z from "zod";
import { getEmployees } from "../../modules/employee/employee.service";

export const getEmployeTool = tool(
  async ({ company_id }) => {
    const result = await getEmployees({ company_id });
    let text = "Pegawai di perusahaan adalah: \n";
    text += result.employees
      .map((e) => {
        return `- ${e.user.name} sebagai ${e.role}`;
      })
      .join("\n");

    return text;
  },
  {
    name: "get_employee_tool",
    description:
      "Tool ini digunakan untuk mengambil data pengguna dari sebuah perusahaan dengan. Gunakan hanya jika pertanyaan membutuhkan data pengguna. Input yang digunakan adalah company_id (integer). Jangan gunakan untuk pertanyaan-pertanyaan umum.",
    parameters: z.object({
      company_id: z.int(),
    }),
  }
);
