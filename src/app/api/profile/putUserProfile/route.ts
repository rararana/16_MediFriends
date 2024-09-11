import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json();
		
		const { height, weight, age, bloodType, allergy, bmi, userId } = body;

		const newProfile = await db.user.update({
			where: {
				id: userId,
			},
			data: {
				height: parseInt(height),
				weight: parseInt(weight),
				age: parseInt(age),
				bloodType,
				allergy,
				bmi: parseFloat(bmi),
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
