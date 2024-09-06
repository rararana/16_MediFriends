import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 }
			);
		}

		const userProfile = await db.user.findUnique({
			where: { id: userId },
		});

		if (!userProfile) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Profile retrieved successfully", userProfile },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to retrieve profile",
				error: error.message || "Unknown error",
			},
			{ status: 500 }
		);
	}
}
