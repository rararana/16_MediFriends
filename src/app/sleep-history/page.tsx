"use client";

import React, { useState } from "react";
import SleepForm from "../../components/SleepHistory/SleepForm";
import SleepTable from "../../components/SleepHistory/SleepTable";

const Page: React.FC = () => {
	const [records, setRecords] = useState<any[]>([]);

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
		<div>
			<h1>Sleep Tracker</h1>
			<SleepForm onAddSleep={handleAddSleep} />
			<SleepTable records={records} />
		</div>
	);
};

export default Page;
