import React, { useState } from "react";

export default function VaccineHistory({
	records = [],
	isLoading,
	onAddRecord,
	onDeleteRecord,
}) {
	const [form, setForm] = useState({
		vaccineName: "",
		vaccineDate: "",
		hospitalName: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await onAddRecord(form);
		if (success) {
			setForm({ vaccineName: "", vaccineDate: "", hospitalName: "" });
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this record?")) {
			await onDeleteRecord(id);
		}
	};

	return (
		<div className="w-full mt-[6rem] max-w-2xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold text-gray-800">
				Vaccine History
			</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-lg rounded-lg p-6 space-y-4"
			>
				<h2 className="text-2xl font-semibold text-gray-700">
					Add New Record
				</h2>
				<div>
					<label
						htmlFor="vaccineName"
						className="block text-sm font-medium text-gray-600"
					>
						Vaccine Name
					</label>
					<input
						id="vaccineName"
						name="vaccineName"
						type="text"
						value={form.vaccineName}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="vaccineDate"
						className="block text-sm font-medium text-gray-600"
					>
						Vaccine Date
					</label>
					<input
						id="vaccineDate"
						name="vaccineDate"
						type="date"
						value={form.vaccineDate}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="hospitalName"
						className="block text-sm font-medium text-gray-600"
					>
						Hospital Name
					</label>
					<input
						id="hospitalName"
						name="hospitalName"
						type="text"
						value={form.hospitalName}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-sky-500 text-white rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
					disabled={isLoading}
				>
					Add Vaccine
				</button>
			</form>

			<h2 className="text-2xl font-semibold text-gray-700">
				Vaccine Records
			</h2>
			{isLoading ? (
				<p className="text-gray-500">Loading...</p>
			) : records.length > 0 ? (
				<ul className="space-y-4">
					{records.map((record) => (
						<li
							key={record.id}
							className="bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2"
						>
							<h3 className="text-xl font-semibold text-gray-800">
								{record.vaccineName}
							</h3>
							<p>
								Date:{" "}
								{new Date(
									record.vaccineDate
								).toLocaleDateString()}{" "}
							</p>
							<p>Hospital: {record.hospitalName}</p>
							<div className="mt-4">
								<button
									className="py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
									onClick={() => handleDelete(record.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500">No vaccine records found.</p>
			)}
		</div>
	);
}
