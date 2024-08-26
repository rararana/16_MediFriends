import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
	const req = await request.json();

	const session = await auth();
	console.log(session);

	const { date, sleepDuration, quality, sleepGoal, achieved } = JSON.parse(
		req.body
	);

	db.sleepHistory.create({
		date: date,
		sleepDuration: sleepDuration,
		quality: quality,
		sleepGoal: sleepGoal,
		achieved: achieved,
	});

	console.log(date, sleepDuration, quality, sleepGoal, achieved);
	return NextResponse.json({ test: "Hello world!" });
}
