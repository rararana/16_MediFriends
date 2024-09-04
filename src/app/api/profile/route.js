import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(request) {
	try {
		const body = await request.json();
		console.log(body);

		const { height, weight, age, bloodType, allergy, bmi, userId } = body;

		const newProfile = await db.user.update({
			where: {
				id: userId, // Changed from userId to id
			},
			data: {
				height: parseInt(height), // Ensure this is an integer
				weight: parseInt(weight), // Ensure this is an integer
				age: parseInt(age), // Ensure this is an integer
				bloodType,
				allergy,
				bmi: parseFloat(bmi), // Ensure this is a float
			},
		});

		return NextResponse.json(
			{ message: "Profile updated successfully", user: newProfile },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Profile update failed", error: error.message },
			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
