"use client";

import React, { useState } from "react";
import HospitalList from "@/components/NearestHospital/HospitalList";
import NearestHospital from "@/components/NearestHospital/NearestHospital";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import Footer from "@/components/Footer/Footer";

export default function Home() {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);
	return (
		<>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="container mx-auto mt-[8rem]">
				<div className="min-h-screen">
					<div className="max-w-[100%]">
						<NearestHospital />
					</div>
					<div className="mt-[1.5rem]">
						<HospitalList />
					</div>
				</div>
			</div>
			<footer>
				<Footer />
			</footer>
		</>
	);
}
