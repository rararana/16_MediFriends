"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
	openNav: () => void;
	closeNav: () => void;
}

const Nav = ({ openNav, closeNav }: Props) => {
	const [activeNav, setActiveNav] = useState("#home");
	const [isScrolled, setIsScrolled] = useState(false);
	const router = useRouter();

	// Function for smooth scrolling
	const handleNavClick = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
			setActiveNav(`#${sectionId}`);
		}
	};

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	// Function for adding shadow to navbar when scrolled down
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 w-full h-[72px] bg-[#FAF8F5] z-10 transition-shadow duration-300 ${
				isScrolled ? "shadow-md" : ""
			}`}
		>
			<div className="max-w-[93%] mx-auto h-full flex items-center justify-between">
				<Image
					src="/images/logo/logo-medifriends.png"
					alt="MediFriends Logo"
					width={55}
					height={60}
					className="object-contain"
				/>
				<h1
					className="text-2xl md:text-3xl text-[#1D2F6F] font-bold cursor-pointer"
					onClick={() => (window.location.href = "/dashboard")}
				>
					MediFriends
				</h1>
				<nav className="flex ml-auto gap-2">
					<button
						onClick={() => router.push("/auth/register")}
						className="py-2 px-4 sm:py-3 sm:px-6 rounded-md text-white bg-[#1D2F6F] border border-[#1D2F6F] text-[10px] sm:text-sm font-semibold shadow-sm inline-flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-[#111938] hover:border-[#162B4F]"
					>
						Sign Up
					</button>
					<button
						onClick={() => router.push("/auth/login")}
						className="relative active:opacity-90 py-2 px-4 sm:py-3 sm:px-6 rounded-md text-[#1D2F6F] bg-[#FAF8F5] border border-[#1D2F6F] text-[10px] sm:text-sm font-semibold shadow-sm inline-flex items-center justify-center overflow-hidden group"
					>
						<span className="absolute inset-0 w-0 bg-[#1D2F6F] transition-all duration-300 ease-out group-hover:w-full"></span>
						<span className="relative group-hover:text-[#FAF8F5] transition-colors duration-300 ease-out">
							Login
						</span>
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
