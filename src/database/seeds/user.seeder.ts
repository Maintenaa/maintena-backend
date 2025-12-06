import { createUser } from "../../modules/user/user.service";
import type { CreateUser } from "../../types";
import type { BaseSeeder } from "./base.seeder";

export class UserSeeder implements BaseSeeder {
  name: string = "user";

  async run(): Promise<void> {
    const users: CreateUser[] = [
      {
        email: "admin@demo.com",
        password: "admin",
        name: "Admin",
        is_superadmin: true,
      },
    ];

    for (const user of users) {
      await createUser(user);
    }
  }
}
