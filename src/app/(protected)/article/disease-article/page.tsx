"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

// Sample data
const articles = [
	{
		id: 1,
		title: "Understanding Diabetes",
		excerpt:
			"Learn about diabetes, its symptoms, causes, and management tips.",
		image: "/images/diabetes.jpg",
	},
	{
		id: 2,
		title: "Heart Disease Awareness",
		excerpt:
			"Important information about heart disease prevention and treatment.",
		image: "/images/heart-disease.jpg",
	},
	{
		id: 3,
		title: "Managing Hypertension",
		excerpt: "Effective strategies for managing high blood pressure.",
		image: "/images/hypertension.jpg",
	},
];

const ArticlesPage: React.FC = () => {
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
			<header className="header">
				<h1>Health Articles</h1>
			</header>
			<main className="main">
				<section className="articles-grid">
					{articles.map((article) => (
						<div key={article.id} className="article-card">
							<img
								src={article.image}
								alt={article.title}
								className="article-image"
							/>
							<div className="article-content">
								<h2>{article.title}</h2>
								<p>{article.excerpt}</p>
								<Link
									href={`/articles/${article.id}`}
									className="read-more"
								>
									Read More
								</Link>
							</div>
						</div>
					))}
				</section>
			</main>
			<footer className="footer">
				<p>
					&copy; {new Date().getFullYear()} HealthSite. All rights
					reserved.
				</p>
			</footer>
			<style jsx>{`
				.header {
					background-color: #4caf50; /* Fresh green */
					color: white;
					padding: 20px;
					text-align: center;
					border-bottom: 4px solid #388e3c; /* Darker green for emphasis */
				}
				.main {
					padding: 20px;
				}
				.articles-grid {
					display: grid;
					grid-template-columns: repeat(
						auto-fill,
						minmax(300px, 1fr)
					);
					gap: 20px;
				}
				.article-card {
					border: 1px solid #ddd;
					border-radius: 8px;
					overflow: hidden;
					background-color: #fff;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					transition: transform 0.2s;
				}
				.article-card:hover {
					transform: scale(1.02);
				}
				.article-image {
					width: 100%;
					height: 200px;
					object-fit: cover;
				}
				.article-content {
					padding: 15px;
				}
				.article-content h2 {
					margin: 0;
					font-size: 1.5rem;
					color: #333;
				}
				.article-content p {
					color: #666;
				}
				.read-more {
					color: #4caf50; /* Fresh green */
					text-decoration: none;
					font-weight: bold;
				}
				.read-more:hover {
					text-decoration: underline;
				}
				.footer {
					background-color: #f1f1f1;
					padding: 10px;
					text-align: center;
					border-top: 1px solid #ddd;
				}
			`}</style>
		</div>
	);
};

export default ArticlesPage;
