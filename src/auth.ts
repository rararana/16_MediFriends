import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { escape } from "querystring";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		// async signIn({ user }) {
		// 	const existingUser = await getUserById(user.id);

		// 	if (!existingUser || !existingUser.emailVerified) {
		// 		return false;
		// 	}
		// 	return true;
		// },
		async session({ token, session }) {
			console.log({ sessionToken: token, session });
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token; // if logged out

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
});
