import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { neon } from '@neondatabase/serverless';


export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL, { fullResults: true });
    const allVisitHistory = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    console.log(allVisitHistory);
    return NextResponse.json(
      { message: "Successfully get all visit history", visitHistory : allVisitHistory},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to get visit history" },

      { status: 500 }
    );
  }
}
