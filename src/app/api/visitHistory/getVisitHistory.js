import Articles from "@/app/article/page";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const allVisitHistory = await prisma.visitHistory.findMany();
    return NextResponse.json(
      { message: "Successfully get all visit history", visitHistory : allVisitHistory},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get visit history" },
      {
        data: "asfasdfsa"
      },
      { status: 500 }
    );
  }
}
