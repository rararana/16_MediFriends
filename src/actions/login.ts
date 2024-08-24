"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: any) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}
	return { success: "Login Succesful! Enjoy your time on MediFriends!" };
};
