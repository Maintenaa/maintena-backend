import type { Static } from "elysia";
import { dataSource } from "../../database/data-source";
import { User } from "../../database/entities";
import { createError } from "../common/common.service";
import { updateUser } from "../user/user.service";
import { updateProfileSchema } from "./profile.schema";

const userRepo = dataSource.getRepository(User);

export async function getProfile(id: number) {
  return await userRepo.findOneBy({ id });
}

export async function updateProfile(body: Static<typeof updateProfileSchema>) {
  if (body.password && body.password != body.password_confirmation) {
    throw createError("password konfirmasi tidak sama");
  }

  const result = await updateUser(body);

  return {
    ...result,
    message: "Berhasil mengupdate profil",
  };
}
