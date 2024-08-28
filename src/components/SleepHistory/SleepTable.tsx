"use client";

import React, { useEffect, useState } from "react";

interface SleepRecord {
	date: string;
	duration: number;
	quality: number;
	sleepGoal: number;
	goalAchieved: boolean;
}

const SleepTable: React.FC = () => {
	const [records, setRecords] = useState<SleepRecord[]>([]);
	const userId = "your_user_id"; // Replace with actual userId

	const fetchData = async () => {
		try {
			const response = await fetch(`/api/sleepHistory?userId=${userId}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setRecords(data.records || []);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Sleep Duration (hours)</th>
					<th>Sleep Goal (hours)</th>
					<th>Sleep Goal Achieved</th>
					<th>Sleep Quality</th>
				</tr>
			</thead>
			<tbody>
				{records.map((record, index) => (
					<tr key={index}>
						<td>{record.date}</td>
						<td>{record.duration}</td>
						<td>{record.sleepGoal}</td>
						<td>{record.goalAchieved ? "Yes" : "No"}</td>
						<td>{record.quality}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SleepTable;
