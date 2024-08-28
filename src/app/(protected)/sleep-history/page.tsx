// app/page.tsx

"use client"; // Add this directive

import React, { useState } from "react";
import SleepForm from "../../../components/SleepHistory/SleepForm";
import SleepTable from "../../../components/SleepHistory/SleepTable";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
	const [records, setRecords] = useState<any[]>([]);
	const session = useSession();
	console.log(JSON.stringify(session));

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const handleAddSleep = (
		date: string,
		duration: string,
		quality: number,
		sleepGoal: number,
		goalAchieved: boolean
	) => {
		setRecords((prevRecords) => [
			...prevRecords,
			{
				date,
				hours: parseFloat(duration),
				quality,
				sleepGoal,
				goalAchieved,
			},
		]);
	};

	return (
		<>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[6rem]">
				<h1>Sleep Tracker</h1>
				<SleepForm onAddSleep={handleAddSleep} />
				<SleepTable records={records} />
			</div>
		</>
	);
};

export default Page;
