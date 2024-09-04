"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import SleepForm from "@/components/SleepHistory/SleepForm";
import SleepTable from "@/components/SleepHistory/SleepTable";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";

export default function SleepHistoryPage() {
	const [records, setRecords] = useState([]);
	const [nav, setNav] = useState(false);
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const fetchSleepHistory = useCallback(async () => {
		if (userId) {
			try {
				const response = await fetch(
					`/api/sleepHistory/getSleepHistory?userId=${userId}`
				);
				const data = await response.json();
				if (response.ok) {
					setRecords(data.records);
				} else {
					console.error(
						"Failed to fetch sleep history:",
						data.message
					);
				}
			} catch (error) {
				console.error("Error fetching sleep history:", error);
			}
		}
	}, [userId]);

	useEffect(() => {
		fetchSleepHistory();
	}, [fetchSleepHistory]);

	const handleAddSleep = async (newRecord) => {
		try {
			const response = await fetch(
				"/api/sleepHistory/createSleepHistory",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...newRecord, userId }),
				}
			);
			const data = await response.json();
			if (response.ok) {
				setRecords((prevRecords) => [
					...prevRecords,
					data.sleepHistory,
				]);
			} else {
				console.error("Failed to add sleep record:", data.message);
			}
		} catch (error) {
			console.error("Error adding sleep record:", error);
		}
	};

	return (
		<>
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="mt-[6rem] min-h-screen p-4">
				<h1 className="text-3xl font-bold mb-4 text-center">
					Sleep Tracker
				</h1>
				<div className="container mx-auto">
					<div className="flex flex-col items-center mb-8">
						<SleepForm onAddSleep={handleAddSleep} />
					</div>
					<SleepTable records={records} />
				</div>
			</div>
		</>
	);
}
