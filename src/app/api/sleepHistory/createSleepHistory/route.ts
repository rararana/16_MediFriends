import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {
			userId,
			date,
			sleepGoal,
			duration,
			goalAchieved,
			quality,
			sleepStart,
			wakeUp,
		} = body;

		const newSleepHistory = await db.sleepHistory.create({
			data: {
				userId,
				date,
				sleepGoal,
				duration,
				goalAchieved,
				quality,
				sleepStart,
				wakeUp,
			},
		});

		return NextResponse.json(
			{
				message: "Sleep history created successfully",
				sleepHistory: newSleepHistory,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating sleep history:", error);
		return NextResponse.json(
			{ message: "Failed to create sleep history", error: error.message },
			{ status: 500 }
		);
	}
}
