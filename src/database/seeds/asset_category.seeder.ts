import { dataSource } from "../data-source";
import { AssetCategory } from "../entities";
import type { BaseSeeder } from "./base.seeder";

export class AssetCategorySeeder implements BaseSeeder {
  name: string = "asset category";
  async run(): Promise<void> {
    const categoryRepo = dataSource.getRepository(AssetCategory);

    const categories = [
      "Gedung & Bangunan",
      "Kendaraan",
      "Mesin & Peralatan Produksi",
      "Peralatan Kantor",
      "Peralatan IT (Hardware)",
      "Infrastruktur (listrik, jaringan, HVAC)",
      "Furnitur & Perlengkapan",
      "Alat Keselamatan (APAR, alat K3)",
      "Inventaris Laboratorium / Teknis",
      "Peralatan Pemeliharaan (tools)",
      "Peralatan Telekomunikasi",
      "Peralatan Kebersihan",
    ];

    for (const category of categories) {
      await categoryRepo.save({
        name: category,
      });
    }
  }
}
