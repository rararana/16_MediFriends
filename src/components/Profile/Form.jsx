"use client";
import React from "react";

const ProfileDetails = ({ userData }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-xl border max-w-sm mx-auto my-7">
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Username</label>
				<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
					{userData.username}
				</p>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Phone Number</label>
				<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
					{userData.phoneNumber}
				</p>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Email</label>
				<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
					{userData.email}
				</p>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Password</label>
				<p className="w-full p-2 border rounded-md border-gray-300 bg-white">
					********
				</p>
			</div>
		</div>
	);
};

// Example usage
const user = {
	username: "JohnDoe",
	phoneNumber: "+1234567890",
	email: "john.doe@example.com",
	password: "secret",
};

export default function Profile() {
	return (
		<>
			<ProfileDetails userData={user} />
		</>
	);
}
