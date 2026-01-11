import { compare, hash } from "bcrypt";
import { authSalt } from "./auth.constant";
import { dataSource } from "../../database/data-source";
import { User } from "../../database/entities";
import { sign } from "jsonwebtoken";
import { Config } from "../../core";
import { createError } from "../common/common.service";
import { createUser } from "../user/user.service";
import type { Static } from "elysia";
import { loginSchema, registerSchema } from "./auth.schema";

const userRepo = dataSource.getRepository(User);

export async function generatePassword(password: string) {
	return await hash(password, authSalt);
}

export async function verifyPassword(password: string, hashed: string) {
	return await compare(password, hashed);
}

export async function login({ email, password }: Static<typeof loginSchema>) {
	const user = await userRepo.findOne({
		select: ["id", "name", "email", "password", "is_superadmin"],
		where: { email },
	});

	if (!user) {
		throw createError("Email or password incorrect", 401);
	}

	const isPasswordValid = await verifyPassword(
		password,
		user.password as string,
	);

	if (!isPasswordValid) {
		throw createError("Email or password incorrect", 401);
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
		message: "Successfully signed in",
		user,
		access_token,
		refresh_token,
	};
}

export async function register(params: Static<typeof registerSchema>) {
	if (params.password != params.password_confirmation) {
		throw createError("Confirmation password doesn\'t match");
	}

	const password = params.password;

	const isExisted = await userRepo.countBy({ email: params.email });

	if (isExisted > 0) {
		throw createError("Email already registered", 401);
	}

	const user = await createUser(params);

	const result = await login({ email: user.email, password });

	return {
		...result,
		message: "Successfully registered account",
	};
}
