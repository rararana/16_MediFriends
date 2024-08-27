import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const allVisitHistory = await db.visitHistory.findMany();
		console.log(allVisitHistory);
		return NextResponse.json(
			{ message: "Successfully get all visit history", allVisitHistory },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Fail to get visit history" },

			{ status: 500 }
		);
	}
}
