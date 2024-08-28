import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

// api to create a new review
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body)

    const {  userId, date, sleepGoal, duration, goalAchieved, quality, sleepStart } = body;
    
    const newSleepHistory = await db.sleepHistory.create({
      data: {
        userId, 
        date, 
        sleepGoal, 
        duration, 
        goalAchieved,
        quality, 
        sleepStart
      },
    });

    return NextResponse.json(
      { message: "Sleep history created successfully", sleepHistory : newSleepHistory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Sleep history creation fail" },
      { status: 500 }
    );
  }
}