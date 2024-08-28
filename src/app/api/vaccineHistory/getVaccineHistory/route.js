import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const allVaccineHistory = await db.vaccineHistory.findMany();
		console.log(allVaccineHistory);
		return NextResponse.json(
			{ message: "Successfully get all vaccine history", allVaccineHistory },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Fail to get vaccine history" },

			{ status: 500 }
		);
	}
}
