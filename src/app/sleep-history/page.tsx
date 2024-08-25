"use client";

import React, { useState, useEffect } from "react";
import SleepForm from "../../components/SleepHistory/SleepForm";
import SleepTable from "../../components/SleepHistory/SleepTable";
import "../../styles/globals.css";

const Page: React.FC = () => {
	const [records, setRecords] = useState<any[]>([]);

	useEffect(() => {
		const fetchRecords = async () => {
			const response = await fetch("/api/sleep?userId=yourUserId"); // Replace 'yourUserId' with actual userId
			const data = await response.json();
			setRecords(data);
		};

		fetchRecords();
	}, []);

	const handleAddSleep = async (
		date: string,
		duration: string,
		quality: number,
		sleepGoal: number
	) => {
		const response = await fetch("/api/sleep", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: "yourUserId", // Replace 'yourUserId' with actual userId
				date,
				bedtime: new Date(date + "T00:00:00").toISOString(),
				waketime: new Date(date + "T00:00:00").toISOString(),
				sleepDuration: parseFloat(duration),
				sleepGoal,
				sleepQuality: quality,
			}),
		});

		const newRecord = await response.json();
		setRecords((prevRecords) => [...prevRecords, newRecord]);
	};

	return (
		<div>
			<h1>Sleep Tracker</h1>
			<SleepForm onAddSleep={handleAddSleep} />
			<SleepTable records={records} />
		</div>
	);
};

export default Page;
