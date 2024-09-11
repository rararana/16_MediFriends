"use server";

import { LoginSchema } from "../schemas";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	// validate login fields
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		// sign in
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return { error: "Invalid credentials!" };
		}

		return {
			success: "Login succesful! Redirecting...",
		};
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Something went wrong!" };
			}
		}
		throw error;
	}
};
