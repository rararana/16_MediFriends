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

		const visitHistory = await db.visitHistory.findMany({
			where: { userId },
		});

		return NextResponse.json(
			{
				message: "Successfully get all visit history",
				datas: visitHistory,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Fail to get visit history" },

			{ status: 500 }
		);
	}
}
