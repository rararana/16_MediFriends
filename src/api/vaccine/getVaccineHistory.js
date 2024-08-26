import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { neon } from '@neondatabase/serverless';


export async function GET() {
  try {
    const allVisitHistory = await prisma.visitHistory.findAll();
    console.log(allVisitHistory);
    return NextResponse.json(
      { message: "Successfully get all visit history", visitHistory : allVisitHistory},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to get visit history" },
      {
        data: "asfasdfsa"
      },
      { status: 500 }
    );
  }
}
