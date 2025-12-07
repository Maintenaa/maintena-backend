import type { Static } from "elysia";
import { registerSchema } from "../../modules/auth/auth.schema";
import { createUser } from "../../modules/user/user.service";
import type { BaseSeeder } from "./base.seeder";

interface CreateUser extends Omit<
  Static<typeof registerSchema>,
  "password_confirmation"
> {
  is_superadmin?: boolean;
}

export class UserSeeder implements BaseSeeder {
  name: string = "user";

  async run(): Promise<void> {
    const users: Array<CreateUser> = [
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
