import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const allSleepHistory = await db.sleepHistory.findMany();
    console.log(allSleepHistory);
    return NextResponse.json(
      { message: "Successfully get all sleep history", allSleepHistory},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to get sleep history" },

      { status: 500 }
    );
  }
}
