import type { BaseSeeder } from "./base.seeder";
import { dataSource } from "../data-source";
import { User } from "../entities";
import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";
import { authSalt } from "../../modules/auth/auth.constant";

export class UserSeeder implements BaseSeeder {
  name: string = "user";

  async run(): Promise<void> {
    const users: Array<User> = [
      {
        id: 1,
        email: "admin@demo.com",
        password: hashSync("admin", authSalt),
        name: "Admin",
        is_superadmin: true,
      } as User,
    ];

    // Add 29 more users
    for (let i = 2; i <= 30; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();

      users.push({
        id: i,
        email: email,
        password: hashSync("12345678", authSalt),
        name: name,
        is_superadmin: false,
      } as User);
    }

    for (const user of users) {
      await dataSource.getRepository(User).save(user);
    }
  }
}
