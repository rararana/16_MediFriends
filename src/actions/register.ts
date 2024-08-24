"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "../lib/db";
import bcrypt from "bcrypt";

export const register = async (values: any) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!existingUser) {
		return { error: "Email already in use!" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// Send verification token email

	return { success: "Account Created! Enjoy your time on MediFriends!" };
};
