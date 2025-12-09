import type { BaseSeeder } from "./base.seeder";
import { dataSource } from "../data-source";
import { Company } from "../entities";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";

export class CompanySeeder implements BaseSeeder {
  name: string = "company";

  async run(): Promise<void> {
    const companies: Array<Company> = [
      {
        id: 1,
        name: faker.company.name(),
        employees_count_range: [10, 50],
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        owner: { id: 2 } as any,
      } as Company,
      {
        id: 2,
        name: faker.company.name(),
        employees_count_range: [5, 25],
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        owner: { id: 3 } as any,
      } as Company,
      {
        id: 3,
        name: faker.company.name(),
        employees_count_range: [20, 100],
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        owner: { id: 3 } as any,
      } as Company,
      {
        id: 4,
        name: faker.company.name(),
        employees_count_range: [1, 10],
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        owner: { id: 4 } as any,
      } as Company,
    ];

    for (const company of companies) {
      await dataSource.getRepository(Company).save({
        ...company,
        kode: v4(),
      });
    }
  }
}
