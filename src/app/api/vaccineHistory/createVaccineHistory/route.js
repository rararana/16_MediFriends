import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

// api to create a new review
export async function POST(request) {
	try {
		const body = await request.json();
		console.log(body);

		const { userId, vaccineName, vaccineDate, clinicHospitalName } = body;

		const newVaccineHistory = await db.vaccineHistory.create({
			data: {
				userId,
				vaccineName,
				vaccineDate,
				clinicHospitalName,
			},
		});

		return NextResponse.json(
			{
				message: "Vaccine history created successfully",
				vaccineHistory: newVaccineHistory,
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Vaccine history creation fail" },
			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
