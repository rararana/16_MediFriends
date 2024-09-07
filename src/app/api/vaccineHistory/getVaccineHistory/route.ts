import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 }
			);
		}

		const allVaccineHistory = await db.vaccineHistory.findMany({
				where: {userId}
		});
		
		console.log(allVaccineHistory);
		return NextResponse.json(
			{
				message: "Successfully get all vaccine history",
				allVaccineHistory,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Fail to get vaccine history", error: error.message },

			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
