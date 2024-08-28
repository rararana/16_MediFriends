"use client";
import React, { useState } from "react";

const Form = () => {
	const [formData, setFormData] = useState({
		username: "",
		phoneNumber: "",
		email: "",
		password: "",
		twoFactorAuth: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Here you would typically send the form data to a server
		// For now, we'll just log it to the console
		console.log("Form data submitted:", formData);

		// Example of submitting form data to an API endpoint
		try {
			const response = await fetch("/api/submit-profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Form submitted successfully:", result);
			} else {
				console.error("Failed to submit form:", response.statusText);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-sky-300 p-6 rounded-lg shadow-md max-w-sm mx-auto my-7"
		>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Username</label>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					className="w-full p-2 border rounded-md border-gray-300"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Phone Number</label>
				<input
					type="text"
					name="phoneNumber"
					value={formData.phoneNumber}
					onChange={handleChange}
					className="w-full p-2 border rounded-md border-gray-300"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full p-2 border rounded-md border-gray-300"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-semibold">Password</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="w-full p-2 border rounded-md border-gray-300"
				/>
			</div>
			<div className="mb-4 flex items-center">
				<input
					type="checkbox"
					name="twoFactorAuth"
					checked={formData.twoFactorAuth}
					onChange={handleChange}
					className="mr-2"
				/>
				<label className="font-semibold">2 Factor Authentication</label>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
			>
				Save
			</button>
		</form>
	);
};

export default Form;
