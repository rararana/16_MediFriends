"use client";

import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
	openNav: () => void;
	closeNav: () => void;
}

const NavDashboard = ({ openNav, closeNav }: Props) => {
	const { data: session } = useSession();
	const [activeNav, setActiveNav] = useState("#home");
	const [isScrolled, setIsScrolled] = useState(false);
	const router = useRouter();
	const name = session?.user?.name;

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

	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};

	return (
		<header
			className={`fixed top-0 w-full h-[80px] bg-[#FFFFFF] border-b-2 border-gray-200 z-10 transition-shadow duration-300 ${
				isScrolled ? "shadow-md" : ""
			}`}
		>
			<div className="max-w-[93%] mx-auto h-full flex items-center justify-between">
				<div className="flex items-center justify-between">
					<Image
						src="/images/logo/logo-medifriends.png"
						alt="MediFriends Logo"
						width={55}
						height={60}
						className="object-contain"
					/>
					<h1
						className="text-3xl text-[#1D2F6F] font-bold cursor-pointer"
						onClick={() => (window.location.href = "/dashboard")}
					>
						MediFriends
					</h1>
					<div className="nav-links ml-[3rem]">
						<ul className="flex gap-10">
							<li>
								<a
									href="/dashboard"
									className="hover:text-[#1D2F6F] transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="/profile"
									className="hover:text-[#1D2F6F] transition-colors"
								>
									Profile
								</a>
							</li>
							<li>
								<a
									href="/visit-history"
									className="hover:text-[#1D2F6F] transition-colors"
								>
									Visit History
								</a>
							</li>
							<li>
								<a
									href="/sleep-history"
									className="hover:text-[#1D2F6F] transition-colors"
								>
									Sleep Tracker
								</a>
							</li>
							<li>
								<a
									href="article"
									className="hover:text-[#1D2F6F] transition-colors"
								>
									Articles
								</a>
							</li>
							<li>
								<a
									href="nearest-hospital"
									className="hover:text-[#1D2F6F]"
								>
									Nearby Hospitals
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex ml-auto md:gap-2">
					<button
						onClick={handleSignOut}
						className="relative py-2 rounded-md text-white bg-[#141414] isolation-auto z-10 border-2 before:absolute before:w-full before:transition-all before:duration-300 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-500 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold border rounded-lg shadow-sm gap-x-2 hover:bg-[#141414] disabled:opacity-50 disabled:pointer-events-none"
					>
						Log out
					</button>
					<div
						onClick={openNav}
						className="flex justify-center md:hidden items-center ml-5"
					>
						<Bars3Icon className="w-[2rem] h-[2rem] cursor-pointer text-[#141414]" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default NavDashboard;
