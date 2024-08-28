// lib/userService.ts
import { getSession } from "next-auth/react";
import { db } from "./db"; // Your Prisma client

const fetchUserDetails = async (userId?: string) => {
	const session = await getSession();

	const id = userId || session?.user?.id;

	if (id) {
		try {
			const user = await db.user.findUnique({
				where: { id },
			});
			return { user };
		} catch (error) {
			console.error("Error fetching user details:", error);
			return null;
		}
	}

	return null;
};

export default fetchUserDetails;
