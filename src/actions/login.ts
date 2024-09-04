"use server";

import { LoginSchema } from "../schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});

		if (!result?.ok) {
			// Check the error message or create custom error handling
			return { error: "Invalid credentials!" };
		}

		return { success: "Login successful" };
	} catch (error: any) {
		console.error("Login error:", error.message);
		return { error: "Something went wrong!" };
	}
};
