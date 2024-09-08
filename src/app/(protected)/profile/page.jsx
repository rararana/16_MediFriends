"use client";

import React, { useCallback, useEffect, useState } from "react";
import { User, Edit2, Save } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer/Footer";

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
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const { data: session } = useSession();
	const name = session?.user?.name;
	const email = session?.user?.email;
	const userId = session?.user?.id;

	const calculateBMI = (height, weight) => {
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
	};

	const fetchUserProfile = useCallback(async () => {
		if (userId) {
			try {
				const response = await fetch(
					`/api/profile/getUserProfile?userId=${userId}`
				);
				const data = await response.json();
				if (response.ok) {
					setProfileData({
						height: data.userProfile.height || "",
						weight: data.userProfile.weight || "",
						age: data.userProfile.age || "",
						bloodType: data.userProfile.bloodType || "",
						allergy: data.userProfile.allergy || "",
						bmi:
							data.userProfile.bmi ||
							calculateBMI(
								data.userProfile.height,
								data.userProfile.weight
							) ||
							null,
					});
				} else {
					console.error(
						"Failed to fetch user profile:",
						data.message
					);
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		}
	}, [userId]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

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
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...updatedProfileData,
					userId: userId,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to update profile");
			}

			setProfileData(updatedProfileData);
			alert("Data saved successfully!");
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to save data");
		}

		setIsLoading(false);
		setIsEditing(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({ ...prev, [name]: value }));
	};

	const getDisplayValue = (key) => {
		const value = profileData[key];
		if (value === "") return "-";
		if (key === "height") return `${value} cm`;
		if (key === "weight") return `${value} kg`;
		if (key === "bmi")
			return value !== null ? value.toFixed(2) : "Not calculated";
		return value;
	};

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
									{name}
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
										name="age"
										value={profileData.age}
										displayValue={getDisplayValue("age")}
										isEditing={isEditing}
										onChange={handleInputChange}
										placeholder="Enter age"
										type="number"
									/>
									<InfoItem
										label="Blood Type"
										name="bloodType"
										value={profileData.bloodType}
										displayValue={getDisplayValue(
											"bloodType"
										)}
										isEditing={isEditing}
										onChange={handleInputChange}
										placeholder="Enter blood type"
									/>
									<InfoItem
										label="Height"
										name="height"
										value={profileData.height}
										displayValue={getDisplayValue("height")}
										isEditing={isEditing}
										onChange={handleInputChange}
										placeholder="Enter height (cm)"
										type="number"
									/>
									<InfoItem
										label="Weight"
										name="weight"
										value={profileData.weight}
										displayValue={getDisplayValue("weight")}
										isEditing={isEditing}
										onChange={handleInputChange}
										placeholder="Enter weight (kg)"
										type="number"
									/>
									<InfoItem
										label="BMI"
										name="bmi"
										value={profileData.bmi}
										displayValue={getDisplayValue("bmi")}
										isEditing={false}
									/>
									<a
										href="https://www.ncbi.nlm.nih.gov/books/NBK541070/"
										className="text-sm text-blue-600 hover:text-blue-800 underline break-words"
									>
										Check your BMI description Here
									</a>
									<InfoItem
										label="Allergy"
										name="allergy"
										value={profileData.allergy}
										displayValue={getDisplayValue(
											"allergy"
										)}
										isEditing={isEditing}
										onChange={handleInputChange}
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
			<footer>
				<Footer />
			</footer>
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
		<label className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		{isEditing ? (
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder={placeholder}
			/>
		) : (
			<p className="mt-1 text-sm text-gray-900">{displayValue}</p>
		)}
	</div>
);
