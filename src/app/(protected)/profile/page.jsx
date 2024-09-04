"use client";

import React, { useState } from "react";
import { User, Edit2, Save } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";

export default function Profile() {
	const [height, setHeight] = useState(""); // Keep these as strings
	const [weight, setWeight] = useState(""); // Keep these as strings
	const [age, setAge] = useState(20);
	const [bloodType, setBloodType] = useState("O");
	const [allergy, setAllergy] = useState("None");
	const [bmi, setBmi] = useState(null); // Ensure BMI is a number or null
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const { data: session } = useSession();
	const name = session?.user?.name;
	const email = session?.user?.email;

	const calculateBMI = (height, weight) => {
		const heightInMeters = parseFloat(height) / 100; // Convert height to meters
		const weightInKg = parseFloat(weight); // Convert weight to kg

		if (
			!isNaN(heightInMeters) &&
			!isNaN(weightInKg) &&
			heightInMeters > 0
		) {
			return parseFloat(
				(weightInKg / (heightInMeters * heightInMeters)).toFixed(2)
			);
		}
		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		// Calculate BMI
		const calculatedBmi = calculateBMI(height, weight);
		setBmi(calculatedBmi);

		// Fake API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		setIsEditing(false);
		alert("Data saved successfully!");
	};

	const user = {
		name: name,
		height: 175,
		weight: 70,
		bmi: bmi || 22.9,
		chronicDisease: "None",
	};

	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<>
			{/* Navigation */}
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[4rem]">
				<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
					<div className="md:flex">
						<div className="md:shrink-0">
							<div className="h-full w-full md:w-48 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
								<User size={64} color="white" />
							</div>
						</div>
						<div className="p-8 w-full">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold text-gray-800">
									{user.name}
								</h2>
								<button
									onClick={() => setIsEditing(!isEditing)}
									className="text-blue-500 hover:text-blue-700"
								>
									<Edit2 size={20} />
								</button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="grid grid-cols-2 gap-4 mb-4">
									<InfoItem
										label="Age"
										value={age}
										isEditing={isEditing}
										onChange={(e) => setAge(e.target.value)}
										placeholder="Enter age"
									/>
									<InfoItem
										label="Blood Type"
										value={bloodType}
										isEditing={isEditing}
										onChange={(e) =>
											setBloodType(e.target.value)
										}
										placeholder="Enter blood type"
									/>
									<InfoItem
										label="Height"
										value={height || `${user.height} cm`}
										isEditing={isEditing}
										onChange={(e) =>
											setHeight(e.target.value)
										}
										placeholder="Enter height (cm)"
										type="number"
									/>
									<InfoItem
										label="Weight"
										value={weight || `${user.weight} kg`}
										isEditing={isEditing}
										onChange={(e) =>
											setWeight(e.target.value)
										}
										placeholder="Enter weight (kg)"
										type="number"
									/>
									<InfoItem
										label="BMI"
										value={bmi !== null ? bmi : user.bmi}
									/>
									<a
										href="https://www.ncbi.nlm.nih.gov/books/NBK541070/"
										className="text-sm text-blue-600 hover:text-blue-800 underline break-words"
									>
										Check your BMI description Here
									</a>
									<InfoItem
										label="Allergy"
										value={allergy}
										isEditing={isEditing}
										onChange={(e) =>
											setAllergy(e.target.value)
										}
										placeholder="Enter allergy information"
									/>
								</div>
								{isEditing && (
									<button
										type="submit"
										className={`mt-4 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
											isLoading
												? "opacity-50 cursor-not-allowed"
												: ""
										}`}
										disabled={isLoading}
									>
										{isLoading ? (
											"Saving..."
										) : (
											<>Save Changes</>
										)}
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
				<div className="bg-white p-7 rounded-lg shadow-xl border max-w-sm mx-auto my-10">
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Username
						</label>
						<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
							{name}
						</p>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Email
						</label>
						<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
							{email}
						</p>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Password
						</label>
						<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
							********
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

const InfoItem = ({
	label,
	value,
	isEditing,
	onChange,
	fullWidth,
	placeholder,
	type = "text", // Default type is text
}) => (
	<div className={`${fullWidth ? "col-span-2" : ""}`}>
		<label className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		{isEditing && onChange ? (
			<input
				type={type}
				value={value}
				onChange={onChange}
				className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder={placeholder}
			/>
		) : (
			<p className="mt-1 text-sm text-gray-900">{value}</p>
		)}
	</div>
);
