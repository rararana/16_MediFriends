// app/api/sleep/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const {
		userId,
		date,
		bedtime,
		waketime,
		sleepDuration,
		sleepGoal,
		sleepQuality,
	} = await request.json();

	try {
		const sleepRecord = await prisma.sleepHistory.create({
			data: {
				userId,
				date: new Date(date),
				bedtime: new Date(bedtime),
				waketime: new Date(waketime),
				sleepDuration,
				sleepGoal,
				sleepQuality,
			},
		});

		return NextResponse.json(sleepRecord, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error adding sleep record" },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const userId = url.searchParams.get("userId");

	if (!userId) {
		return NextResponse.json(
			{ error: "userId is required" },
			{ status: 400 }
		);
	}

	try {
		const sleepRecords = await prisma.sleepHistory.findMany({
			where: { userId },
		});

		return NextResponse.json(sleepRecords);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching sleep records" },
			{ status: 500 }
		);
	}
}
