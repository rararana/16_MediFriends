"use server";

import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { LoginSchema } from "../schemas";
import { redirect } from "next/navigation";

export const login = async (values: any) => {
	// Check login schema
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	// Validate email/password fields
	const { email, password } = validatedFields.data;

	// Check if user exists by email
	const userExists = await db.user.findUnique({
		where: { email },
	});

	if (!userExists) {
		return { error: "Invalid email or password" };
	}

	// Check if password matches and hashes password
	const passwordMatch = await bcrypt.compare(password, userExists.password);

	if (!passwordMatch) {
		return { error: "Invalid email or password" };
	}

	return { success: "Login successful!" };
};
