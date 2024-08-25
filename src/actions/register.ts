"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../data/user";
import { redirect } from "next/navigation";

export const register = async (values: any) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const userExists = await getUserByEmail(email);

	if (userExists) {
		return { error: "Email already in use!" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	redirect("/auth/login");
	return { success: "Account Created! Enjoy your time on MediFriends!" };
};
