import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// api to create a new review
export async function POST(request) {
  try {
    const body = await request.json();

    const { user_id, visit_date, clinic_hospital_name, diagnosis, treatment, } = body;

    const newVisitHistory = await prisma.visitHistory.create({
      data: {
        user_id, 
        visit_date, 
        clinic_hospital_name, 
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