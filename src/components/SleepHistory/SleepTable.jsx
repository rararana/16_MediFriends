import React from "react";

const SleepTable = ({ records }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 px-4 py-2">
							Date
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Sleep Start
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Duration (hours)
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Quality
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Goal (hours)
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Goal Achieved
						</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
						<tr key={record.id}>
							<td className="border border-gray-300 px-4 py-2">
								{record.date}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{record.sleepStart}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{record.duration.toFixed(2)}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{record.quality}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{record.sleepGoal}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{record.goalAchieved ? "Yes" : "No"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SleepTable;
