import { dataSource } from "../../database/data-source";
import { User } from "../../database/entities";
import type { CreateUser, UpdateUser } from "../../types";
import { generatePassword } from "../auth/auth.service";

const userRepo = dataSource.getRepository(User);

export async function createUser(user: CreateUser) {
  user.password = await generatePassword(user.password);

  return await userRepo.save(user);
}

export async function updateUser(user: UpdateUser) {
  if (user.password) {
    user.password = await generatePassword(user.password);
  }

  return await userRepo.save(user);
}
