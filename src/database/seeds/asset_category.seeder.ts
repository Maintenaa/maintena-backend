import { createAssetCategory } from "../../modules/asset-category/asset-category.service";
import type { BaseSeeder } from "./base.seeder";

export class AssetCategorySeeder implements BaseSeeder {
  name: string = "asset category";
  async run(): Promise<void> {
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
      await createAssetCategory({
        name: category,
      });
    }
  }
}
