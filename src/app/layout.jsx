import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
	title: "MediFriends",
	description: "Medifriends Website",
};

export default async function RootLayout({ children }) {
	const session = await auth();
	return (
		<>
			<SessionProvider session={session}>
				<html lang="en">
					<head>
						<link rel="icon" href="/favicon.ico" />
					</head>
					<body className={poppins.className}>{children}</body>
				</html>
			</SessionProvider>
		</>
	);
}
