"use client";

import React from "react";

interface SleepRecord {
	date: string;
	duration: number;
	quality: number;
	sleepGoal: number;
	goalAchieved: boolean;
}

interface SleepTableProps {
	records: SleepRecord[];
}

const SleepTable: React.FC<SleepTableProps> = ({ records }) => {
	return (
		<table className="mt-5 w-full border-collapse border border-gray-300">
			<thead>
				<tr>
					<th className="border border-gray-300 px-4 py-2">Date</th>
					<th className="border border-gray-300 px-4 py-2">
						Sleep Duration (hours)
					</th>
					<th className="border border-gray-300 px-4 py-2">
						Sleep Goal (hours)
					</th>
					<th className="border border-gray-300 px-4 py-2">
						Sleep Goal Achieved
					</th>
					<th className="border border-gray-300 px-4 py-2">
						Sleep Quality
					</th>
				</tr>
			</thead>
			<tbody>
				{records.map((record, index) => (
					<tr key={index}>
						<td className="border border-gray-300 px-4 py-2">
							{record.date}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{record.duration.toFixed(2)}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{record.sleepGoal}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{record.goalAchieved ? "Yes" : "No"}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{record.quality}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SleepTable;
