"use client";

import React, { useState } from "react";

interface SleepFormProps {
	onAddSleep: (
		date: string,
		duration: string,
		quality: number,
		sleepGoal: number,
		goalAchieved: boolean
	) => void;
}

const SleepForm: React.FC<SleepFormProps> = ({ onAddSleep }) => {
	const [date, setDate] = useState<string>("");
	const [sleepStart, setSleepStart] = useState<string>("");
	const [wakeUp, setWakeUp] = useState<string>("");
	const [quality, setQuality] = useState<number>(1);
	const [sleepGoal, setSleepGoal] = useState<number>(7);
	const [duration, setDuration] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const sleepDuration = parseFloat(
			calculateSleepDuration(sleepStart, wakeUp)
		);
		setDuration(sleepDuration.toFixed(2));

		const achieved = calculateGoalAchieved(sleepDuration, sleepGoal);

		onAddSleep(
			date,
			sleepDuration.toFixed(2),
			quality,
			sleepGoal,
			achieved
		);

		setDate("");
		setSleepStart("");
		setWakeUp("");
		setQuality(1);
		setSleepGoal(7);
		setDuration(null);
	};

	const calculateSleepDuration = (start: string, end: string): string => {
		const startTime = new Date(`1970-01-01T${start}:00`);
		const endTime = new Date(`1970-01-01T${end}:00`);
		let duration = (endTime.getTime() - startTime.getTime()) / 3600000;

		if (duration < 0) {
			duration += 24;
		}

		return duration.toFixed(2);
	};

	const calculateGoalAchieved = (
		sleepDuration: number,
		sleepGoal: number
	): boolean => {
		return sleepDuration >= sleepGoal;
	};

	return (
		<div className="w-full max-w-[400px] bg-white p-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Form Fields */}
				<div>
					<label
						htmlFor="date"
						className="block text-sm font-medium text-gray-700"
					>
						Date
					</label>
					<input
						id="date"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="sleepStart"
						className="block text-sm font-medium text-gray-700"
					>
						Slept at
					</label>
					<input
						id="sleepStart"
						type="time"
						value={sleepStart}
						onChange={(e) => setSleepStart(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="wakeUp"
						className="block text-sm font-medium text-gray-700"
					>
						Woke up at
					</label>
					<input
						id="wakeUp"
						type="time"
						value={wakeUp}
						onChange={(e) => setWakeUp(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="quality"
						className="block text-sm font-medium text-gray-700"
					>
						Sleep Quality (1-4)
					</label>
					<input
						id="quality"
						type="number"
						value={quality}
						onChange={(e) => setQuality(Number(e.target.value))}
						min="1"
						max="4"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="sleepGoal"
						className="block text-sm font-medium text-gray-700"
					>
						Sleep Goal (hours)
					</label>
					<input
						id="sleepGoal"
						type="number"
						value={sleepGoal}
						onChange={(e) => setSleepGoal(Number(e.target.value))}
						min="7"
						max="17"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Add Record
				</button>
			</form>
		</div>
	);
};

export default SleepForm;
