import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { userId, visitDate, clinicHospitalName, diagnosis, treatment } =
			body;

		const newVisitHistory = await db.visitHistory.create({
			data: {
				userId,
				visitDate,
				clinicHospitalName,
				diagnosis,
				treatment,
			},
		});

		return NextResponse.json(
			{
				message: "Visit history created successfully",
				visitHistory: newVisitHistory,
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Visit history creation fail" },
			{ status: 500 }
		);
	}
}

export const runtime = "nodejs";
