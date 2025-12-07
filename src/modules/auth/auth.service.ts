import { compare, hash } from "bcrypt";
import { authSalt } from "./auth.constant";
import { dataSource } from "../../database/data-source";
import { User } from "../../database/entities";
import { sign } from "jsonwebtoken";
import { Config } from "../../core";
import { createError } from "../common/common.service";
import type { RegisterUser, UpdateProfile } from "../../types";
import { createUser, updateUser } from "../user/user.service";

const userRepo = dataSource.getRepository(User);

export async function generatePassword(password: string) {
  return await hash(password, authSalt);
}

export async function verifyPassword(password: string, hashed: string) {
  return await compare(password, hashed);
}

export async function login(email: string, password: string) {
  const user = await userRepo.findOne({
    select: ["id", "name", "email", "password", "is_superadmin"],
    where: { email },
  });

  if (!user) {
    throw createError("Email atau password salah", 401);
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw createError("Email atau password salah", 401);
  }

  const payload = {
    id: user.id,
    email: user.email,
    is_superadmin: user.is_superadmin,
  };

  user.password = undefined as any;

  const access_token = sign(payload, Config.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const refresh_token = sign(payload, Config.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return {
    message: "Login berhasil",
    user,
    access_token,
    refresh_token,
  };
}

export async function register(body: RegisterUser) {
  if (body.password != body.password_confirmation) {
    throw createError("password konfirmasi tidak sama");
  }

  const password = body.password;

  const user = await createUser(body);

  const result = await login(user.email, password);

  return {
    ...result,
    message: "Berhasil registrasi akun",
  };
}

export async function getProfile(id: number) {
  return await userRepo.findOneBy({ id });
}

export async function updateProfile(body: UpdateProfile) {
  if (body.password && body.password != body.password_confirmation) {
    throw createError("password konfirmasi tidak sama");
  }

  const result = await updateUser(body);

  return {
    ...result,
    message: "Berhasil mengupdate profil",
  };
}
