"use server";

import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { LoginSchema } from "../schemas";
import { redirect } from "next/navigation";

export const login = async (values: any) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const userExists = await db.user.findUnique({
		where: { email },
	});

	if (!userExists) {
		return { error: "Invalid email or password" };
	}

	const passwordMatch = await bcrypt.compare(password, userExists.password);

	if (!passwordMatch) {
		return { error: "Invalid email or password" };
	}

	redirect("/");
	return { success: "Login successful!" };
};
