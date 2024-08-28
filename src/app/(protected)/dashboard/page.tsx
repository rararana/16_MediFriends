"use client";
import { useSession, signOut } from "next-auth/react";
import { auth } from "@/auth";
import NavDashboard from "@/components/NavDashboard";
import Head from "next/head";
import { useState } from "react";
import MobileNav from "@/components/MobileNav";

const Dashboard = () => {
	const session = useSession();
	console.log(JSON.stringify(session));

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			<Head>
				<title>Medifriends</title>
			</Head>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="absolute bottom-5">{JSON.stringify(session)}</div>
		</>
	);
};

export default Dashboard;
