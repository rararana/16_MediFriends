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
			className="w-full max-w-[400px] bg-white p-4 space-y-4"
		>
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
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
	);
};

export default SleepForm;
