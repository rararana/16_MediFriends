"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const NavigationPage = () => {
	const router = useRouter();

	const handleNavigation = (path) => {
		router.push(path);
	};

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<div
			className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-cover bg-center"
			style={{
				backgroundImage: "url('/images/hero/gunung.jpg')",
			}}
		>
			<div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
			<div className="relative text-white">
				<h1 className="text-4xl font-bold mb-8 text-center [text-shadow:0_0_4px_rgba(255,255,255,0.5),0_0_6px_rgba(255,255,255,0.3)]">
					Explore Your Health Insights
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
					{[
						{
							title: "Profile & BMI Calculator",
							description:
								"Manage your profile and track your Body Mass Index",
							path: "/profile",
						},
						{
							title: "Sleep Tracker",
							description: "Monitor your sleep patterns",
							path: "/sleep-history",
						},
						{
							title: "Visit History",
							description: "Track your medical visits",
							path: "/visit-history",
						},
						{
							title: "Vaccine History",
							description: "View your vaccination records",
							path: "/vaccine-history",
						},
						{
							title: "Nearest Hospital",
							description: "Find hospitals near you",
							path: "/nearest-hospital",
						},
						{
							title: "Article",
							description:
								"Read informative articles about health",
							path: "/article",
						},
					].map((item, index) => (
						<div
							key={item.title}
							onClick={() => handleNavigation(item.path)}
							className="nav-box bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 transition-all duration-500 hover:bg-opacity-20 hover:scale-105 cursor-pointer"
							data-aos="fade-up"
							data-aos-delay={index * 100}
						>
							<h2 className="text-xl font-semibold mb-2">
								{item.title}
							</h2>
							<p className="text-gray-200">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NavigationPage;
