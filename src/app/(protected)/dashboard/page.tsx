"use client";
import { useSession, signOut } from "next-auth/react";
import NavDashboard from "@/components/NavDashboard";
import Head from "next/head";
import { useState } from "react";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/LandingPage/Hero";
import { CarouselDemo } from "@/components/LandingPage/Carousel";
import NavigationPage from "@/components/LandingPage/NavigationPage";

const Dashboard = () => {
	const { data: session } = useSession();
	console.log(JSON.stringify(session));

	const userId = session?.user?.id;

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			<Head>
				<title>Medifriends</title>
			</Head>
			{/* Nav */}
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div></div>
			<div id="dashboard-navigation-page" className="mt-[4.5rem]">
				<NavigationPage />
			</div>
			<div id="landing-hero-section">
				<Hero />
			</div>
			<div id="landing-carousel-section">
				<CarouselDemo />
			</div>
			<nav>
				<MobileNav nav={nav} closeNav={closeNav} />
			</nav>
		</>
	);
};

export default Dashboard;
