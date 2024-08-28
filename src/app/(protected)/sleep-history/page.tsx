"use client";

import React, { useState } from "react";
import SleepForm from "@/components/SleepHistory/SleepForm";
import SleepTable from "@/components/SleepHistory/SleepTable";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";

const SleepTracker = () => {
	const [records, setRecords] = useState([]);
	const [nav, setNav] = useState(false);

	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const session = useSession();
	console.log(JSON.stringify(session));

	const handleAddSleep = (
		date,
		duration,
		quality,
		sleepGoal,
		goalAchieved
	) => {
		const newRecord = {
			date,
			duration: parseFloat(duration),
			quality,
			sleepGoal,
			goalAchieved,
		};
		setRecords((prevRecords) => [...prevRecords, newRecord]);
	};

	return (
		<>
			{/* Nav */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[6rem] h-[120vh]">
				<h1 className="text-3xl font-bold mb-4 text-center">
					Sleep Tracker
				</h1>
				<div className="container">
					<div className="flex flex-col items-center">
						<SleepForm onAddSleep={handleAddSleep} />
					</div>
					<SleepTable records={records} />
				</div>
			</div>
		</>
	);
};

export default SleepTracker;
