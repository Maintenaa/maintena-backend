import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { User } from "../../database/entities";
import { generatePassword } from "../auth/auth.service";
import { createUserSchema, updateUserSchema } from "./user.schema";

const userRepo = dataSource.getRepository(User);

export async function createUser(
  user: Omit<Static<typeof createUserSchema>, "password_confirmation">
) {
  user.password = await generatePassword(user.password);

  return await userRepo.save(user);
}

export async function updateUser(user: Static<typeof updateUserSchema>) {
  if (user.password) {
    user.password = await generatePassword(user.password);
  }

  return await userRepo.save(user);
}
