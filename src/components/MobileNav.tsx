import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
	nav: boolean;
	closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
	const router = useRouter();
	const navAnimation = nav ? "translate-x-0" : "translate-x-[100%]";
	const overlayVisibility = nav ? "block" : "hidden";
	const navRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleNavClick = (path: string) => {
		closeNav();
		router.push(path);
	};

	// Closes sidebar when clicked outside of the nav
	const handleClickOutside = (event: MouseEvent) => {
		if (
			navRef.current &&
			!navRef.current.contains(event.target as Node) &&
			overlayRef.current &&
			!overlayRef.current.contains(event.target as Node)
		) {
			closeNav();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<div
				ref={overlayRef}
				className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${overlayVisibility} z-[9999]`}
				onClick={closeNav}
			></div>
			<div
				ref={navRef}
				className={`fixed top-0 right-0 h-[100vh] w-[400px] z-[10000] bg-[#FCFCFC] shadow-left transform transition-transform duration-300 rounded ${navAnimation}`}
			>
				<div className="h-[100vh] flex flex-col items-start ml-5">
					<ul className="flex flex-col mt-[5rem] space-y-7">
						<li>
							<a
								className="nav-link-mobile"
								onClick={() => handleNavClick("/dashboard")}
							>
								Home
							</a>
						</li>
						<li>
							<a
								className="nav-link-mobile"
								onClick={() => handleNavClick("/visit-history")}
							>
								Visit History
							</a>
						</li>
						<li>
							<a
								className="nav-link-mobile"
								onClick={() => handleNavClick("/article")}
							>
								Article
							</a>
						</li>
						<li>
							<a
								className="nav-link-mobile"
								onClick={() => handleNavClick("/sleep-history")}
							>
								Sleep Tracker
							</a>
						</li>
						<li>
							<a
								className="nav-link-mobile"
								onClick={() =>
									handleNavClick("/nearest-hospital")
								}
							>
								Nearest Hospital
							</a>
						</li>
					</ul>
				</div>
				<div
					onClick={closeNav}
					className="absolute cursor-pointer top-[1.5rem] left-[1rem] w-[2rem] h-[2rem] text-black"
				>
					<XMarkIcon className="w-full h-full" />
				</div>
			</div>
		</>
	);
};

export default MobileNav;
