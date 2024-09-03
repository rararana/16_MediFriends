import React from "react";
import {
	CheckCircle,
	XCircle,
	Calendar,
	Clock,
	BarChart2,
	Star,
	Target,
} from "lucide-react";

const SleepTable = ({ records }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<Calendar className="mr-2" />
								<span>Date</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<Clock className="mr-2" />
								<span>Sleep Start</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<Clock className="mr-2" />
								<span>Wake Up</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<BarChart2 className="mr-2" />
								<span>Duration (hours)</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<Star className="mr-2" />
								<span>Quality</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<Target className="mr-2" />
								<span>Goal (hours)</span>
							</div>
						</th>
						<th className="border border-gray-300 px-4 py-2">
							<div className="flex items-center">
								<span>Goal Achieved</span>
							</div>
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
								{record.wakeUp}
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
							<td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
								{record.goalAchieved ? (
									<CheckCircle color="green" />
								) : (
									<XCircle color="red" />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SleepTable;
