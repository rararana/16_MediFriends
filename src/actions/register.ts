"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";

export const register = async (values: any) => {
	// validate register fields
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validatedFields.data;

	// password hashing
	const hashedPassword = await bcrypt.hash(password, 10);

	// check if user already exists by email
	const userExists = await getUserByEmail(email);

	if (userExists) {
		return { error: "Email already in use!" };
	}

	// Write user to db
	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	return { success: "Account Created! Enjoy your time on MediFriends!" };
};
