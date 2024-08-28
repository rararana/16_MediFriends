import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { useSession} from "next-auth/react";


// api to create a new review
export async function PUT(request) {
  try {
    const body = await request.json();
    console.log(body)

    const { height, weight } = body;

    const { data:session } = useSession();

    const userId1 = session?.user?.id
    console.log(userId1)

    const newProfile = await db.user.update({
        where: {
            userId: userId1,
        },
      data: {
        height,
        weight
      },
    });

    return NextResponse.json(
      { message: "Profile update successfully", user : newProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Profile update fail", error: error.message },
      { status: 500 }
    );
  }
}