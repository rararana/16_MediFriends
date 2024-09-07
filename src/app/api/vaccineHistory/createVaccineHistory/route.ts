import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

// API to create a new vaccine history record
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
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
		console.error("Error creating vaccine history:", error);
		return NextResponse.json(
			{
				message: "Vaccine history creation failed",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
