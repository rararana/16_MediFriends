"use client"; // Add this directive

import React from "react";
import { useEffect, useState } from "react";

interface SleepRecord {
	date: string;
	hours: number;
	quality: number;
	sleepGoal: number;
	goalAchieved: boolean;
}

interface SleepTableProps {
	records: SleepRecord[];
}

const SleepTable: React.FC<SleepTableProps> = ({ records }) => {
	
	const [datas, setDatas] = useState([]);
	const fetchData = async () => {
		try {
			const response = await fetch("/api/sleepHistory/getSleepHistory");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			console.log(response);
			const dataa = await response.json(); // Parsing the response as JSON
			setDatas(dataa.allVisitHistory || []); // Updating the state with the fetched
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

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
						<td>{record.hours}</td>
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
