import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
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

		const sleepHistory = await db.sleepHistory.findMany({
			where: { userId },
		});

		return NextResponse.json(
			{
				message: "Successfully fetch sleep history",
				records: sleepHistory,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch sleep history", error: error.message },
			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
