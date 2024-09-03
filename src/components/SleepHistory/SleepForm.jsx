import React, { useState } from "react";

const SleepForm = ({ onAddSleep }) => {
	const [date, setDate] = useState("");
	const [sleepStart, setSleepStart] = useState("");
	const [wakeUp, setWakeUp] = useState("");
	const [quality, setQuality] = useState(1);
	const [sleepGoal, setSleepGoal] = useState(7);

	const handleSubmit = (e) => {
		e.preventDefault();
		const duration = calculateSleepDuration(sleepStart, wakeUp);
		const goalAchieved = duration >= sleepGoal;

		onAddSleep({
			date,
			duration,
			quality,
			sleepGoal,
			goalAchieved,
			sleepStart,
			wakeUp,
		});

		// Reset form
		setDate("");
		setSleepStart("");
		setWakeUp("");
		setQuality(1);
		setSleepGoal(7);
	};

	const calculateSleepDuration = (start, end) => {
		const startTime = new Date(`1970-01-01T${start}:00`);
		const endTime = new Date(`1970-01-01T${end}:00`);
		let duration = (endTime.getTime() - startTime.getTime()) / 3600000;
		if (duration < 0) duration += 24;
		return parseFloat(duration.toFixed(2));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-md shadow-lg rounded-lg bg-white p-6 space-y-4"
		>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Add Sleep Record
			</h2>
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
					className="mt-1 bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150 sm:text-sm"
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
					className="mt-1 bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
					className="mt-1 bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md"
				/>
			</div>

			<div>
				<label
					htmlFor="quality"
					className="block text-sm font-medium text-gray-700"
				>
					Sleep Quality (1-5)
				</label>
				<input
					id="quality"
					type="number"
					value={quality}
					onChange={(e) => setQuality(Number(e.target.value))}
					min="1"
					max="5"
					required
					className="mt-1 bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150 sm:text-sm"
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
					className="mt-1 bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-150 sm:text-sm"
				/>
			</div>
			<button
				type="submit"
				className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
			>
				Add Record
			</button>
		</form>
	);
};

export default SleepForm;
