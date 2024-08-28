"use client";

import React, { useState } from "react";
import HospitalList from "@/components/NearestHospital/HospitalList";
import NearestHospital from "@/components/NearestHospital/NearestHospital";
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
			<div className="container mx-auto mt-[6rem]">
				<div className="min-h-screen">
					<NearestHospital />
					<HospitalList />
				</div>
			</div>
		</>
	);
}
