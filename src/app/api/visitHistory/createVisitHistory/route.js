import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

// api to create a new review
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body)

    const { id, userId, visitDate, clinicHospitalName, diagnosis, treatment } = body;

    const newVisitHistory = await db.visitHistory.create({
      data: {
        id,
        userId, 
        visitDate, 
        clinicHospitalName, 
        diagnosis, 
        treatment,
      },
    });

    return NextResponse.json(
      { message: "Visit history created successfully", visitHistory : newVisitHistory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Visit history creation fail" },
      { status: 500 }
    );
  }
}