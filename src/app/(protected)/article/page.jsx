"use client";

import ArticlePage from "@/components/ArticlePage/ArticlePage";
import Footer from "@/components/Footer/Footer";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useState } from "react";

const Articles = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[5rem]">
				<ArticlePage />;
			</div>
			<footer>
				<Footer />
			</footer>
		</>
	);
};

export default Articles;
