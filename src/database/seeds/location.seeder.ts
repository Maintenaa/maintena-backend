import type { BaseSeeder } from "./base.seeder";
import { dataSource } from "../data-source";
import { Location } from "../entities";
import { faker } from "@faker-js/faker";

export class LocationSeeder implements BaseSeeder {
  name: string = "location";

  async run(): Promise<void> {
    const locations: Array<Location> = [
      {
        id: 1,
        name: faker.company.buzzPhrase() + " Office",
        company_id: 1,
      } as Location,
      {
        id: 2,
        name: faker.company.buzzPhrase() + " Warehouse",
        company_id: 2,
      } as Location,
      {
        id: 3,
        name: faker.company.buzzPhrase() + " Workshop",
        company_id: 3,
      } as Location,
      {
        id: 4,
        name: faker.company.buzzPhrase() + " Meeting Room",
        company_id: 4,
      } as Location,
      {
        id: 5,
        name: faker.company.buzzPhrase() + " Laboratory",
        company_id: 1,
      } as Location,
      {
        id: 6,
        name: faker.company.buzzPhrase() + " Parking",
        company_id: 2,
      } as Location,
      {
        id: 7,
        name: faker.company.buzzPhrase() + " Production Room",
        company_id: 3,
      } as Location,
      {
        id: 8,
        name: faker.company.buzzPhrase() + " Server Room",
        company_id: 4,
      } as Location,
      {
        id: 9,
        name: faker.company.buzzPhrase() + " Lounge",
        company_id: 1,
      } as Location,
      {
        id: 10,
        name: faker.company.buzzPhrase() + " Parking Area",
        company_id: 3,
      } as Location,
    ];

    for (const location of locations) {
      await dataSource.getRepository(Location).save(location);
    }
  }
}
