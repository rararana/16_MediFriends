"use client";

import React, { useState, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
	openNav: () => void;
	closeNav: () => void;
}

const NavDashboard = ({ openNav, closeNav }: Props) => {
	const { data: session } = useSession();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const name = session?.user?.name;

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

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

	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleProfileNavigation = () => {
		setIsDropdownOpen(false);
		router.push("/profile");
	};

	const getNavButtonClassName = (linkPath: string) => {
		const baseClass =
			"transition-colors text-[#141414] hover:text-[#3DAEF5]";
		if (pathname === linkPath) {
			return "text-[#3DAEF5]";
		}
		return baseClass;
	};

	return (
		<header
			className={`fixed top-0 w-full h-[80px] bg-[#FFFFFF] border-b-2 border-gray-200 z-10 transition-shadow duration-300 ${
				isScrolled ? "shadow-md" : ""
			}`}
		>
			<div className="max-w-[93%] mx-auto h-full flex items-center justify-between">
				{/* Logo and title */}
				<div className="flex items-center space-x-2 sm:space-x-4">
					<Image
						src="/images/logo/logo.png"
						alt="MediFriends Logo"
						width={40}
						height={40}
						className="object-contain sm:w-[50px] sm:h-[50px]"
					/>
					<h1
						className="text-xl sm:text-2xl lg:text-3xl text-[#1D2F6F] font-bold cursor-pointer"
						onClick={() => router.push("/dashboard")}
					>
						MediFriends
					</h1>
				</div>
				{/* Navigation buttons */}
				<div className="hidden lg:flex items-center">
					<ul className="flex gap-4 lg:gap-8">
						<li>
							<button
								onClick={() => router.push("/dashboard")}
								className={getNavButtonClassName("/dashboard")}
							>
								Home
							</button>
						</li>
						<li>
							<button
								onClick={() => router.push("/visit-history")}
								className={getNavButtonClassName(
									"/visit-history"
								)}
							>
								Visit History
							</button>
						</li>
						<li>
							<button
								onClick={() => router.push("/sleep-history")}
								className={getNavButtonClassName(
									"/sleep-history"
								)}
							>
								Sleep Tracker
							</button>
						</li>
						<li>
							<button
								onClick={() => router.push("/vaccine-history")}
								className={getNavButtonClassName(
									"/vaccine-history"
								)}
							>
								Vaccine History
							</button>
						</li>
						<li>
							<button
								onClick={() => router.push("/article")}
								className={getNavButtonClassName("/article")}
							>
								Articles
							</button>
						</li>
						<li>
							<button
								onClick={() => router.push("/nearest-hospital")}
								className={getNavButtonClassName(
									"/nearest-hospital"
								)}
							>
								Nearby Hospitals
							</button>
						</li>
					</ul>
				</div>
				{/* Profile section and mobile hamburger menu */}
				<div className="flex items-center ">
					<div className="relative">
						<div
							onClick={handleDropdownToggle}
							className="flex items-center bg-white border-2 border-gray-100 px-3 py-2 rounded-lg cursor-pointer"
						>
							<img
								src="/images/logo/logo-avatar.png"
								alt="Profile Picture"
								className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200"
							/>
							<span className="ml-2 text-sm sm:text-md font-semibold text-gray-800 truncate">
								Hi, {name}!
							</span>
							<ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 ml-2" />
						</div>

						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44">
								<ul>
									<li>
										<button
											onClick={handleProfileNavigation}
											className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
										>
											Profile
										</button>
									</li>
									<li>
										<button
											onClick={handleSignOut}
											className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
										>
											Log out
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>

					<div
						onClick={openNav}
						className="flex justify-center lg:hidden items-center ml-3 cursor-pointer"
					>
						<Bars3Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#141414]" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default NavDashboard;
