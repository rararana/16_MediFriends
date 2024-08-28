import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request) {
	try {
        const { id } = await request.json();

		const newVaccineHistory = await db.vaccineHistory.delete(
            {
                where: {id: id}
            }
        );
		console.log(newVaccineHistory);
		return NextResponse.json(
			{ message: "Successfully delete vaccine history", newVaccineHistory },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Fail to delete vaccine history" },

			{ status: 500 }
		);
	}
}
