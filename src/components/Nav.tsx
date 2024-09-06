"use client";

import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "./ui/button";
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
			className={`fixed top-0 w-full h-[10vh] bg-gradient-to-r from-[#2487c5] via-[#3198c8] to-[#2487c5] z-10 transition-shadow duration-300 ${
				isScrolled ? "shadow-md bg-opacity-90" : ""
			}`}
		>
			<div className="max-w-[93%] mx-auto h-full flex items-center justify-between">
				<h1
					className="text-3xl font-bold cursor-pointer"
					onClick={() => (window.location.href = "#")}
				>
					<span className="text-white [text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_8px_rgba(255,255,255,0.3)]">
						Medi
					</span>
					Friends
				</h1>
				<nav className="flex ml-auto gap-2">
					<button
						onClick={() => router.push("/auth/register")}
						className="border-[#ffffffc2] border-2 px-7 py-2 text-white bg-[#3eacde] hover:bg-[#3e99ca] hover:text-white rounded-s-2xl"
					>
						Sign Up
					</button>
					<button
						onClick={() => router.push("/auth/login")}
						className="border-[#ffffffc2] border-2 px-7 py-2 text-white bg-[#6B9EEB] hover:bg-[#4e7dc8] hover:text-white rounded-e-2xl"
					>
						Login
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
