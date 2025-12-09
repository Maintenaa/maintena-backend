import type { BaseSeeder } from "./base.seeder";
import { dataSource } from "../data-source";
import { Asset } from "../entities";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export class AssetSeeder implements BaseSeeder {
  name: string = "asset";

  async run(): Promise<void> {
    const assets: Array<Asset> = [];

    // Distribution: 10 assets per location (10 locations * 10 = 100)
    const locationIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const companyIds = [1, 1, 2, 4, 1, 2, 3, 4, 1, 3]; // corresponding companies for locations

    let assetCount = 1;
    for (let i = 0; i < locationIds.length; i++) {
      const locationId = locationIds[i];
      const companyId = companyIds[i];

      for (let j = 1; j <= 10; j++) {
        const categoryId = Math.floor(Math.random() * 12) + 1; // 1-12

        assets.push({
          code: uuidv4(),
          company_id: companyId,
          category_id: categoryId,
          location_id: locationId,
          name: faker.commerce.productName(),
        } as Asset);

        assetCount++;
      }
    }

    for (const asset of assets) {
      await dataSource.getRepository(Asset).save(asset);
    }
  }
}
