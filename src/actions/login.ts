"use server";

import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { LoginSchema } from "../schemas";
import { signIn } from "@/auth";
import AuthError from "next-auth";

export const login = async (values: any) => {
	// Check login schema
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	// Validate email/password fields
	const { email, password } = validatedFields.data;
	try {
		await signIn("credentials", {
			email,
			password,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					console.log({ error: "Invalid Credentials!" });
					return { error: "Invalid Credentials!" };
				default:
					console.log({ error: "Something went wrong!" });
					return { error: "Something went wrong!" };
			}
		}
		throw error;
	}

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
