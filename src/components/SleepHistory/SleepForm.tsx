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
	const [sleepGoal, setSleepGoal] = useState<number>(7); // Default sleep goal in hours
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
		setSleepGoal(7); // Reset to default sleep goal
		setDuration(null);
	};

	const calculateSleepDuration = (start: string, end: string): string => {
		const startTime = new Date(`1970-01-01T${start}:00`);
		const endTime = new Date(`1970-01-01T${end}:00`);
		let duration = (endTime.getTime() - startTime.getTime()) / 3600000; // Duration in hours

		if (duration < 0) {
			duration += 24; // Handling overnight sleep
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
		<form onSubmit={handleSubmit}>
			<div>
				<label>Date:</label>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Slept at:</label>
				<input
					type="time"
					value={sleepStart}
					onChange={(e) => setSleepStart(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Woke up at:</label>
				<input
					type="time"
					value={wakeUp}
					onChange={(e) => setWakeUp(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Sleep Quality (1-4):</label>
				<input
					type="number"
					value={quality}
					onChange={(e) => setQuality(Number(e.target.value))}
					min="1"
					max="4"
					required
				/>
			</div>
			<div>
				<label>Sleep Goal (hours):</label>
				<input
					type="number"
					value={sleepGoal}
					onChange={(e) => setSleepGoal(Number(e.target.value))}
					min="7"
					max="17"
					required
				/>
			</div>
			<button type="submit">Add Record</button>
		</form>
	);
};

export default SleepForm;
