"use client";

import React, { useState } from "react";
import { articles } from "./data/data-article";
import ArticleCard from "./healtharticle/health-article";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";

export default function Home() {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div style={styles.container}>
				<h1 className="mt-[5rem] text-5xl" style={styles.header}>
					Health Articles
				</h1>
				<div style={styles.grid}>
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</>
	);
}

const styles = {
	container: {
		padding: "40px",
		maxWidth: "1200px",
		margin: "0 auto",
	},
	header: {
		textAlign: "center",
		marginBottom: "40px",
	},
	grid: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};
