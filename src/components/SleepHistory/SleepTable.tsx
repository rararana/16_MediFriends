"use client"; // Add this directive

import React from "react";

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
