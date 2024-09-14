"use client";

import React, { useCallback, useEffect, useState } from "react";
import { User, Edit2, Save, Activity } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Profile() {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	const [profileData, setProfileData] = useState({
		height: "",
		weight: "",
		age: "",
		bloodType: "",
		allergy: "",
		bmi: null,
	});
	const [calculatorData, setCalculatorData] = useState({
		height: "",
		weight: "",
		bmi: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const { data: session } = useSession();
	const name = session?.user?.name;
	const email = session?.user?.email;
	const userId = session?.user?.id;

	const calculateBMI = useCallback((height, weight) => {
		const heightInMeters = parseFloat(height) / 100;
		const weightInKg = parseFloat(weight);

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
	}, []);

	const fetchUserProfile = useCallback(async () => {
		if (userId) {
			try {
				const response = await fetch(
					`/api/profile/getUserProfile?userId=${userId}`
				);
				const data = await response.json();

				if (response.ok) {
					const bmi = calculateBMI(
						data.userProfile.height,
						data.userProfile.weight
					);
					const profileUpdate = {
						height: data.userProfile.height || "",
						weight: data.userProfile.weight || "",
						age: data.userProfile.age || "",
						bloodType: data.userProfile.bloodType || "",
						allergy: data.userProfile.allergy || "",
						bmi: bmi,
					};
					setProfileData(profileUpdate);
					setCalculatorData({
						height: profileUpdate.height,
						weight: profileUpdate.weight,
						bmi: bmi,
					});
				} else {
					console.error(data.message);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}, [userId, calculateBMI]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	const BMIStatus = useCallback((bmi) => {
		if (bmi < 18.5) return "Underweight";
		if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
		if (bmi >= 25 && bmi < 29.9) return "Overweight";
		if (bmi >= 30) return "Obesity";
		return "Invalid BMI";
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const updatedProfileData = {
			...profileData,
			bmi: calculateBMI(profileData.height, profileData.weight),
		};

		try {
			const response = await fetch(`/api/profile/putUserProfile`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...updatedProfileData, userId: userId }),
			});
			if (!response.ok) throw new Error("Update profile failed");

			setProfileData(updatedProfileData);
			setCalculatorData({
				height: updatedProfileData.height,
				weight: updatedProfileData.weight,
				bmi: updatedProfileData.bmi,
			});
			alert("Data saved successfully!");
		} catch (error) {
			console.error(error);
			alert("Failed to save data");
		}

		setIsLoading(false);
		setIsEditing(false);
	};

	const handleProfileInputChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prev) => {
			const updatedData = { ...prev, [name]: value };
			if (name === "height" || name === "weight") {
				updatedData.bmi = calculateBMI(
					name === "height" ? value : prev.height,
					name === "weight" ? value : prev.weight
				);
			}
			return updatedData;
		});
	};

	const handleCalculatorInputChange = (e) => {
		const { name, value } = e.target;
		setCalculatorData((prev) => {
			const updatedData = { ...prev, [name]: value };
			updatedData.bmi = calculateBMI(
				name === "height" ? value : prev.height,
				name === "weight" ? value : prev.weight
			);
			return updatedData;
		});
	};

	const getDisplayValue = (data, key) => {
		const value = data[key];
		if (value === "") return "-";
		if (key === "height") return `${value} cm`;
		if (key === "weight") return `${value} kg`;
		if (key === "bmi") return value !== null ? value.toFixed(2) : "-";
		return value;
	};

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
		AOS.refresh();
	}, []);

	return (
		<>
			<MobileNav nav={nav} closeNav={closeNav} />
			<NavDashboard openNav={openNav} closeNav={closeNav} />
			<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[4rem] bg-[#FAF8F5]">
				<div className="max-w-7xl mx-auto">
					<div className="md:flex md:space-x-6">
						{/* Profile Information */}
						<div className="md:w-1/2 bg-white rounded-xl shadow-md overflow-hidden mb-6 md:mb-0">
							<div className="p-8">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center space-x-4">
										<div className="h-14 w-14 bg-[#1D2F6F] rounded-full flex items-center justify-center">
											<img
												src="/images/logo/logo-avatar.png"
												alt="Profile"
												className="h-13 w-13 rounded-full"
											/>
										</div>
										<h2 className="text-2xl font-bold text-gray-800">
											{name}
										</h2>
									</div>
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
											label="Height (cm)"
											name="height"
											value={profileData.height}
											displayValue={getDisplayValue(
												profileData,
												"height"
											)}
											isEditing={isEditing}
											onChange={handleProfileInputChange}
											placeholder="Enter height"
											type="number"
										/>
										<InfoItem
											label="Weight (kg)"
											name="weight"
											value={profileData.weight}
											displayValue={getDisplayValue(
												profileData,
												"weight"
											)}
											isEditing={isEditing}
											onChange={handleProfileInputChange}
											placeholder="Enter weight"
											type="number"
										/>
										<InfoItem
											label="Age"
											name="age"
											value={profileData.age}
											displayValue={getDisplayValue(
												profileData,
												"age"
											)}
											isEditing={isEditing}
											onChange={handleProfileInputChange}
											placeholder="Enter age"
											type="number"
										/>
										<InfoItem
											label="Blood Type"
											name="bloodType"
											value={profileData.bloodType}
											displayValue={getDisplayValue(
												profileData,
												"bloodType"
											)}
											isEditing={isEditing}
											onChange={handleProfileInputChange}
											placeholder="Enter blood type"
										/>
										<InfoItem
											label="Allergy"
											name="allergy"
											value={profileData.allergy}
											displayValue={getDisplayValue(
												profileData,
												"allergy"
											)}
											isEditing={isEditing}
											onChange={handleProfileInputChange}
											placeholder="Enter allergy information"
											fullWidth
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
											<Save size={20} className="mr-2" />
											{isLoading
												? "Saving..."
												: "Save Changes"}
										</button>
									)}
								</form>
								{/* Account Information */}
								<div className="mt-8 bg-white p-7 rounded-lg border max-w-sm mx-auto">
									<h3 className="text-xl font-bold mb-4">
										Account Information
									</h3>
									<div className="space-y-4">
										<div>
											<label className="block mb-2 font-semibold">
												Username
											</label>
											<p className="w-full p-2 border rounded-md border-gray-300 bg-gray-50">
												{name}
											</p>
										</div>
										<div>
											<label className="block mb-2 font-semibold">
												Email
											</label>
											<p className="w-full p-2 border rounded-md border-gray-300 bg-gray-50">
												{email}
											</p>
										</div>
										<div>
											<label className="block mb-2 font-semibold">
												Password
											</label>
											<p className="w-full p-2 border rounded-md border-gray-300 bg-gray-50">
												********
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* BMI Calculator */}
						<div className="md:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
							<div className="p-8">
								<div className="flex items-center space-x-4 mb-6">
									<div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
										<Activity size={24} color="white" />
									</div>
									<h2 className="text-2xl font-bold text-gray-800">
										BMI Calculator
									</h2>
								</div>
								<div className="grid grid-cols-2 gap-4 mb-6">
									<InfoItem
										label="Height (cm)"
										name="height"
										value={calculatorData.height}
										displayValue={getDisplayValue(
											calculatorData,
											"height"
										)}
										isEditing={true}
										onChange={handleCalculatorInputChange}
										placeholder="Enter height"
										type="number"
									/>
									<InfoItem
										label="Weight (kg)"
										name="weight"
										value={calculatorData.weight}
										displayValue={getDisplayValue(
											calculatorData,
											"weight"
										)}
										isEditing={true}
										onChange={handleCalculatorInputChange}
										placeholder="Enter weight"
										type="number"
									/>
								</div>
								<div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6">
									<div className="text-center">
										<p className="text-lg font-semibold mb-2">
											Your BMI
										</p>
										<p className="text-4xl font-bold text-green-400">
											{getDisplayValue(
												calculatorData,
												"bmi"
											)}
										</p>
									</div>
									<div className="mt-4 text-center">
										<p className="text-lg font-semibold mb-2">
											Status
										</p>
										<p className="text-xl font-bold text-green-600">
											{BMIStatus(calculatorData.bmi)}
										</p>
									</div>
								</div>
								<div className="text-[18px] text-gray-600">
									<p>BMI Categories:</p>
									<ul className="list-disc list-inside mt-2">
										<li>Underweight: Less than 18.5</li>
										<li>Normal weight: 18.5 - 24.9</li>
										<li>Overweight: 25 - 29.9</li>
										<li>Obesity: 30 or greater</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

const InfoItem = ({
	label,
	name,
	value,
	displayValue,
	isEditing,
	onChange,
	fullWidth,
	placeholder,
	type = "text",
}) => (
	<div className={`${fullWidth ? "col-span-2" : ""}`}>
		<label className="block text-sm font-medium text-gray-700 mb-1">
			{label}
		</label>
		{isEditing ? (
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder={placeholder}
			/>
		) : (
			<p className="w-full p-2 border rounded-md border-gray-300 bg-gray-50">
				{displayValue}
			</p>
		)}
	</div>
);
