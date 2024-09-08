"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";

// Sample data
const articles = [
	{
		id: 1,
		title: "Heart Disease",
		excerpt:
			"Learn about diabetes, its symptoms, causes, and management tips.",
		image: "/images/disease-article/1.jpg",
		link: "https://nutritionsource.hsph.harvard.edu/disease-prevention/cardiovascular-disease/",
	},
	{
		id: 2,
		title: "About Mumps",
		image: "/images/disease-article/3.jpg",
		link: "https://www.nejm.org/doi/full/10.1056/NEJMcp1113994",
	},
	{
		id: 4,
		title: "Sexually Transmitted Infections (STIs): Overview and More",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/4.jpg",
		link: "https://www.verywellhealth.com/std-overview-4581893",
	},
	{
		id: 5,
		title: "Cardiovascular diseases (CVDs)",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/5.jpg",
		link: "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)",
	},
	{
		id: 6,
		title: "Diabetes",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/6.jpg",
		link: "https://www.who.int/health-topics/diabetes",
	},
	{
		id: 7,
		title: "COVID-19 Mythbusters",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/7.jpg",
		link: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
	},
	{
		id: 8,
		title: "Stunted growth ‘and’ obesity: the double burden of poor nutrition on our doorstep",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/8.jpg",
		link: "https://theconversation.com/stunted-growth-and-obesity-the-double-burden-of-poor-nutrition-on-our-doorstep-50385",
	},
	{
		id: 9,
		title: "Chronic Obstructive Pulmonary Disease (COPD): Overview and More",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/disease-article/9.jpg",
		link: "https://www.verywellhealth.com/copd-4014741",
	},
];

const ArticlesPage = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div>
			<Head>
				<title>Disease Articles | HealthSite</title>
				<meta
					name="description"
					content="Read articles about various diseases and health conditions."
				/>
			</Head>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<main className="pt-[7rem] px-4">
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{articles.map((article) => (
						<div
							key={article.id}
							className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg transition-transform transform hover:scale-105"
						>
							<div className="w-full h-64 relative border border-gray-400">
								<Image
									src={article.image}
									alt={article.title}
									className="object-cover"
									fill
								/>
							</div>
							<div className="p-4 flex flex-col flex-grow">
								<h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
									{article.title}
								</h2>
								<p className="text-gray-600 mb-4 flex-grow truncate">
									{article.excerpt}
								</p>
								<a
									href={article.link}
									className="text-green-500 font-semibold hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Read More
								</a>
							</div>
						</div>
					))}
				</section>
			</main>
		</div>
	);
};

export default ArticlesPage;
