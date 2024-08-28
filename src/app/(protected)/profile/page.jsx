"use client";

import React, { useState } from "react";
import { User, Edit2, Save } from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import Form from "@/components/Profile/Form";

export default function Profile() {
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const card = { height, weight };

		// Fake API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		setIsEditing(false);
		alert("Data saved successfully!");
	};

	const user = {
		name: "John Doe",
		age: 30,
		height: 175,
		weight: 70,
		bmi: 22.9,
		bloodType: "O",
		allergy: "None",
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
			<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-24">
				<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
					<div className="md:flex">
						<div className="md:shrink-0">
							<div className="h-48 w-full md:w-48 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
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
										value={`${user.age} years`}
									/>
									<InfoItem
										label="Blood Type"
										value={user.bloodType}
									/>
									<InfoItem
										label="Height"
										value={height || `${user.height} cm`}
										isEditing={isEditing}
										onChange={(e) =>
											setHeight(e.target.value)
										}
									/>
									<InfoItem
										label="Weight"
										value={weight || `${user.weight} kg`}
										isEditing={isEditing}
										onChange={(e) =>
											setWeight(e.target.value)
										}
									/>
									<InfoItem
										label="BMI"
										value={user.bmi.toFixed(2)}
									/>
									<InfoItem
										label="Allergy"
										value={user.allergy}
									/>
								</div>
								<InfoItem
									label="Chronic Disease"
									value={user.chronicDisease}
									fullWidth
								/>
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
											<>
												<Save
													size={20}
													className="mr-2"
												/>
												Save Changes
											</>
										)}
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
				<Form />
			</div>
		</>
	);
}

const InfoItem = ({ label, value, isEditing, onChange, fullWidth }) => (
	<div className={`${fullWidth ? "col-span-2" : ""}`}>
		<label className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		{isEditing && onChange ? (
			<input
				type="text"
				value={value}
				onChange={onChange}
				className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			/>
		) : (
			<p className="mt-1 text-sm text-gray-900">{value}</p>
		)}
	</div>
);
