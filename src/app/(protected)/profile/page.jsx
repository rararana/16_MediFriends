"use client";

import React, { useState } from "react";
import Link from "next/link";
import Form from "@/components/Profile/Form";
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";

export default function Profile() {
	const ProfileCard = ({ user }) => (
		<div className="relative bg-sky-300 p-6 rounded-xl shadow-lg w-80 mx-auto">
			<div className="text-center mb-4">
				<img
					src="https://via.placeholder.com/100"
					alt="profile"
					className="rounded-full w-24 h-24 mx-auto border-4 border-white shadow-md"
				/>
				<h2 className="text-2xl font-bold text-gray-800 mt-3">
					Hello, {user.name}
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<p className="text-gray-700">
						<strong>Name:</strong> {user.name}
					</p>
					<p className="text-gray-700">
						<strong>Age:</strong> {user.age}
					</p>
					<p className="text-gray-700">
						<strong>Height:</strong> {user.height} cm
					</p>
					<p className="text-gray-700">
						<strong>Weight:</strong> {user.weight} kg
					</p>
					<p className="text-gray-700">
						<strong>BMI:</strong>{" "}
						{(
							(user.weight * 10000) /
							(user.height * user.height)
						).toFixed(2)}
					</p>
				</div>
				<div className="space-y-2">
					<p className="text-gray-700">
						<strong>Blood Type:</strong> {user.bloodType}
					</p>
					<p className="text-gray-700">
						<strong>Allergy:</strong> {user.allergy}
					</p>
					<p className="text-gray-700">
						<strong>Chronic Disease:</strong> {user.chronicDisease}
					</p>
				</div>
			</div>
			<Link
				href="../profile-form"
				className="absolute top-5 right-5 text-2xl text-white hover:text-sky-950 transition-all z-10"
			>
				<div className="w-7">✎</div>
			</Link>
		</div>
	);

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
			<div className="">
				{/* Nav */}
				<MobileNav nav={nav} closeNav={closeNav} />
				<NavDashboard openNav={openNav} closeNav={closeNav} />
				<div className="mt-24">
					<ProfileCard user={user} />
					<Form />
				</div>
			</div>
		</>
	);
}
