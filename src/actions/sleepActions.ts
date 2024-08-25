// app/actions/sleepActions.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addSleepRecord = async (
	userId: string,
	date: Date,
	bedtime: Date,
	waketime: Date,
	sleepDuration: number,
	sleepGoal: number,
	sleepQuality: number
) => {
	return await prisma.sleepHistory.create({
		data: {
			userId,
			date,
			bedtime,
			waketime,
			sleepDuration,
			sleepGoal,
			sleepQuality,
		},
	});
};

export const getSleepRecords = async (userId: string) => {
	return await prisma.sleepHistory.findMany({
		where: { userId },
	});
};
